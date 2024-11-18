import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import Navbarp from "./productnav";
import Sidebar from "./sidebar";
import Bottomnav from "./bottomnav";
import { useHistory } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback, useRef } from "react";
import Filter from "../image/icons/sort.png";
import customFetch from "../fetch-wrapper";

function Category(props) {
  let history = useHistory();
  const cate = props.match.params.cate;
  var active = window.location.pathname.replace("/category/", "");

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const [category, setCategory] = useState([]);
  const [plist, setPlist] = useState([]);
  const [hrange, setHrange] = useState(0);
  const [erange, setErange] = useState(0);
  const [bottomModal, setBottomModal] = useState(false);
  const [loading,setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [update,setUpdate] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const observer = useRef();


  useEffect(()=> {
    window.scroll(0,0)
  },[])
  

  function fetchData(){
    setLoading(true)
    let url = `${process.env.REACT_APP_URL}products?page=${page}&productcategory=${active}`;
    if(hrange != 0 && erange != 0){
       url = `${process.env.REACT_APP_URL}products?page=${page}&productcategory=${active}&sellingprice=between:${hrange},${erange}`;
    }
    customFetch(url, {
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
            setPlist((prevData) => [...prevData, ...res.payload.product]);
          } else {
            setHasMore(false)
          }
          
        }
      })
      .catch((err) => console.log(err));
  }
  


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

  // Fetch data on initial mount and page change
  useEffect(() => {
    // if (hasMore) {
    //   fetchData(page);
    // }
    fetchData(page);
  }, [page,update]);



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



  return (
    <>
      <Navbar />
      <Navbar2 />
      <ToastContainer />


      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
      </div>}

      <div class="mobc px-0 mx-0">
        <div class="searchboxm2 py-2 border-bottom">
          <div class="border bg-white mx-2">
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
                Search Here...
              </span>
            </div>
          </div>

          <p class="my-1 px-2 bangla_font d-flex justify-content-between">
            <span class="catnamemob">
              {categoryList.map((item) => (
                <>{item.id == cate ? item.name : null}</>
              ))}
            </span>
            <span
              class="filterbox"
              onClick={() => {
                setBottomModal(!bottomModal);
              }}
            >
              Price
              <img src={Filter} class="filtericon" />
            </span>
          </p>
        </div>
      </div>

      <div class="container-fluid my-lg-3 my-2 mb-5 pb-3">
        <div class="row">
          {/* <button onClick={()=> dispatch(increment())}>{counter}</button> */}

          <div class="testside moboff" style={{ width: "20%" }}>
            <div class="catside bangla_font">
              
            </div>
            <div class="card-body bg-light border-cate">
              <p class="fw-bold px-2">Price</p>

              <div className="d-flex justify-content-between align-items-centre">
                <input
                  type="number"
                  id="points"
                  value={hrange}
                  name="points"
                  placeholder="Lowest"
                  class="px-2"
                  style={{
                    fontSize: 14,
                    height: "30px",
                    width: "42.5%",
                    border: "none",
                    backgroundColor: "#ddd",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setHrange(e.target.value)}
                ></input>
                <p class="mb-0 mx-2">To</p>
                <div style={{ width: "5%" }}></div>
                <input
                  type="number"
                  id="points"
                  name="points"
                  value={erange}
                  placeholder="Highest"
                  class="px-2"
                  style={{
                    height: "30px",
                    fontSize: 14,
                    width: "42.5%",
                    border: "none",
                    backgroundColor: "#ddd",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setErange(e.target.value)}
                ></input>
              </div>
              <br />
              <button
                onClick={() => {
                  setPlist([])
                  setPage(1)
                  setUpdate(update+1)
                }}
                className="btn btn-warning w-100"
                style={{ backgroundColor: "#ffc300" }}
              >
                Filter
              </button>

              
              <button
                onClick={() => {
                  setPlist([])
                  setHrange(0)
                  setErange(0)
                  setPage(1)
                  setUpdate(update+1)
                }}
                className="btn btn-info w-100 mt-3"
                style={{ backgroundColor: "#ffc300" }}
              >
                See All
              </button>

             
            </div>
          </div>

          <div class="col-lg-9 catpr col-12">
            <div class="row col-lg-12 m-0 categorypr px-lg-3 px-0 py-lg-2 py-0">
              <p class="cat-text-m my-2 moboff bangla_font">
                <span class="" style={{ color: "#004f98" }}>
                  {categoryList.map((item) => (
                    <>{item.id == cate ? item.name : null}</>
                  ))}
                </span>
              </p>

              {plist.length == 0 ? <p>No products found</p> : null}

              {plist
                .map((item) => (
                  <div class="hpcart py-lg-2 py-1 px-lg-2 px-1">
                    <div class="card pb-3 productcard">
                      <Link class="link" to={"/product/" + item.id}>
                        <img
                          src={`${process.env.REACT_APP_URL}${item.pimage}`}
                          class="card-img-top"
                          alt=""
                          srcset=""
                        />
                        <p class="mtop prname mt-3 mb-lg-2 mb-0 px-lg-3 p-lg-0 px-2">
                          {item.productname.substring(0, 35)}...
                        </p>

                        <p class="text-price fs-5 mb-lg-2 mb-0 px-lg-3 px-2">
                        <span style={{ textDecoration: "line-through",fontSize:"15px" }}> ৳ {item.regularprice}</span>
                        <span>৳ {item.sellingprice}</span>
                        </p>
                        {/* <p class="m-0 px-lg-3 px-2 fs-6 text-secondary">
                          <span>
                            <i class="fa-solid fa-star text-warning"></i>
                          </span>
                          
                        </p> */}
                      </Link>
                    </div>
                  </div>
                ))}


               <div ref={lastElementRef} className="loading-indicator">
                {loading && <p>Loading more items...</p>}
              </div>

              



              
            </div>
          </div>
        </div>
      </div>
      <Bottomnav />
      <div
        class={bottomModal ? "bottomSlide bottomSlide-active" : "bottomSlide"}
      >
        <div className="container">
          <div className="d-flex justify-content-between p-2">
            <b>Price</b>
            <i
              onClick={() => {
                setBottomModal(!bottomModal);
              }}
              className="fa fa-close"
              style={{ marginRight: 0, marginTop: 3 }}
            ></i>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center">
            <input
              value={hrange}
              type="number"
              onChange={(e) => {
                setHrange(e.target.value);
              }}
              placeholder="Lowest"
              className="filterInputm"
            />
            <small class="mb-0">To</small>
            <input
              value={erange}
              type="number"
              onChange={(e) => {
                setErange(e.target.value);
              }}
              placeholder="Highest"
              className="filterInputm"
            />
          </div>
          <div class="text-center mt-3">
            <button
              onClick={() => {
                setPlist([])
                setHrange(0)
                setErange(0)
                setPage(1)
                setUpdate(update+1)
                setBottomModal(!bottomModal);
              }}
              className="btn  filterbtn"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setPlist([])
                setPage(1)
                setUpdate(update+1)
                setBottomModal(!bottomModal);
              }}
              className="btn  filterbtn2"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Category);
