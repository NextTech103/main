import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bottomnav from "./bottomnav";
import Footer from "./footer";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";



function Home() {
  let history = useHistory();
  const [loading,setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more pages to load
  const observer = useRef();
  const [page, setPage] = useState(1);

  const [product, setProduct] = useState([
  ]);
  const [popular, setPopular] = useState([
  ]);
  const [covers, setCovers] = useState([]);
  const [categoryList, setCategoryList] = useState([])




  function fetchData(){
    setLoading(true)
    fetch(`${process.env.REACT_APP_URL}products?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          if(res.payload.product.length > 0){
            setProduct((prevData) => [...prevData, ...res.payload.product]);
          } else {
            setHasMore(false)
          }
          
        }
      })
      .catch((err) => console.log(err));
  }
  // Fetch data on initial mount and page change
  useEffect(() => {
    if (hasMore) {
      fetchData(page);
    }
  }, [page]);



  useEffect(()=> {
    // setLoading(true)
    fetch(`${process.env.REACT_APP_URL}products?isflash=1`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setLoading(false)
        if(res.success){
          setPopular(res.payload.product)
        }
      })
      .catch((err) => console.log(err));
  },[])




  useEffect(()=> {
    // setLoading(true)
    fetch(`${process.env.REACT_APP_URL}covers`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setLoading(false)
        if(res.success){
          setCovers(res.payload.cover)
        }
      })
      .catch((err) => console.log(err));
  },[])


  useEffect(()=> {
    // setLoading(true)
    fetch(`${process.env.REACT_APP_URL}category`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setLoading(false)
        if(res.success){
          setCategoryList(res.payload.Category)
        }
      })
      .catch((err) => console.log(err));
  },[])




  // Callback to handle pagination when observing the "load more" element
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  

  return (
    <>
      <Navbar />
      <Navbar2 />
      <ToastContainer />




      <div class=" container-fluid searchboxh mt-lg-3 py-2 mobc">
        <div class="row">
          <div class="col-lg-12 col-12">
            <div class="navbar-search bg-white">
              <div class="input-group" style={{ position: "relative" }}>
                <span class="input-group-prepend ">
                  <div class="input-group-text home-search">
                    <i
                      class="fa fa-search"
                      style={{ color: "#565656", fontSize: 14 }}
                    ></i>
                  </div>
                </span>
                <span
                  onClick={() => history.push("/search")}
                  class="form-control form-control-search py-2 home-search"
                  style={{ fontSize: 12, cursor: "pointer" }}
                  type="search"
                >
                  Search Here . . .
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div class="container-fluid p-0 mt-lg-0">
        <div id="home-car-id" class="carousel slide " data-bs-ride="carousel">
          <div class="carousel-indicators">
            {covers.map((item, index) => (
              <button
                type="button"
                data-bs-target="#home-car-id"
                data-bs-slide-to={index}
                class={index == 0 ? "active" : ""}
                aria-current="true"
                aria-label="Slide 1"
              ></button>
            ))}
          </div>

          <div class="carousel-inner home-car">
            {covers.map((item, index) => (
              <div
                class={index == 0 ? "carousel-item active" : "carousel-item"}
                data-bs-interval="3000"
              >
                <img
                  onClick={() => {
                    if (item.category != 0) {
                      history.push("/category/" + item.covercategory);
                    }
                  }}
                  src={
                    `${process.env.REACT_APP_URL}${item.coverimage}`
                  }
                  class="d-block w-100 home-car"
                  alt="..."
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#home-car-id"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#home-car-id"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="px-lg-5 px-2 mb-0 mobc bg-white">
            <div class="col-lg-12 pt-2 pb-1">
              <p class="fs-3 mt-lg-2 mt-0 mb-1" style={{ fontWeight: 600 }}>
                <span style={{ color: "#ffa300" }}>Trending</span> Category
              </p>
            </div>
            <div class="row mx-lg-5 mx-0 py-3 pt-0">

              {categoryList.map(item => (
                 <Link
                 to={`/category/${item.id}`}
                 class="col-lg-2 col-4 px-1 mb-lg-0 mb-3 text-center navlinkc"
                  >
                    <div class="navlinkc2 py-2">
                      <img
                        src={`${process.env.REACT_APP_URL}${item.icon}`}
                        class="nav-logo-2"
                        alt=""
                        srcset=""
                      />
                      <p class="mb-0 navcname">{item.name}</p>
                    </div>
                  </Link>
              ))}
              {/* <Link
                to={"/category/1"}
                class="col-lg-2 col-4 px-1 mb-lg-0 mb-3 text-center navlinkc"
              >
                <div class="navlinkc2 py-2">
                  <img
                    src={require("../image/icons/house-decoration.png")}
                    class="nav-logo-2"
                    alt=""
                    srcset=""
                  />
                  <p class="mb-0 navcname">Electronic Decoration</p>
                </div>
              </Link>
              <Link
                to={"/category/2"}
                class="col-lg-2 col-4 px-1 mb-lg-0 mb-3 text-center navlinkc"
              >
                <div class="navlinkc2 py-2">
                  <img
                    src={require("../image/icons/microphone-black-shape.png")}
                    class="nav-logo-2"
                    alt=""
                    srcset=""
                  />
                  <p class="mb-0 navcname">Microphone</p>
                </div>
              </Link>
              <Link
                to={"/category/3"}
                class="col-lg-2 col-4 px-1 text-center navlinkc"
              >
                <div class="navlinkc2 py-2">
                  <img
                    src={require("../image/icons/earg.png")}
                    class="nav-logo-2"
                    alt=""
                    srcset=""
                  />
                  <p class="mb-0 navcname">Electronic Gadget</p>
                </div>
              </Link> */}
            </div>
          </div>

          <div class="">
            <div
              class="col-lg-12 my-lg-3 my-2 mb-0 popitem"
              style={{ position: "relative" }}
            >
              <div class="col-lg-12 p-lg-3 p-0 pt-2 pb-1 bangla_font ">
                <p class="mt-0 pb-0 mb-lg-0 mb-1 sdealfont">
                  <span style={{ color: "#ffa300" }}>Flash</span> Sale
                </p>
              </div>

              <div
                id="pop"
                style={{
                  width: "100%",
                  overflow: "auto",
                  whiteSpace: "nowrap",
                  transition: "1s",
                }}
                class="px-lg-1 px-0"
              >
                {popular.map((item) => (
                  <Link
                    className="link popcarditem"
                    style={{ display: "inline-block" }}
                    to={"/product/" + item.id}
                  >
                    <div class="text-center py-0 px-lg-2 px-1">
                      <div class="card p-2 pb-3 productcard2">
                        <div class="link">
                          <img
                            src={`${process.env.REACT_APP_URL}${item.pimage}`}
                            class="card-img-top2"
                            alt=""
                            srcset=""
                          />
                        
                          <p class="mtop prname mb-2 p-0">
                            {item.productname.substring(0, 20)}...
                          </p>
                          {/* <p class="mtop qty-text">{item.quan}</p> */}
                          <p class="mtop pprprice mt-lg-0 my-2">
                          ৳<span style={{ textDecoration: "line-through", fontSize:"15px" }}>{item.regularprice}</span> ৳{item.sellingprice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div class="row px-3 mt-3 bangla_font">
                <div class="col-lg-6 col-12 px-2 mb-lg-0 mb-2 moboff">
                  <div class="bg-white feature1">
                    <h4 class="fw-bold px-lg-5 px-3 mx-lg-5 mx-0 pt-4">
                      Cash On Delivery <br></br>
                      <span class="dif-text"> Within 48 Hours</span>
                    </h4>
                  </div>
                </div>
                <div class="col-lg-6 px-2 moboff">
                  <div class="bg-white feature2">
                    <h4 class="fw-bold px-lg-5 px-3 mx-lg-5 mx-0 pt-4">
                      Buy quantity Product<br></br>
                      <span class="dif-text2">At lowest price</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mobc">
            <div class="row px-1 px-lg-3 mt-2 bangla_font">
              <div class="col-lg-6 col-12 px-2 mb-lg-0 mb-2">
                <div class="bg-white feature1">
                  <h5 class="fw-bold px-lg-5 px-3 mx-lg-5 mx-0 pt-4">
                  Cash On Delivery <br></br>
                    <span class="dif-text"> Within 48 Hours</span>
                  </h5>
                </div>
              </div>
              <div class="col-lg-6 col-12 px-2">
                <div class="bg-white feature2">
                  <h5 class="fw-bold px-lg-5 px-3 mx-lg-5 mx-0 pt-4">
                  Buy quantity Product<br></br>
                    <span class="dif-text2">At lowest price</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12 moboff">
            <div class="categorymain my-2 bangla_font ">
              <p
                class="fs-3 text-center pt-3 mb-0 "
                style={{ fontWeight: 600 }}
              >
                <span style={{ color: "#ffa300" }}>All</span> Category
              </p>
              <div class="row px-lg-5 px-0 pt-2 pb-lg-4 pb-2 mx-0 ">
                {categoryList.map(item => (
                  <div class="col-lg-4 col-6 my-lg-3 my-2">
                   <Link to={`/category/${item.id}`} class="card cardcm navlinkc">
                     <div class="row py-lg-3 py-1">
                       <div class="col-lg-8 text-center">
                         <p class="mb-lg-0 mb-2 navcname">{item.name}</p>
                       </div>
                       <div class="col-lg-4 pb-lg-0 pb-2 text-center">
                         <img
                           src={`${process.env.REACT_APP_URL}${item.icon}`}
                           class="nav-logo-3"
                           alt=""
                           srcset=""
                         />
                       </div>
                     </div>
                   </Link>
                 </div>
                ))}
                
                {/* <div class="col-lg-4 col-6 my-lg-3 my-2">
                  <Link to={"/category/2"} class="card cardcm navlinkc">
                    <div class="row py-lg-3 py-1">
                      <div class="col-lg-8 text-center">
                        <p class="mb-lg-0 mb-2 navcname">
                           Microphone
                        </p>
                      </div>
                      <div class="col-lg-4 pb-lg-0 pb-2 text-center">
                        <img
                          src={require("../image/icons/microphone-black-shape.png")}
                          class="nav-logo-3"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div class="col-lg-4 col-6 my-lg-3 my-2">
                  <Link to={"/category/3"} class="card cardcm navlinkc">
                    <div class="row py-lg-3 py-1">
                      <div class="col-lg-8 text-center">
                        <p class="mb-lg-0 mb-2 navcname">
                          Electronic Gadget
                        </p>
                      </div>
                      <div class="col-lg-4 pb-lg-0 pb-2 text-center">
                        <img
                          src={require("../image/icons/earg.png")}
                          class="nav-logo-3"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </div>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          <p class="sdealfont mt-4 text-center mb-0 moboff">
            Your Favorite Products
          </p>
          <div class="col-lg-12 mt-lg-4 mt-2 px-lg-5 px-1 mb-5 mb-lg-0 pb-lg-0 pb-3 bg-light moreitems">
            <div class="container-fluid px-3 pt-lg-3 pt-1">
              <p class="sdealfont mt-1 text-center mb-0 mobc">
              Your Favorite Products
              </p>
              <div class="row">
                {product.map((item) => (
                  <div
                    to={"/product/" + item.id}
                    class="hpcart2 py-2 px-lg-2 px-0"
                  >
                    <div class="card pb-0 mx-lg-2 mx-1  productcard">
                      <Link class="link" to={"/product/" + item.id}>
                        <img
                          src={`${process.env.REACT_APP_URL}${item.pimage}`}
                          class="card-img-top"
                          alt=""
                          srcset=""
                        />
                        <p class="mtop prname mt-lg-3 mt-1 mb-0 p-0 p-1 px-lg-3 px-2 moboff ">
                          {item.productname.substring(0, 35)}...
                        </p>

                        <p class="mtop prname mt-lg-3 mt-1 mb-0 p-0 p-1 px-lg-3 px-2  mobc">
                          {item.productname.substring(0, 35)}...
                        </p>
                        
                        <p class="mtop prname mt-1 mb-0 p-0 p-1 px-lg-3 px-2 moboff">
                          {item.category.name}
                        </p>


                        <p class="mtop prname mt-lg-3 mt-1 mb-0 p-0 p-1 px-lg-3 px-2  mobc">
                          {item.category.name}
                        </p>


                        {/* <p class="mtop qty-text">{item.quan}</p> */}
                        <p class=" text-price mb-2 px-lg-3 px-2 fw-bold">
                        ৳<span style={{ textDecoration: "line-through", fontSize:"15px" }}>{item.regularprice}</span> <span>৳ {item.sellingprice}</span>
                        </p>

                        {/* <p class="m-0 px-lg-3 px-2 fs-6 text-secondary">
                          <span>
                            <i class="fa-solid fa-star mx-1 text-warning"></i>
                          </span>
                          {item.star.toFixed(2)}
                        </p> */}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>



              <div ref={lastElementRef} className="loading-indicator">
                {loading && <p>Loading more items...</p>}
              </div>


            </div>
          </div>
        </div>
      </div>

      <Bottomnav />
      <Footer />
    </>
  );
}

export default Home;
