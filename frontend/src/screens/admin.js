import {useState,useEffect} from 'react';
function Admin(){

    const [cname,setCname] = useState('');
    const [image,setImage] = useState('');


    const [pname,setPname] = useState('');
    const [quan,setQuan] = useState('');
    const [price,setPrice] = useState('');
    const [pimage,setPimage] = useState('');
    const [cid,setCid] = useState('');



    const [cate,setCate] = useState([]);

    useEffect(()=>{
        fetch('https://sowdaapp.com/sandweep/fetchcate',{                                             
        method: 'POST',
      })
      .then(res=> res.json())
      .then(res=> setCate(res.message))
      .catch(err=> console.log(err))
    },[cate])


    

    const subFile = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    const subFile2 = async (e) => {
        const file = e.target.files[0];
        setPimage(file);
    }





    function submitHandle(){
       const data = new FormData() 
       data.append("cname",cname)
       data.append("image",image)
       
       console.log(cname);

       fetch('https://sowdaapp.com/sandweep/catepost',{                                             
        method: 'POST',
        body: data
      })
      .then(res=> res.json())
      .catch(err=> console.log(err))
    }


    function submitHandle2(){
        const data = new FormData()
        data.append("pname",pname)
        data.append("quan",quan)
        data.append("price",price)
        data.append("pimage",pimage)
        data.append("cid",cid)
        
        
 
        fetch('https://sowdaapp.com/sandweep/productpost',{                                             
         method: 'POST',
         body: data
       })
       .then(res=> res.json())
       .catch(err=> console.log(err))
     }



    return (
        <div class="container">
          
              <input class="form-controll" placeholder="Category name" onChange={(e)=> setCname(e.target.value)}/>
              <input type="file" class="form-controll" onChange={subFile}/>
              <button class="btn btn-warning" onClick={submitHandle}>Add Category</button>



              <h1>Add product</h1>

              
              <input class="form-controll" placeholder="Product name" onChange={(e)=> setPname(e.target.value)}/>

              <br/>


              <input class="form-controll" placeholder="Quantity" onChange={(e)=> setQuan(e.target.value)}/>
              <br/>


              <input class="form-controll" placeholder="Price" onChange={(e)=> setPrice(e.target.value)}/>
              <br/>


              <select onChange={(e)=> setCid(e.target.value)}>
                  <option>select category</option>
                  {cate.map(item=>(
                      <option value={item.id}>{item.cname}</option>
                  ))}
              </select>


              <input type="file" class="form-controll" onChange={subFile2}/>
              <button class="btn btn-warning" onClick={submitHandle2}>Add Category</button>

          
        </div>
    );
}

export default Admin;