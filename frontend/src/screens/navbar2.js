import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import increment from "../actions";

function Navbar2() {
  const [log, setLog] = useState(false);
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const [product, setProduct] = useState([]);



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
        }
      })
    .catch((err) => console.log(err));
  },[])

  

  document.body.addEventListener("click", function (event) {
    setShow(false);
  });

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top mobc">
      <div class="container-fluid row px-lg-5 px-0 mx-0">
        <div class="col-lg-6 col-6">
          <Link to={"/"}>
            <img
              src={require("../image/icons/logo.png")}
              class="navbar-logo-1"
              alt=""
              srcset=""
            />
          </Link>
        </div>
        <div class="col-lg-6 col-6 text-end px-0">
          {log ? (
            <Link to={"/account"}>
              <button class="btn btn-white user-btn mx-0">
                <div class="d-flex justify-content-between ">
                  <p class="navusername fw-bold m-0 mx-3">
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
              <button class="btn btn-white user-btn mx-0">
                <div class="d-flex justify-content-between ">
                  <p class="navusername m-0 mx-3">লগ-ইন</p>
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
    </nav>
  );
}

export default Navbar2;
