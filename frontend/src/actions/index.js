const increment = (x,y,t,p,size,color,z,pimage) => {

    var item = {
        'name' : x,
        'quantity':y,
        'totalQuantity' :t,
        'price':p,
        'size':size,
        'color':color,
        'id':z,
        'pimage':pimage
    }
    var items = [];

    if(localStorage.getItem("items") == null){
      items.push(item);
      localStorage.setItem("items",JSON.stringify(items))
    } else {
      var all = JSON.parse(localStorage.getItem("items"));
      all.push(item);
      localStorage.setItem("items",JSON.stringify(all))
    }


    if(localStorage.getItem("count") == null){
      localStorage.setItem("count",1);
    } else {
      var x = localStorage.getItem("count");
      x++;
      localStorage.setItem("count",x);
    }


    return {
        type : 'INCREMENT'
    }
};

export default increment; 