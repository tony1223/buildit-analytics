var React = require('react');
var cx = require("classnames");
var util = require("./util");

var removeMoreNumbers = function(num,points){
  return parseInt(num * Math.pow(10,points),10) / Math.pow(10,points);
}

var getNeedProduceItems = function(s,materialMap){

  var needProduceItems = [];
  needProduceItems.push(s);

  if(s.itemDetail){
    for(var k in s.itemDetail){
      var count = s.itemDetail[k];
      for(var i = 0; i < count ; ++i ){

        if(materialMap[k].itemDetail){
          var child = getNeedProduceItems(materialMap[k],materialMap).items;
          child.forEach(function(c){
            needProduceItems.push(c);
          })
        }else{
          needProduceItems.push(materialMap[k]);
        }
      }
    }
  }
  var map = {};
  needProduceItems.forEach(function(s){
    map[s.name] = 1;
  })

  return {
    items:needProduceItems,
    sourceMap:map
  };

}

var getProduceableItems = function(item,materialMap){

  var items = [];
  for(var k in materialMap){
    if(k != item.name && materialMap[k].producePath.sourceMap[item.name]){
      items.push(materialMap[k]);
    }
  }
  return items;

};
var getRawTimeFromProduceItems = function(items,slot){
  var base_time = 0;
  var factorys = [];
  items.forEach(function(item){
    if(item.store =="工廠"){
      factorys.push(item);
    }else{
      base_time += parseInt(item.costTime,10);
    }
  });

  factorys.sort(function(f,f2){
    return parseInt(f2.costTime,10) - parseInt(f.costTime,10);
  })

  for(var i = 0 ; i< factorys.length;++i){
    if(i % slot == 0){
      base_time += parseInt(factorys[i].costTime,10);
    }
  }

  return {count:factorys.length,time:base_time};
};

var resolve = function(s,materialMap,slot){
  if(slot == null){
    slot = 20;
  }
  var detail = null;
  if(s.itemDetail != null){
    var timeSum = parseInt(s.costTime,10);
    var rawprice = 0;
    for(var k in s.itemDetail){
      var count = s.itemDetail[k];
      if(materialMap[k].rawCostTime != null){
        timeSum += parseInt(materialMap[k].rawCostTime,10) * count;
      }else{
        timeSum += resolve(materialMap[k],materialMap) * count ;
      }
    
      if(materialMap[k].price != null){
        rawprice += materialMap[k].price * count;
      }
    }
    s.rawPriceCost = rawprice;
    s.rawCostTime = timeSum;

  }else{
    s.rawCostTime = parseInt(s.costTime,10);
    s.rawPriceCost = 0;
  }

  s.producePath = getNeedProduceItems(s,materialMap);
  
  s.rawCostTimeWithConcurrent = 
    getRawTimeFromProduceItems(s.producePath.items,slot);

  s.addValuePerMinute = (s.price - s.rawPriceCost) / s.costTime;

  s.handMadeValuePerMinute = (s.price /s.rawCostTime);
  s.handMadeValueConcurrentPerMinute = (s.price /s.rawCostTimeWithConcurrent.time);
  s.handMadeValueConcurrentSlots = s.rawCostTimeWithConcurrent.count;

  materialMap[s.name].rawCostTime = s.rawCostTime;
  return s.rawCostTime;
};

