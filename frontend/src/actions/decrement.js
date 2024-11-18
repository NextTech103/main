const decrement = (x) => {

        var all = JSON.parse(localStorage.getItem("items"));
        all.splice(x,1);
        localStorage.setItem("items",JSON.stringify(all))

    


    if(localStorage.getItem("count") == null){
        localStorage.setItem("count",1);
    } else {
    var x = localStorage.getItem("count");
    x--;
    if(x<0){
        x=0;
    }
    localStorage.setItem("count",x);
    }



    return {
        type : 'DECREMENT'
    }
};

export default decrement; 