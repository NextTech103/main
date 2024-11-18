import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import  customFetch  from "../../fetch-wrapper";
function OngoingOrder() {
  const [coun, setCoun] = useState(0);
  const [activeid, setActiveid] = useState("");
  const [accept, setAccept] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setOdetail] = useState([]);
  const [olist, setOlist] = useState([]);
  const [oitem, setOitem] = useState([]);
  const [allprod, setAllprod] = useState([]);
  
 

  useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      customFetch(`${process.env.REACT_APP_URL}orders?userId=${userInfo.id}&status=ne:delivered`, {
        method: "GET",
        headers: {
          "Content-Type":"Application/Json",
          "Authorization":localStorage.getItem("token"),
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
        setCoun(coun + 1);
      })
      .catch((err) => console.log(err));
  }
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
      

      <div class="conatiner my-4 py-3">
        <p class="fs-4 ">Running Order</p>

        <hr />
        <div class="ordereditem">
          {olist
            .map((item) => (
              <div class="conatiner my-3 px-3">
                <div class="row px-3 align-items-center pb-1">
                  <div class="col-lg-4">
                    <p class="fw-bold mb-0">
                      Order Number <span>#{item.id}</span>{" "}
                      <span class="px-3">{formatDate(item.createdAt)}</span>
                    </p>
                  </div>
                  <div class="col-lg-5 order-btn-h d-flex">
                    <button class="btn btn-orderstatus w-100 text-white">
                      {item.status == "pending"
                        ? "Oder Pending"
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
                  <div class="col-lg-3 text-end">
                    <p class="fw-bold mb-0">৳ {item.totalPrice}</p>
                  </div>
                </div>

                {item.orderItems.map((x) => (
                  <div class="container">
                      <div class="row orderedplist py-2">
                        <div class="col-lg-2">
                           <img class="order-img" src={`${process.env.REACT_APP_URL}${x.product.pimage}`}/>
                        </div>
                        <div class="col-lg-7 my-auto">
                          <p class="cart-pro-name m-0">{x.productName}</p>

                          <p class="text-warning m-0">৳ {x.price}</p>
                          <p class="m-0 orderquan">Quantity: {x.quantity}</p>
                        </div>

                        <div class="col-lg-3 text-end my-auto">
                          
                        </div>
                      </div>
                  </div>
                ))}

                <hr />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default OngoingOrder;