var MaterialRow = React.createClass({
  getInitialState:function(){
    return {};
  },
  render:function(){
    var item = this.props.item;
    var map = this.props.map;


    var detail = null;
    if(item.itemDetail != null){
      detail = (<tr>
          <td colSpan="10">
            原料：{JSON.stringify(item.itemDetail)},
            <br />
            材料展開:{item.producePath.items.map(function(i){ return i.name +" > ";})}
            <br />
            <br />
            可以製作:{item.produceableItems.length ? item.produceableItems.map(function(item){ 
              return (<div>{item.name}  (加工 ${removeMoreNumbers(item.addValuePerMinute,3)} ,
                  自製 ${removeMoreNumbers(item.handMadeValueConcurrentPerMinute,3)} ) 
                </div> );
            }) : "無"}
          </td>
        </tr>)

    }else{
      item.rawCostTime = item.costTime;
      detail = (<tr>
          <td colSpan="10">
            <br />
            可以製作:{item.produceableItems.length ? item.produceableItems.map(function(item){ 
              return (<div>{item.name}  (加工 ${removeMoreNumbers(item.addValuePerMinute,3)} ,
                  自製 ${removeMoreNumbers(item.handMadeValueConcurrentPerMinute,3)} ) 
                </div> );
            }) : "無"}
          </td>
        </tr>)
    }

    return (
      <tbody>
        <tr>
          <td rowSpan="2">{item.store}</td>
          <td rowSpan="2">
            {item.name}
          </td>
          <td>
            {item.costTime}m
          </td>
          <td>${item.rawPriceCost}</td>
          <td>
            {item.rawCostTime}m ({item.rawCostTimeWithConcurrent.time}m/ 
              {item.handMadeValueConcurrentSlots}格 )
          </td>
          <td>${item.price}</td>
          <td className={cx({ item:true,"item-out":(item.addValuePerMinute > item.handMadeValueConcurrentPerMinute ) })}>${removeMoreNumbers(item.addValuePerMinute,3)} ( {item.addValuePerMinute * item.costTime}) </td>
          <td>${removeMoreNumbers(item.handMadeValuePerMinute,3) }</td>
          <td>${removeMoreNumbers(item.handMadeValueConcurrentPerMinute,3) } 
            </td>
          <td>{item.level}</td>
        </tr>
        {detail}
      </tbody>
      );
  }
})

var MaterialTable = React.createClass({
  getInitialState:function(){
    return {
      level:25
    };
  },
  filterLevel:function(event){
    var level = parseInt(event.target.value,10);

    if(!level){
      level = 25;
    }
    this.setState({level: level});
  },
  render: function() {
    var comp = this;

    var materials = this.props.materials;
    var store = this.props.storeItems;


    var materialMap = {};
    // materials.forEach(function(m){
    //   materialMap[m.name] = m;
    // });

    store.forEach(function(s){
      console.log(s.name);
      materialMap[s.name] = s;
    });

    
    store.forEach(function(s){
      resolve(s,materialMap);
    });

    store.forEach(function(s){
      s.produceableItems = getProduceableItems(s,materialMap);
    })

    store.sort(function(s1,s2){
      return s1.handMadeValueConcurrentPerMinute - s2.handMadeValueConcurrentPerMinute;
    })
    // var resolve = function(map,item){
    //   if(item.itemDetail){
    //     //do handle combination
    //   }
    //   item.cost_raw_time = item.
    // };

    var rendered_store = [];
    var comp = this;
    store.forEach(function(s){
      if(parseInt(s.level,10) < comp.state.level){
        rendered_store.push(s);
      }
    });

    var res = (
      <div>
        等級:<input type="text"  onChange={this.filterLevel} value={this.state.level} />
        <table className="table table-bordered col-sm-12">
          <tbody>
            <tr >
              <td>商店</td>
              <td>名稱</td>
              <td>加工時間（分鐘）</td> 
              <td>原料購買成本</td>             
              <td>原料總生產時間（分鐘）</td> 
              <td>價錢</td>
              <td>加工獲利（分鐘）</td>
              <td>全程加工獲利（分鐘）</td>
              <td>全程且工廠同時生產下獲利（分鐘）</td>
              <td>需要等級</td>
            </tr>
          </tbody>
          {
            rendered_store.map(function(s){
              return <MaterialRow map={materialMap} item={s} key={s.ID} /> 
            })
          }
        </table>
      </div>
    );
    return res;
  }
});

module.exports = MaterialTable;
