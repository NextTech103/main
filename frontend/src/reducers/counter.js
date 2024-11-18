const counterReducer = (state=0,action)=>{
        if(action.type == 'INCREMENT'){
            state = localStorage.getItem("count");
            return state;
        } 
        

        if(action.type == ' DECREMENT'){
            state = localStorage.getItem("count");
            return state;
        }


        if(action.type == 'NULLIFY'){
            state = 0;
            return state;
        }
        
        
        
        else {
           if(localStorage.getItem("count")==null){
               state = 0;
           } else {
            state =localStorage.getItem("count");
           }
           return state;
        }    
}

export default counterReducer;