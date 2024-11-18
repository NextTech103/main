import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bottomnav from "./bottomnav";
import PersonalInfo from "./account/info";
import DeliveryInfo from "./account/delivery";
import OngoingOrder from "./account/Onorder";
import Order from "./account/Order";

function Account() {
  const [log, setLog] = useState(false);
  const [active, setActive] = useState("");

  return (
    <>
      <Navbar />
      <Navbar2 />
      <ToastContainer />

      <div class="container-fluid moboff bg-white">
        <div class="row">
          <div class="col-lg-3 profileleft">
            <div class="container manage-pro-margine">
              <ul
                class="nav  flex-column manage-ul-margine"
                id="myTab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <p class="manage-pro-text">Profile</p>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active profile-text-color"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Personal Information
                  </a>
                </li>
                
                <li class="nav-item mt-4" role="presentation">
                  <p class="manage-pro-text">Your Order</p>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link profile-text-color"
                    id="ongoing-tab"
                    data-bs-toggle="tab"
                    href="#ongoing"
                    role="tab"
                    aria-controls="ongoing"
                    aria-selected="false"
                  >
                    Running Order
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link profile-text-color"
                    id="order-history-tab"
                    data-bs-toggle="tab"
                    href="#order-history"
                    role="tab"
                    aria-controls="order-history"
                    aria-selected="false"
                  >
                    Previous Order
                  </a>
                </li>

                
                
                <li class="nav-item mt-4" role="presentation">
                  <Link
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                    to={"/"}
                    style={{
                      textDecoration: "none",
                      color: "#565656",
                      cursor: "pointer",
                    }}
                    class="nav-link profile-text-color"
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-12 border-start profileright">
            <div
              style={{ overflow: "auto", height: "90vh" }}
              class="container-fluid bg-white profileitem-main position-relative"
            >
              <div class="tab-content " id="myTabContent">
                <div
                  class="tab-pane show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <PersonalInfo />
                </div>
                <div
                  class="tab-pane fade show"
                  id="ongoing"
                  role="tabpanel"
                  aria-labelledby="ongoing-tab"
                >
                  <OngoingOrder />
                </div>
                <div
                  class="tab-pane show"
                  id="order-history"
                  role="tabpanel"
                  aria-labelledby="order-history-tab"
                >
                  <Order />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mobc profilemob">
        <div class="row">

          <div class="col-12 p-3 pt-1">
            <div class="bg-light mb-3">
              <div class="d-flex flex-row border-bottom p-2 align-items-center">
                <img
                  src={require("../image/icons/user-profile.png")}
                  class="webicon pt-0 mt-0"
                />
                <p class="mb-0 mx-2">Profile</p>
              </div>

              <div
                class="d-flex flex-row p-2 py-3 bg-white justify-content-between"
                style={{ borderBottom: "1px dashed #ddd" }}
              >
                <h5 class="mb-0">Personal Information</h5>
                <Link to={"/userinfo"}>
                  <i class="fa-sharp fa-solid fa-arrow-right text-secondary"></i>
                </Link>
              </div>

              
            </div>

            <div class="bg-light mb-3">
              <div class="d-flex flex-row border-bottom p-2 align-items-center">
                <img
                  src={require("../image/icons/orders.png")}
                  class="webicon pt-0 mt-0"
                />
                <p class="mb-0 mx-2">Your Order</p>
              </div>
              <div
                class="d-flex flex-row p-2 py-3 bg-white justify-content-between"
                style={{ borderBottom: "1px dashed #ddd" }}
              >
                <h5 class="mb-0">Running Order</h5>
                <Link to={"/ongoingorder"}>
                  <i class="fa-sharp fa-solid fa-arrow-right text-secondary"></i>
                </Link>
              </div>

              <div class="d-flex flex-row p-2 py-3 bg-white justify-content-between">
                <h5 class="mb-0">Previous Order</h5>
                <Link to={"/order"}>
                  <i class="fa-sharp fa-solid fa-arrow-right text-secondary"></i>
                </Link>
              </div>
            </div>

            <div class="bg-light mb-3">
              <div class="d-flex flex-row border-bottom p-2 align-items-center">
                <img
                  src={require("../image/icons/conversation.png")}
                  class="webicon pt-0 mt-0"
                />
                <p class="mb-0 mx-2">FAQ</p>
              </div>
              <div
                class="d-flex flex-row p-2 py-3 bg-white justify-content-between"
                style={{ borderBottom: "1px dashed #ddd" }}
              >
                <h5 class="mb-0">Return Policy</h5>
                <Link to={"/return"}>
                  <i class="fa-sharp fa-solid fa-arrow-right text-secondary"></i>
                </Link>
              </div>

              <div class="d-flex flex-row p-2 py-3 bg-white justify-content-between">
                <h5 class="mb-0">Live Chat</h5>
                <i class="fa-sharp fa-solid fa-arrow-right text-secondary"></i>
              </div>
            </div>

            <Link
              onClick={() => {
                localStorage.removeItem("token");
              }}
              to={"/"}
              class="d-flex flex-row p-2 px-0 align-items-center"
              style={{
                textDecoration: "none",
                color: "#565656",
                cursor: "pointer",
              }}
            >
              <img
                src={require("../image/icons/logout.png")}
                class="webiconsm pt-0 mt-0"
              />
              <p class="mb-0 mx-2" style={{ cursor: "pointer" }}>
                Log Out
              </p>
            </Link>

            
          </div>
        </div>
        <div class="mx-0 px-0 accbottom"></div>
      </div>

      <Bottomnav />
    </>
  );
}

export default withRouter(Account);
