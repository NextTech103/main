import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

function Search() {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(()=> {
    if(!loading){
      searchProduct()
    }
  },[search])



  function searchProduct(){
    setTimeout(()=> {
      setLoading(true)
      fetch(`${process.env.REACT_APP_URL}products?productname=like:${search}`, {
        method: "GET",
        headers: {
          "Content-Type":"Application/Json",
          "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          if(res.success){
            setProduct(res.payload.product)
          }
        })
      .catch((err) => console.log(err));
    },1000)
  }

  return (
    <div class="searchboxm p-2">
      <div class="bg-white py-1">
        <input
          class="form-control form-control-search py-2 home-search"
          style={{ fontSize: 12 }}
          type="search"
          placeholder="Search Here . . ."
          onChange={(e) => {
            setSearch(e.target.value);
            setShow(true);
          }}
        />
        {show ? (
          <>
            <div class="sbox moboff">
              <div class="list-group">
                {product
                  .map((item) => (
                    <Link
                      onClick={() => {
                        setShow(!show);
                      }}
                      to={"/product/" + item.id}
                      class="list-group-item list-group-item-action"
                    >
                      {item.produnctname}
                    </Link>
                  ))}
              </div>
            </div>
            <div class="sboxm mobc">
              <div class="list-group">
                {product
                  .map((item) => (
                    <Link
                      onClick={() => {
                        setShow(!show);
                      }}
                      to={"/product/" + item.id}
                      class="list-group-item list-group-item-action"
                    >
                      {item.productname}
                    </Link>
                  ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
