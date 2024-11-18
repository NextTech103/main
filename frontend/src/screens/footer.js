import logo from "../image/icons/logo.png";
import facebook from "../image/icons/facebook.png";
import youtube from "../image/icons/youtube.png";
import instagram from "../image/icons/instagram.png";
import store from "../image/icons/storeicon.png";
import { withRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Footer() {
  const [category, setCategory] = useState([]);
  const [brandList, setBrandList] = useState([]);


  return (
    <>
      <div class="container-fluid px-5 footer moboff">
        <div class="row py-5 mx-5">
          <div class="col-lg-3 text-white">
            <h5>About Us</h5>
            <small class="mb-0">Mayeda Mart Online Market</small>
            <br></br>
            <small style={{ fontSize: 14 }}>Dhaka</small>

            <div class=" mt-3">
              <a href="https://www.facebook.com/accessoriesbazar.433?mibextid=ZbWKwL">
                <img src={facebook} class="footicon"/>
              </a>
              {/* <a href="">
                <img src={youtube} class="footicon" />
              </a>
              <a href="">
                <img src={instagram} class="footicon" />
              </a> */}
            </div>
          </div>
          <div class="col-lg-3 rounded-0 border-0 text-center d-none">
            <h5 class="text-white">Category</h5>
            {category.map((cate) => (
              <p class="mb-0">
                <Link
                  className="navlinkc"
                  to={"/category/" + cate.cname + "/all"}
                  style={{ color: "#ffffff", fontSize: 14 }}
                >
                  {cate.cname}
                </Link>
              </p>
            ))}
          </div>
          <div class="col-lg-3 rounded-0 border-0 text-center ">
            <h5 class="text-white">Legal Policy</h5>
            <div style={{ fontSize: 14 }}>
              <Link
                to={"/privacy_policy"}
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p class="mx-2 mb-1 navlinkc">Terms And Condition</p>
              </Link>
              <Link
                to={"/return"}
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p class="mx-2 mb-1 navlinkc">Return Policy</p>
              </Link>
              <Link
                to={"/privacy_policy"}
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p class="mx-2 mb-1 navlinkc">Privacy Policy</p>
              </Link>
            </div>
          </div>

          <div class="col-lg-3 rounded-0 border-0 text-center ">
            <h5 class="text-white">Download App</h5>
            <p class="text-white">Coming Soon</p>
            <img src={store} class="storeicon" />
          </div>
        </div>
        <div class="container-fluid footer text-center pb-2">
          <div class="col-lg-12 text-white" style={{ fontSize: 12 }}>
            <p class="mb-0">
              © Access Bazar Online Market, All Rights Reserved
            </p>
            {/* <p class="">
              Developed by
              <a
                href="https://mpairtech.com"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                {" "}
                mPair Technologies Ltd.
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
