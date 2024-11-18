import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import Footer from "./footer";
import { withRouter } from "react-router-dom";
import Navbar from "./navbar";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactImageMagnify from "react-image-magnify";
import Bottomnav from "./bottomnav";
import Productnav from "./productnav";
import customFetch from "../fetch-wrapper";

function Product(props) {
  let history = useHistory();
  var i = props.match.params.id;


  const totalStars = 5 

  const [product, setProduct] = useState({});

  const [html, setHTML] = useState({ __html: "" });
  
  const [coun, setCoun] = useState(0);
  const [alluser, setAlluser] = useState([]);
  const [show, setShow] = useState(false);
  const [st, setSt] = useState("");
  const [pquan, setPquan] = useState(1);
  const [cate, setCate] = useState("");
  const [variant, setVariant] = useState([]);
  const [acolor, setAcolor] = useState("");
  const [asize, setAsize] = useState("");
  const [activeimage, setActiveimage] = useState("");

  
  const [ratings, setRatings] = useState([]);

  const [allcate, setAllcate] = useState([]);
  const [desImage, setDesimage] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [update,setUpdate] = useState(0);
  const [canReview,setCanReview] = useState(false);



  const [loading,setLoading] = useState(false)


  const [rating, setRating] = useState(1);
  
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  
  useEffect(()=> {
    window.scrollTo(0,0);
    fetch(`${process.env.REACT_APP_URL}products/${i}`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),
      },
    }) 
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          setProduct(res.payload.product)
          setHTML({ __html: product.productdescription });
          setActiveimage(res.payload.product.pimage)
          console.log(activeimage)
        } else{
          toast.dark(res.message, {
            icon: "📧",
          });
        }
      })
      .catch((err) => console.log(err));
  },[update])



  useEffect(()=> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    fetch(`${process.env.REACT_APP_URL}ratings?productId=${i}`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),
      },
    }) 
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setRatings(res.payload.Ratings)
          setCanReview(res.payload.canReview)
        }
      })
      .catch((err) => console.log(err));
  },[update])
  

  function postReview(){
    setLoading(true)
    const reviewPostData = {
      "productId":i,
      "rating":rating,
    }
    customFetch(`${process.env.REACT_APP_URL}ratings`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),
      },
      body: JSON.stringify(reviewPostData)
    }) 
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          toast.success(res.message,{
            icon: "🔥",
          });
          setUpdate(update+1)
        } else{
          toast.dark(res.message, {
            icon: "📧",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Productnav />

      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
      </div>}

      <div
        class="modal fade animate__animated animate__slideInUp "
        id="addcartmodal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog addcartModal">
          <div class="modal-content addcartModalC">
            
              
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add to bag to buy product
                  </h5>
                  <button
                    type="button"
                    class="btn btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-body ">
                  

                  <div class="py-2 border-bottom">
                  <p class="m-0">
                    <i class="fa-solid fa-circle-check iconcolorg"></i>{" "}
                    <span class="mx-1">{product.quantity > 0 ? 'Stock Available' : 'Out of Stock'}</span>
                  </p>
                  </div>
                  <div class="row mt-3 mb-3 align-items-center">
                    <div class="col-lg-2">
                      <p class="m-0">Quantity</p>
                    </div>

                    <div class="col-lg-6">
                      <button
                        class="btn bg-light btn-circle"
                        data-field="quantity"
                      >
                        <i
                          class="fa fa-minus"
                          style={{ fontSize: 13 }}
                          onClick={() => {
                            if (pquan < 2) {
                              setPquan(1);
                            } else {
                              setPquan(pquan - 1);
                            }
                          }}
                        ></i>
                      </button>
                      <input
                        type="number"
                        placeholder=""
                        name="quantity"
                        disabled
                        class="quantity-field text-center "
                        value={pquan}
                        style={{ width: "3rem", height: "2rem" }}
                      />
                      <button
                        class="btn bg-light btn-circle"
                        data-field="quantity"
                      >
                        <i
                          class="fa fa-plus"
                          style={{ fontSize: 13 }}
                          onClick={() => {
                            setPquan((prevPquan) => {
                              const newPquan = prevPquan + 1;
                              if (newPquan > product.quantity) {
                                return prevPquan;
                              }
                              return newPquan;
                            });

                            // if (Number(stockCount()) < 5) {
                            //   if (pquan > Number(stockCount()) - 1) {
                            //     setPquan(Number(stockCount()));
                            //   } else {
                            //     setPquan(pquan + 1);
                            //   }
                            // } else {
                            //   if (pquan > 4) {
                            //     setPquan(5);
                            //   } else {
                            //     setPquan(pquan + 1);
                            //   }
                            // }
                          }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="">
                  <button
                    onClick={() => {
                      

                      dispatch(
                        increment(
                          product.productname,
                          pquan,
                          product.quantity,
                          product.sellingprice,
                          '',
                          '',
                          product.id,
                          product.pimage
                        )
                      );

                      toast.success("Product is added to bag");
                    }}
                    type="button"
                    class="btn p-3 text-white rounded-0 addCartB"
                  >
                    Add to Bag
                  </button>




                  <button
                    onClick={() => {
                      

                      dispatch(
                        increment(
                          product.productname,
                          pquan,
                          product.quantity,
                          product.sellingprice,
                          '',
                          '',
                          product.id,
                          product.pimage
                        )
                      );

                      history.push('/cart')
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    class="btn p-3 text-white rounded-0 addCartB mt-2"
                  >
                    Buy Now
                  </button>
                </div>
              
           
          </div>
        </div>
      </div>

      <div class=" container-fluid bg-white py-lg-3 my-lg-0 my-1">
        <div class="addcrt_btn mobc">
          <button
            class="btn btn_abs text-white"
            data-bs-toggle="modal"
            data-bs-target="#addcartmodal"
          >
            <img
              src={require("../image/icons/cartbag.png")}
              class="navbicon pt-0 mt-0"
            />
            <p class="mb-0 mx-2">Buy</p>
          </button>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-10 col-12 px-auto product_body mb-lg-0 mb-2">
            
              <div>
                <div class="bg-white product-container py-3 moboff">
                  <div class="d-flex flex-row px-3">
                    {activeimage && <div class="productImage">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            height: 400,
                            width: 400,
                            sizes: "cover",
                            alt: "Wristwatch by Ted Baker London",
                            src:
                              `${process.env.REACT_APP_URL}${activeimage}`,
                          },
                          largeImage: {
                            src:
                              `${process.env.REACT_APP_URL}${activeimage}`,
                            width: 800,
                            height: 800,
                          },
                        }}
                      />

                      <br />
                      <img
                        class="m-2"
                        onClick={() => setActiveimage(product.pimage)}
                        style={{ width: 80, cursor: "pointer" }}
                        src={
                          `${process.env.REACT_APP_URL}${product.pimage}`
                        }
                      />
                      {product.pimage2 &&
                        <img
                          class="m-2"
                          onClick={() => setActiveimage(product.pimage2)}
                          style={{ width: 80, cursor: "pointer" }}
                          src={
                            `${process.env.REACT_APP_URL}${product.pimage2}`
                          }
                        />
                      }
                      {product.pimage3 &&
                        <img
                          class="m-2"
                          onClick={() => setActiveimage(product.pimage3)}
                          style={{ width: 80, cursor: "pointer" }}
                          src={
                            `${process.env.REACT_APP_URL}${product.pimage3}`
                          }
                        />
                      }
                    </div>}

                    <div class="flex-fill px-4">
                      <p class="fs-3" style={{ fontWeight: 500 }}>
                        {product.productname}
                      </p>

                      <h3 class="pt-3 ">
                        <span style={{ textDecoration: "line-through",fontSize:"15px" }}> ৳ {product.regularprice}</span>&nbsp;
                        <span style={{ color: "rgb(49, 49, 49)" }}>
                            ৳ {product.sellingprice}
                        </span>
                      </h3>

                      <div class="rounded pb-card w-50 p-2">
                        <small class="mtop m-0">
                          <i class="fa-solid fa-circle-check iconcolorg"></i>
                          <span class="mx-1">Rating: {product.totalRating}</span>

                          <span>
                            <i class="fa-solid fa-star text-warning"></i>
                          </span>
                        </small>
                        <br></br>
                        <small class="mtop m-0">
                          <i class="fa-solid fa-circle-check iconcolorg"></i>
                          <span class=""> Brand {product.brandname}</span>
                        </small>
                        <br></br>
                        <div class="mtop m-0">
                        <small class="m-0">
                           <span class="mx-1">{product.quantity > 0 ? 'Stock Available' : 'Out of Stock'}</span>
                        </small>
                        
                          
                        </div>{" "}
                      </div>
                      <div class="my-3 d-flex align-items-center pb-3">
                        <small class="m-0 exd py-1">
                          <img
                            src={require("../image/icons/shield.png")}
                            class="webicons pt-0 mt-0"
                          />
                          <span class="mb-0 mx-1">
                            Cash on Delivery
                          </span>
                        </small>
                      </div>

                      <div class="my-3 d-flex align-items-center pb-3 border-bottom">
                        <small style={{ marginRight: 10, color: "grey" }}>
                          <i>Supplied by</i>
                        </small>

                        <small class="m-0 exd py-1">
                          <img
                            src={require("../image/icons/shipping.png")}
                            class="webicons pt-0 mt-0"
                          />
                          <span class="mb-0 mx-1">Mayeda Mart</span>
                        </small>
                      </div>

                  

                      <div class="row mt-3 mb-3 align-items-center">
                        {/* <div class="col-lg-2">
                          <p class="m-0">Quantity</p>
                        </div> */}

                        <div class="col-lg-4">
                          <button
                            class="btn bg-light btn-circle"
                            data-field="quantity"
                          >
                            <i
                              class="fa fa-minus"
                              style={{ fontSize: 13 }}
                              onClick={() => {
                                if (pquan < 2) {
                                  setPquan(1);
                                } else {
                                  setPquan(pquan - 1);
                                }
                              }}
                            ></i>
                          </button>
                          <input
                            type="number"
                            placeholder=""
                            name="quantity"
                            disabled
                            class="quantity-field text-center "
                            value={pquan}
                            style={{ width: "3rem", height: "2rem" }}
                          />
                          <button
                            class="btn bg-light btn-circle"
                            data-field="quantity"
                          >
                            <i
                              class="fa fa-plus"
                              style={{ fontSize: 13 }}
                              onClick={() => {
                                
                                setPquan((prevPquan) => {
                                  const newPquan = prevPquan + 1;
                                  if (newPquan > product.quantity) {
                                    return prevPquan;
                                  }
                                  return newPquan;
                                });
                                
                                // if (Number(stockCount()) < 5) {
                                //   if (pquan > Number(stockCount()) - 1) {
                                //     setPquan(Number(stockCount()))
                                //   } else {
                                //     setPquan(pquan + 1);
                                //   }
                                // } else {
                                //   if (pquan > 4) {
                                //     setPquan(5);
                                //   } else {
                                //     setPquan(pquan + 1);
                                //   }
                                // }
                              }}
                            ></i>
                          </button>
                        </div>
                        <div class="col-lg-4">
                          <button
                            onClick={() => {
                              
                              dispatch(
                                increment(
                                  product.productname,
                                  pquan,
                                  product.quantity,
                                  product.sellingprice,
                                  '',
                                  '',
                                  product.id,
                                  product.pimage
                                )
                              );

                              toast.success("Products added to bag successfully");
                            }}
                            class="btn btn-lg w-100 add-cart-btn-success "
                          >
                            <img
                              src={require("../image/icons/cartbag.png")}
                              class="navbicon pt-0 mt-0 mx-2"
                            />
                            Add to bag
                          </button>
                        </div>

                        <div class="col-lg-4">
                          <button
                            onClick={() => {
                              
                              dispatch(
                                increment(
                                  product.productname,
                                  pquan,
                                  product.quantity,
                                  product.sellingprice,
                                  '',
                                  '',
                                  product.id,
                                  product.pimage
                                )
                              );

                              history.push('/cart')
                            }}
                            class="btn btn-lg w-100 add-cart-btn-success "
                          >
                            <img
                              src={require("../image/icons/cartbag.png")}
                              class="navbicon pt-0 mt-0 mx-2"
                            />
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-white product-container rounded-0 py-3 mobc">
                  <div class="col-12 px-3">
                    <div class="">
                      {activeimage && <img
                        style={{ width: "100%" }}
                        src={
                         `${process.env.REACT_APP_URL}${activeimage}`
                        }
                      />}

                      <br />
                      <img
                        class="m-2"
                        onClick={() => setActiveimage(product.pimage)}
                        style={{ width: 80, cursor: "pointer" }}
                        src={
                          `${process.env.REACT_APP_URL}${product.pimage}`
                        }
                      />
                      {product.pimage2  &&
                        <img
                          class="m-2"
                          onClick={() => setActiveimage(product.pimage2)}
                          style={{ width: 80, cursor: "pointer" }}
                          src={
                            `${process.env.REACT_APP_URL}${product.pimage2}`
                          }
                        />
                      }
                      {product.pimage3 &&
                        <img
                          class="m-2"
                          onClick={() => setActiveimage(product.pimage3)}
                          style={{ width: 80, cursor: "pointer" }}
                          src={
                          `${process.env.REACT_APP_URL}${product.pimage3}`
                          }
                        />
                      }
                    </div>
                    <div class="col-12 mt-2">
                      <h3 class="mt-3">
                          <span style={{ textDecoration: "line-through",fontSize:"15px" }}> ৳ {product.regularprice}</span>&nbsp;
                          <span style={{ marginRight: 8, color: "#ffa200" }}>
                              ৳ {product.sellingprice}
                          </span>
                      </h3>
                      <p class="fs-3" style={{ fontWeight: 500 }}>
                        {product.productname}
                      </p>
                      <div class="card p-1 pb-card">
                        <p class="mtop border-bottom p-2 m-0">
                          <i class="fa-solid fa-circle-check iconcolorg"></i>{" "}
                          Ratings: {product.totalRating}
                          <span>
                            <i class="fa-solid fa-star text-warning"></i>
                          </span>
                        </p>
                        <p class="mtop border-bottom p-2 m-0">
                          <i class="fa-solid fa-circle-check iconcolorg"></i>{" "}
                          Brand: {product.brandname}
                        </p>
                        
                        <p class="m-0 p-2">
                          <span class="mx-1">{product.quantity > 0 ? 'Stock Available' : 'Out of Stock'}</span>
                        </p>
                        
                      </div>

                      <div class="my-3 d-flex align-items-center pb-3 border-bottom">
                        <small class="m-0 exd py-1">
                          <img
                            src={require("../image/icons/shield.png")}
                            class="webicons pt-0 mt-0"
                          />
                          <span class="mb-0 mx-1">
                            Cash on Delivery
                          </span>
                        </small>
                      </div>

                      <div class="my-3 d-flex align-items-center pb-3 border-bottom">
                        <small style={{ marginRight: 10, color: "grey" }}>
                          <i>Supplied by</i>
                        </small>

                        <small class="m-0 exd py-1">
                          <img
                            src={require("../image/icons/shipping.png")}
                            class="webicons pt-0 mt-0"
                          />
                          <span class="mb-0 mx-1">Mayeda Mart</span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="my-lg-3 my-1 bg-white product-container rounded-0">
                  <div
                    class="nav nav-pills product_info_nav border-top"
                    id="nav-tab"
                    role="tablist"
                  >
                    <a
                      class="nav-link active pr_in_nav_active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <span class="mobfont1">Product Description</span>
                    </a>
                    <a
                      class="nav-link pr_in_nav_active"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span class="mobfont1">Product Review</span>
                    </a>
                  </div>

                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div class="my-4">
                        <div
                          class=" mx-4 pb-4"
                          dangerouslySetInnerHTML={{__html: product.productdescription}}
                        ></div>

                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div class="my-4 p-3">
                        {canReview && <div className="card p-3">
                          <small>Rate this product ?</small>
                          <div className="d-flex align-items-center">
                            {[...Array(totalStars)].map((_, index) => {
                              const starIndex = index + 1;
                              return (
                                <i
                                  key={index}
                                  className={`fa-star ${starIndex <= rating ? 'fas' : 'far'}`}
                                  onClick={() => handleStarClick(starIndex)}
                                  style={{ color: starIndex <= rating ? 'gold' : 'gray', cursor: 'pointer', marginRight: '5px', fontSize: '24px' }}
                                />
                              );
                            })}
                            <button onClick={()=> postReview()} className="btn btn-primary ml-3">
                              Submit
                            </button>
                          </div>
                        </div>}
                            
                        {ratings.length === 0 && <p>No review found</p>}

                        {ratings.length > 0 && <div className="card p-3 mt-3">
                           {ratings.map(item=> (
                            <div style={{borderBottom:'2px dotted #ddd',marginBottom:'5px'}}>
                              <p><b>{item.user.username}</b>
                              &nbsp;<small>{new Date(item.user.createdAt).toLocaleDateString('en-GB')}</small></p>
                              {[...Array(item.rating)].map((_, index) => {
                              const starIndex = index + 1;
                              return (
                                <i
                                  key={index}
                                  className={`fa-star ${starIndex <= item.rating ? 'fas' : 'far'}`}
                                  style={{ color:'gold', cursor: 'pointer', marginRight: '5px', fontSize: '24px' }}
                                />
                              );
                            })}
                            </div>
                           ))}
                        </div>}

                      
                           
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
      </div>

      <div class="container-fluid bg-white">
        <div class="row justify-content-center">
          <div className="col-lg-10 col-12 bg-white mb-lg-0 mb-5">
            <div class="suggesteditem rounded-0">
              
            </div>
          </div>
        </div>
      </div>

      <Bottomnav />
      <Footer />
    </>
  );
}

export default withRouter(Product);
