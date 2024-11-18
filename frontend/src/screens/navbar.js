import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import increment from "../actions";
import Loader from "./common/loader";

function Navbar() {
  const [log, setLog] = useState(false);
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const [product, setProduct] = useState([]);

  document.body.addEventListener("click", function (event) {
    setShow(false);
  });


  useEffect(()=> {
    if(!loading){
      searchProduct()
    }
  },[search])


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_URL}admin/token`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLog(res.success)
        if(!res.success){
          localStorage.removeItem("token");
        } else {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          setActive(userInfo.username)
        }
      })
    .catch((err) => console.log(err));
  },[])


  function searchProduct(){
    setTimeout(()=> {
      setLoading(true)
      fetch(`${process.env.REACT_APP_URL}products?productname=like:${search}`, {
        method: "GET",
        headers: {
          "Content-Type":"Application/Json",
          "Authorization":localStorage.getItem("token"),  // Correctly set the Content-Type
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          if(res.success){
            setProduct(res.payload.product)
          }
        })
      .catch((err) => console.log(err));
    },1000)
  }

  return (
    <>
      <Loader load={load} />
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top moboff">
        <div class="row container-fluid px-lg-5 px-2 justify-contain-between">
          <div class="col-lg-2 navbar-brand">
            <Link to={"/"}>
              <img
                src={require("../image/icons/logo.png")}
                class="navbar-logo-1"
                alt=""
                srcset=""
              />
            </Link>
          </div>
          <div class="col-lg-10 row">
            <div class="col-lg-8 my-auto  ">
              <div class="navbar-search rounded-pill bg-white">
                <div class="input-group" style={{ position: "relative" }}>
                  <span class="input-group-prepend ">
                    <div class="input-group-text home-search">
                      <i class="fa fa-search" style={{ color: "#ffa200" }}></i>
                    </div>
                  </span>
                  <input
                    class="form-control form-control-search py-2 home-search"
                    type="search"
                    placeholder="Search Here . . ."
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShow(true);
                    }}
                  />

                  {show ? (
                    <div class="sbox">
                      <div class="list-group">
                        {product
                          .map((item) => (
                            <Link
                              onClick={() => {
                                setShow(!show);
                              }}
                              to={"/product/" + item.id}
                              class="list-group-item list-group-item-action"
                            >
                              {item.productname}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div class="col-lg-2 text-end  ">
              <Link
                to={"/cart"}
                type="button"
                class="btn btn-white position-relative fa-solid fa-shopping-cart"
              >
                <span class="position-absolute top-100 start-100 translate-middle badge badge-cart bg-warning px-1 py-2">
                  <p class="">{counter}</p>
                  <span class="visually-hidden">unread messages</span>
                </span>
              </Link>
            </div>
            <div class="col-lg-2 text-end">
              {log ? (
                <Link to={"/account"}>
                  <button class="btn btn-white user-btn">
                    <div class="d-flex justify-content-between ">
                      <p class="navusername m-0 mx-3">
                        {active.indexOf(" ") > -1 ? active.substring(0, active.indexOf(" ")) : active}
                      </p>
                      <img
                        src={require("../image/icons/user.png")}
                        class="user-btn-logo"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button class="btn btn-white user-btn">
                    <div class="d-flex justify-content-between ">
                      <p class="navusername m-0 mx-3">Login</p>
                      <img
                        src={require("../image/icons/user.png")}
                        class="user-btn-logo"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
