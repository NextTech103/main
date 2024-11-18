import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Sidebar from "./sidebar";
import Bottomnav from "./bottomnav";
import { withRouter, Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function Categorym() {
  let history = useHistory();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const [product, setProduct] = useState([]);
  const [popular, setPopular] = useState([]);
  const [covers, setCovers] = useState([]);



  return (
    <>
      <Navbar />
      <Navbar2 />
      <ToastContainer />

      <div class="container-fluid mt-lg-3 mt-1">
        <div class="row">
          <div class="col-lg-12 mobc mx-0 px-1">
            <div class="row px-lg-5 px-0 pt-2 pb-lg-4 pb-2 mx-0">
              <div class="col-lg-12 col-12 my-lg-3 my-2">
                <Link to={"/category/1"} class="card cardcm navlinkc">
                  <div class="row py-lg-3 py-1">
                    <div class="col-lg-6 pb-lg-0 py-2 text-center">
                      <img
                        src={require("../image/icons/house-decoration.png")}
                        class="nav-logo-4"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div class="col-lg-6 text-center">
                      <h5 class="mb-lg-0 mb-2 navcname">Electronic Decoration</h5>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="col-lg-12 col-12 my-lg-3 my-2">
                <Link to={"/category/2"} class="card cardcm navlinkc">
                  <div class="row py-lg-3 py-1">
                    <div class="col-lg-4 pb-lg-0 py-2 text-center">
                      <img
                        src={require("../image/icons/microphone-black-shape.png")}
                        class="nav-logo-4"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div class="col-lg-8 text-center">
                      <h5 class="mb-lg-0 mb-2 navcname">Microphone</h5>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="col-lg-12 col-12 my-lg-3 my-2">
                <Link to={"/category/3"} class="card cardcm navlinkc">
                  <div class="row py-lg-3 py-1">
                    <div class="col-lg-4 pb-lg-0 py-2 text-center">
                      <img
                        src={require("../image/icons/earg.png")}
                        class="nav-logo-4"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div class="col-lg-8 text-center">
                      <h5 class="mb-lg-0 mb-2 navcname">Electronic Gadget</h5>
                    </div>
                  </div>
                </Link>
              </div>

              
            </div>
          </div>
        </div>
      </div>
      <div
        class="mx-0 px-0 catbottom"
        style={{ marginBottom: 40 }}
      ></div>
      <Bottomnav />
    </>
  );
}

export default Categorym;
