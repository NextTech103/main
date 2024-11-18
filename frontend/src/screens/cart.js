import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import { useHistory, withRouter, Link } from "react-router-dom";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import Bottomnav from "./bottomnav";
import decrement from "../actions/decrement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nullify from "../actions/nullify";
import  customFetch  from "../fetch-wrapper";

function Cart() {
  let history = useHistory();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const [coun, setCoun] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [dlist, setDlist] = useState([]);
  const [did, setDid] = useState("");
  const [load, setLoad] = useState(false);
  const [allprod, setAllprod] = useState([]);
  const [show, setShow] = useState(false);
  const [otype, setOtype] = useState("shop");
  const [note, setNote] = useState("");

  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [hname, setHname] = useState("");
  const [phone, setPhone] = useState("");
  const [sname, setSname] = useState("");
  const [aname, setAname] = useState("");
  const [street, setStreet] = useState("");
  const [label, setLabel] = useState("");

  const [coupen, setCoupen] = useState("");
  const [info, setInfo] = useState({});


  const [deliveryPhone,setDeliveryPhone] = useState("");
  const [deliveryAddress,setDeliveryAddress] = useState("");
  const [deliveryNote,setDeliveryNote] = useState("");

  const [deliveryCharge,setDeliveryCharge] = useState(0);
  const [deliveryChargeInfo,setDeliveryChargeInfo] = useState({})


  useEffect(() => {
    window.scrollTo(0,0);
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
    let newTotal = 0;
    let totalQuantity = 0;
    storedItems.forEach(item => {
      newTotal += item.price*item.quantity;
      totalQuantity += item.totalQuantity;
    });
    setTotal(newTotal);
    setTotalQuantity(totalQuantity);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      setName(userInfo.username)
      setEmail(userInfo.email)
      setInfo(userInfo.id)
    }
  }, [coun]);



  useEffect(()=> {
    fetch(`${process.env.REACT_APP_URL}delivery-charge/`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),
      },
    }) 
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setDeliveryChargeInfo(res.payload.DeliveryCharge[0])
        } else{
          toast.dark(res.message, {
            icon: "📧",
          });
        }
      })
      .catch((err) => console.log(err));
  },[coun])
  

  function upquan(index, i) {
    i++;
    var items = JSON.parse(localStorage.getItem("items"));
    if(i > items[index].totalQuantity){
      i = i - 1;
    }
    items[index].quantity = i;
    localStorage.setItem("items", JSON.stringify(items));
    setCoun(coun + 1);
  }

  function upquan2(index, i) {
    i--;
    if (i < 1) {
      i = 1;
    }
    var items = JSON.parse(localStorage.getItem("items"));
    items[index].quantity = i;
    localStorage.setItem("items", JSON.stringify(items));
    setCoun(coun + 1);
  }

  function orderprod() {
    if (localStorage.getItem("token") == null) {
      history.push("/login");
      return false;
    }

  
    if (localStorage.getItem("items") == null) {
      toast.warning("Add products to your cart", {
        icon: "🛵",
      });
      return false;
    }


    if(deliveryAddress === ""){
      toast.warning("Add delivery details", {
        icon: "🛵",
      });
      return false;
    }

    if(deliveryCharge === 0){
      toast.warning("Add delivery charge", {
        icon: "🛵",
      });
      return false;
    }


    if(deliveryPhone === ""){
      toast.warning("FIll up phone number", {
        icon: "🛵",
      });
      return false;
    }
    setLoad(true);
    const data = {
      "quantity": totalQuantity,
      "deliveryAddress": deliveryAddress,
      "deliveryPhoneNumber": deliveryPhone,
      "deliverNote": deliveryNote,
      "deliveryCharge":deliveryCharge,
      "userId":info,
      "orderItem": JSON.parse(localStorage.getItem("items"))
    }
    customFetch(`${process.env.REACT_APP_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false)
        if (res.success) {
          localStorage.removeItem("items");
          localStorage.removeItem("count");
          setLoad(false);
          setCoun(coun + 1);
          dispatch(nullify());
          history.push("/confirm");

          toast.success("Product ordered successfully !", {
            icon: "🛒",
          });
        }
      })
      .catch((err) => {
        setLoad(false)
        toast.success("Something went wrong.", {
          icon: "🛒",
        });
      });
  }

  function delivery() {
    const data = new FormData();
    data.append("name", name);
    data.append("phone", phone);
    data.append("label", label);
    data.append("hname", hname);
    data.append("sname", sname);
    data.append("aname", aname);
    data.append("street", street);
    data.append("token", localStorage.getItem("token"));

    fetch("https://sowdaapp.com/sandweep/deliverypost", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setCoun(coun + 1);
        toast.success("Address added", {
          icon: "🛵",
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <Navbar2 />
      <ToastContainer />
      <div class="container-fluid px-lg-5 mb-lg-0 mb-5">
        <div class="row">
          <div class="col-lg-9 col-12 moboff">
            <div class="col-lg-12 card-body bg-white my-lg-4 my-2 mb-lg-1">
              <p class="my-auto fs-5">Shopping Bag ({counter})</p>
            </div>
            <div class="col-lg-12 card-body bg-white mb-1">
              {items.length == 0 ? (
                <div class="text-center">
                  <img
                    src={require("../image/icons/no_product.gif")}
                    class="noproduct pt-0 mt-0"
                  />
                  <p style={{ marginTop: -30 }}>
                    Add your favorite product to carts.
                  </p>
                </div>
              ) : null}
              {items.map((item, index) => (
                <div class="row mb-1 cartitem py-2">
                  <div class="col-lg-5">
                    <div class="d-flex">
                            <img
                              src={
                                `${process.env.REACT_APP_URL}${item.pimage}`
                              }
                              class="cart-pr-img"
                              alt=""
                              srcset=""
                            />
                      <div class="mx-4 my-auto">
                        <p class="cart-pro-name">
                          {item.name}
                        </p>

                        <p class="text-warning fs-4 mtop">৳ {item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 my-auto">
                    <div class="input-group cart-i-d-margin">
                      <input
                        type="button"
                        value="-"
                        class="button-minus text-muted rounded-circle icon-sm mx-3"
                        data-field="quantity"
                        onClick={() => upquan2(index, item.quantity)}
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        placeholder="1000 gm"
                        name="quantity"
                        class="quantity-field  text-center w-25"
                        readOnly
                      />
                      <input
                        type="button"
                        value="+"
                        class="button-plus text-muted rounded-circle icon-sm  mx-3"
                        data-field="quantity"
                        onClick={() => upquan(index, item.quantity)}
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 my-auto">
                    <div class="text-end cart-trash">
                      <i
                        onClick={() => {
                          dispatch(decrement(index));
                          setCoun(coun + 1);
                        }}
                        class="fa-solid fa-trash-can text-muted cur"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {localStorage.getItem("token") == null ? (
              <>
                <div class="col-lg-12 card-body bg-white my-4">
                  <p class="my-auto fs-5">Delivery Information</p>
                  

                  <div class="d-flex justify-content-between mt-3">
                    <p class="">
                      No delivery information available/
                    </p>
                    <Link to={"/login"} class=" modal-decoration">
                      Login to add delivery address
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div class="col-lg-12 card-body bg-white my-4">
                <p class="my-auto fs-5">Delivery Information</p>
                
                
                 <div className="row">
                    <div className="col-sm-4">
                      <label>Name</label>
                      <input type="text" value={name}  className="form-control" readOnly/>
                    </div>
                    <div className="col-sm-4">
                      <label>Email</label>
                      <input type="text" value={email} className="form-control" readOnly/>
                    </div>
                    <div className="col-sm-4">
                      <label>Phone Number</label>
                      <input type="text" onChange={(e)=> setDeliveryPhone(e.target.value)} className="form-control"/>
                    </div>
                 </div>
                 <br/>
                 <div className="row">
                    <div className="col-sm-6">
                      <label>Address</label>
                      <textarea className="form-control" onChange={(e)=> setDeliveryAddress(e.target.value)}></textarea>
                    </div>
                    <div className="col-sm-6">
                      <label>Note</label>
                      <textarea className="form-control" onChange={(e)=> setDeliveryNote(e.target.value)}></textarea>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div class="col-lg-9 col-12 mobc">
            <div class="col-lg-12 col-12 card-body bg-white my-lg-4 my-2">
              <h5 class="my-auto fw-bold">Shopping bag ({counter})</h5>
            </div>
            <div class="col-lg-12 card-body bg-white mb-1">
              {items.length == 0 ? (
                <div class="text-center">
                  <img
                    src={require("../image/icons/no_product.gif")}
                    class="noproduct pt-0 mt-0"
                  />
                  <p style={{ marginTop: -30 }}>
                    Add your favorite products to cart
                  </p>
                </div>
              ) : null}
              {items.map((item, index) => (
                <div class="row mb-1 cartitem py-2">
                  <div class="col-lg-5">
                    <div class="d-flex">
                            <img
                              src={
                                 `${process.env.REACT_APP_URL}${item.pimage}`
                              }
                              class="cart-pr-img"
                              alt=""
                              srcset=""
                            />
                      <div class="mx-4 my-auto">
                        <p class="cart-pro-name">
                          {item.name}
                        </p>

                        <p class="text-warning fs-4 mtop">৳ {item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 my-auto">
                    <div class="input-group cart-i-d-margin">
                      <input
                        type="button"
                        value="-"
                        class="button-minus text-muted rounded-circle icon-sm mx-3"
                        data-field="quantity"
                        onClick={() => upquan2(index, item.quantity)}
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        placeholder="1000 gm"
                        name="quantity"
                        class="quantity-field  text-center w-25"
                        readOnly
                      />
                      <input
                        type="button"
                        value="+"
                        class="button-plus text-muted rounded-circle icon-sm  mx-3"
                        data-field="quantity"
                        onClick={() => upquan(index, item.quantity)}
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 my-auto">
                    <div class="text-end cart-trash">
                      <i
                        onClick={() => {
                          dispatch(decrement(index));
                          setCoun(coun + 1);
                        }}
                        class="fa-solid fa-trash-can text-muted cur"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {localStorage.getItem("token") == null ? (
              <>
                <div class="col-lg-12 card-body bg-white my-4">
                  <p class="my-auto fs-5">Delivery Information</p>
                  

                  <div class="d-flex justify-content-between mt-3">
                    <p class="">
                      No Delivery Information Available
                    </p>
                    <Link to={"/login"} class=" modal-decoration">
                      Login to add delivery information
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div class="col-lg-12 card-body bg-white my-4">
                <p class="my-auto fs-5">Delivery Information</p>
                <hr/>
                
    

                 <div className="row">
                    <div className="col-sm-4">
                      <label>Mobile</label>
                      <input type="text" onChange={(e)=> setDeliveryPhone(e.target.value)} className="form-control"/>
                    </div>
                    <div className="col-sm-4">
                      <label>Address</label>
                      <textarea className="form-control" onChange={(e)=> setDeliveryAddress(e.target.value)}></textarea>
                    </div>
                    <div className="col-sm-4">
                      <label>Note</label>
                      <textarea className="form-control" onChange={(e)=> setDeliveryNote(e.target.value)}></textarea>
                    </div>
                 </div>
              </div>
            )}

            
          </div>
          <div class="col-lg-3 col-12 mb-3">
            <div class="container-fluid px-0">
              <div class="card-body bg-white my-lg-4 my-0">
                <div class="d-flex">
                  <img
                    src={require("../image/icons/pay.png")}
                    class="webicon pt-0 mt-0"
                  />
                  <p class="fw-bold  mb-1 mx-2">Payment Method</p>
                </div>
                <div class="my-3 card p-2 bg-light ptype">
                  <div class="d-flex  align-items-center ">
                    <i
                      class="fa-solid fa-circle-check"
                      style={{ color: "#ffc200" }}
                    ></i>
                    <p
                      class="mb-0 mx-2"
                      style={{ fontWeight: 500, color: "#565656" }}
                    >
                      Cash On Delivery
                    </p>
                  </div>
                </div>

                <div class="d-flex mt-4">
                  <img
                    src={require("../image/icons/orders.png")}
                    class="webicon pt-0 mt-0"
                  />
                  <p class="fw-bold mx-2">Order Summery</p>
                </div>

                <div class="d-flex justify-content-between">
                  <p>Total Price</p>
                  <p>৳ {total}</p>
                </div>


                <div class="d-flex mt-4">
                  <img
                    src={require("../image/icons/shopping-cart.png")}
                    class="webicon pt-0 mt-0"
                  />
                  <p class="fw-bold mx-2">Delivery</p>
                </div>


                
                  

                <div className="d-flex justify-content-start mt-2">
                  <input type="radio" id="insideDhaka" name="location" onChange={()=> setDeliveryCharge(deliveryChargeInfo.chargeInside)} value="inside"/>
                  &nbsp;<label for="insideDhaka">Inside {deliveryChargeInfo.city}- ৳{deliveryChargeInfo.chargeInside}</label>
                </div>
                
                <div className="d-flex justify-content-start mt-2">
                  <input type="radio" id="outsideDhaka" name="location" onChange={()=> setDeliveryCharge(deliveryChargeInfo.chargeOutside)} value="outside"/>
                  &nbsp;<label for="outsideDhaka">Outside {deliveryChargeInfo.city}- ৳{deliveryChargeInfo.chargeOutside}</label>
                </div>

                  
                
                
                
                <div class="mtop">
                  <hr />
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold">Grand Total</p>
                  <p class="text-warning">৳ {Number(total) + Number(deliveryCharge)}</p>
                </div>

                <button
                  class="btn btn-success w-100"
                  onClick={orderprod}
                  disabled={load ? true : false}
                >
                  {load ? "Loading" : "Order Now"}
                </button>
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
export default withRouter(Cart);
