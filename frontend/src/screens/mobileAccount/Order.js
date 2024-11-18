import { useEffect, useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import Bottomnav from "../bottomnav";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import  customFetch  from "../../fetch-wrapper";
function Order() {
  let history = useHistory();
  const [coun, setCoun] = useState(0);
  const [activeid, setActiveid] = useState("");
  const [accept, setAccept] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setOdetail] = useState([]);
  const [olist, setOlist] = useState([]);
  const [oitem, setOitem] = useState([]);
  const [dlist, setDlist] = useState([]);
  const [allprod, setAllprod] = useState([]);

  function formatDate(date) {
    var date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    customFetch(`${process.env.REACT_APP_URL}orders?userId=${userInfo.id}&status=delivered`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token")
      }
    
    })
      .then((res) => res.json())
      .then((res) => {
         if(res.success){
          setOlist(res.payload.order)
         }
      })
      .catch((err) => console.log(err));
}, [coun]);

  function receiveIt() {
    setAccept("");
    const data = new FormData();
    data.append("id", activeid);
    fetch("https://sowdaapp.com/sandweep/receiveIt", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setCoun(coun + 1);
      })
      .catch((err) => console.log(err));
  }

  function formatDate2(date) {
    var date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      ", " +
      strTime
    );
  }

  return (
    <>
      <Navbar />
      <Navbar2 />
      

      <div class="container-fluid">
        <div class="row mx-0 my-2 pb-3 border bg-light">
          <p class="fs-5 py-1 border-bottom">Previous Oder</p>

          {olist
            .map((item) => (
              <div class="conatiner">
                <div class="row px-0">
                  <div class="col-lg-4 col-9">
                    <p class="fw-bold">
                      Order Number <span>#{item.id}</span>{" "}
                      <span class="px-3">{formatDate(item.createdAt)}</span>
                    </p>
                  </div>
                  <div class="col-lg-5 col-3 text-end">
                    <p class="fw-bold mb-0">৳ {item.totalPrice}</p>
                  </div>
                  <div class="col-lg-3 order-btn-h d-flex">
                    <button class="btn btn-orderstatus w-75 text-white">
                    {item.status == "pending"
                        ? "Order pending"
                        : item.status == "accepted"
                        ? "Confirmed"
                        : item.status == "delivered"
                        ? "Delivered"
                        : item.status == "cancelled"
                        ? "Cancelled"
                        : null}
                    </button>
                    <div style={{ width: 10 }}></div>
                    
                  </div>
                </div>

                {item.orderItems.map((x) => (
                  <div class="container-fluid mt-2 px-2">
                
                      <div class="row orderedplist py-2">
                        <div class="col-lg-2 col-4">
                        <img
                          src={`${process.env.REACT_APP_URL}${x.product.pimage}`}
                          class="order-img"
                          alt=""
                          srcset=""
                        />
                        </div>
                        <div class="col-lg-7 col-8">
                          <p class="cart-pro-name2 m-0">{x.productName}</p>

                          <p class="text-warning m-0">৳ {x.price}</p>
                          <p class="m-0 cart-pro-name2">Quantity {x.quantity}</p>
                        </div>

                        <div class="col-lg-3 col-12 text-end my-auto"></div>
                      </div>
                   
                  </div>
                ))}

                <hr />
              </div>
            ))}
        </div>
      </div>

      <Bottomnav />
    </>
  );
}

export default Order;
