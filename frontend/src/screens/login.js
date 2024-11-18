import { useState, useEffect } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar.js";
import Navbar2 from "./navbar2.js";
import Bottomnav from "./bottomnav.js";
import Footer from "./footer.js";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(()=> {
    window.scroll(0,0)
  })
 
  function submitHandle() {
    if (email == "") {
      toast.dark("Phone is empty", {
        icon: "📧",
      });

      return false;
    }

    if (password == "") {
      toast.dark("Password is empty", {
        icon: "🔑",
      });

      return false;
    }

    const payload= {
      "email": email,
      "password": password
    }

    fetch(`${process.env.REACT_APP_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/Json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem("token", res.payload.token);
          localStorage.setItem("userInfo",JSON.stringify(res.payload.user));
          history.push("/account");
        } else {
          toast.dark("Invalid Mobile or password", {
            icon: "⚠️",
          });
          return false;
        }
      })
      .catch((err) => {
        toast.dark("Invalid Mobile or password", {
          icon: "⚠️",
        });
      });
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Navbar2 />
      <Bottomnav />

      <div class="container-fluid ">
        <div class="row px-0 mx-0">
          <center class="my-lg-5 my-3">
            <div class="col-lg-4 col-12">
              <div class="card pt-2 rounded-0">
                <div class="card-body px-lg-5 px-3">
                  <p class="fs-5 m-0">Welcome!</p>
                  
                  <small class="text-muted">
                    Login Or Create new account
                  </small>

                  <div class="col-lg-12 my-2">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      class="form-control log-f-border"
                      placeholder="Email"
                      aria-label="Your email"
                    />
                  </div>
                  <div class="col-lg-12">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      class="form-control log-f-border"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>
                  <div class="text-end my-3">
                    <Link to={"/forgetpass"} class="text-warning f-c-acc">
                      Forgot Password ?
                    </Link>
                  </div>
                  <button
                    onClick={submitHandle}
                    class="btn btn-success text-center w-100 fw-bold log-btn"
                  >
                    Login
                  </button>

                  <br />

                  <div class="my-3">
                    {/* <FacebookLogin
                      appId="453619176758970"
                      size="small"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                    /> */}
                  </div>

                  <div class="text-center my-3">
                    <Link to={"/reg/"} class="text-dark f-c-acc">
                      Create New Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Login);
