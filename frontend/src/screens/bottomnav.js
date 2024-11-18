import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import increment from "../actions";
import Loader from "./common/loader";


function Bottomnav() {
  // let history = useNavigate();

  const [show, setShow] = useState(false);
  // const isAndroidWebView = window.hasOwnProperty("Android");
  // const [coun, setCoun] = useState(0);

  var url = window.location.href;
  url = url.replace("https://sandwipmall.com/", "");


  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  // useEffect(() => {
  //   window.visualViewport.addEventListener("resize", (event) => {
  //     var key = document.getElementById("botnav");

  //     if (isAndroidWebView) {
  //       if (key.style.display === "block") {
  //         key.style.display = "none";
  //         setCoun(coun + 1);
  //       }

  //       // if(key.style.display === "none"){
  //       //   key.style.display = "block";
  //       //   return false;
  //       // }
  //     }
  //   });
  // }, [coun]);

  // window.addEventListener("click", (event) => {
  //   var key = document.getElementById("botnav");

  //   if (isAndroidWebView) {
  //     key.style.display = "block";
  //   }
  // });

  // window.addEventListener("unfocus", (event) => {
  //   var key = document.getElementById("botnav");

  //   if (isAndroidWebView) {
  //     key.style.display = "block";
  //   }
  // });

  return (
    <nav class="navbar navbar-bottom fixed-bottom justify-content-between pt-0 mt-0">
      <div class="row justify-content-between align-items-center">
        <div
          class={
            url == "/"
              ? "col-3 text-center pt-2 m-0"
              : "col-3 text-center pt-2 m-0"
          }
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img
              src={
                url == ""
                  ? require("../image/icons/homea.png")
                  : require("../image/icons/home.png")
              }
              class="navbicon"
            />

            <p class="m-0 p-0" style={{ fontSize: 10, color: "#565656" }}>
              Home
            </p>
          </Link>
        </div>

        <div
          class={
            url == "categorym"
              ? "col-3 text-center pt-2 m-0"
              : "col-3 text-center pt-2 m-0"
          }
        >
          <Link to={"/categorym"} style={{ textDecoration: "none" }}>
            <img
              src={
                url == "categorym"
                  ? require("../image/icons/catea.png")
                  : require("../image/icons/cate.png")
              }
              class="navbicon"
            />

            <p class="m-0 p-0" style={{ fontSize: 10, color: "#565656" }}>
              Category
            </p>
          </Link>
        </div>

        <div
          style={{position:'relative'}}
          class={
            url == "cart"
              ? "col-3 text-center pt-2 m-0"
              : "col-3 text-center pt-2 m-0"
          }
        >
          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <img
              src={
                url == "cart"
                  ? require("../image/icons/carta.png")
                  : require("../image/icons/cart.png")
              }
              class="navbicon"
            />


                <span class="badge badge-cart bg-warning px-1 py-2" style={{position:'absolute',top:5,right:30}}>
                  <span class="">{counter}</span>
                  <span class="visually-hidden">unread messages</span>
                </span>

            <p class="m-0 p-0" style={{ fontSize: 10, color: "#565656" }}>
              Bag 
            </p>
          </Link>
        </div>

        <div
          class={
            url == "account"
              ? "col-3 text-center pt-2 m-0"
              : "col-3 text-center pt-2 m-0"
          }
        >
          <Link to={localStorage.getItem("token") == null ? "/login" : "/account"} style={{ textDecoration: "none" }}>
            <img
              src={
                url == "account"
                  ? require("../image/icons/acca.png")
                  : require("../image/icons/acc.png")
              }
              class="navbicon"
            />

            <p class="m-0 p-0" style={{ fontSize: 10, color: "#565656" }}>
              Account
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Bottomnav;
