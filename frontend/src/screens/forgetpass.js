import { useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import Navbar2 from "./navbar2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./common/loader";
import Bottomnav from "./bottomnav";
import Navbar from "./navbar.js";
import Footer from "./footer.js";
import axios from 'axios'


function Forgetpass() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [activeTab, setActivetab] = useState("phone");
  const [vericode, setVericode] = useState("");
  const [cvericode, setCvericode] = useState("");

  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [load, setLoad] = useState(false);
  const [loading,setLoading] = useState(false)
  const [msg,setMsg] = useState(false)

  function sendOtp(msg) {
            
  }

  function submitHandle() {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}users/email-verify?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          setActivetab("verification")
          setMsg(res.message)
        } else{
          toast.dark(res.message, {
            icon: "📧",
          });
    
        }
      })
      .catch((err) => console.log(err));
  }

  function handleVerify() {
    setLoading(true);
    const postData = {
      "email":email,
      "otpCode": cvericode
    }
    fetch(`${process.env.REACT_APP_URL}users/otp-verify`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/Json",
      },
      body: JSON.stringify(postData)
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          localStorage.setItem("token", res.payload.token);
          localStorage.setItem("userInfo",JSON.stringify(res.payload.user));
          history.push("/account");
        } else{
          toast.dark(res.message, {
            icon: "📧",
          });
    
        }
      })
      .catch((err) => console.log(err));
  }

  function passHandle() {
    if (password != rpassword) {
      toast.dark("Password do not match", {
        icon: "⚠️",
      });
      return false;
    }

    const data = new FormData();
    data.append("password", password);
    data.append("phone", email);

    fetch("https://sowdaapp.com/sandweep/uppassOtp", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(res)
        if (res.message == null) {
          localStorage.setItem("token", res.token);
          history.push("/account");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
      </div>}
      <Loader load={load} />
      <Navbar />
      <Navbar2 />
      <Bottomnav />
      <ToastContainer />
      <div class="container-fluid my-5 ">
        <div class="row px-0 mx-0">
          <center class="my-lg-5 my-3">
            <div class="col-lg-4 col-12">
              <div class="card rounded-0 py-3">
                {activeTab == "phone" ? (
                  <div class="card-body px-lg-5 px-3">
                    <small class="text-muted">Enter your email</small>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        class="form-control log-f-border"
                        placeholder="Email"
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={submitHandle}
                      class="btn btn-success text-center w-100 fw-bold log-btn"
                    >
                      Next Step
                    </button>
                  </div>
                ) : null}

                {activeTab == "verification" ? (
                  <div class="card-body px-lg-5 px-3">
                    <p class="text-muted">
                      {msg}
                    </p>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setCvericode(e.target.value)}
                        type="text"
                        class="form-control log-f-border"
                        placeholder="Enter Otp"
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={handleVerify}
                      class="btn btn-success text-center w-100 fw-bold log-btn"
                    >
                      Verify
                    </button>
                  </div>
                ) : null}

                {activeTab == "cpass" ? (
                  <div class="card-body px-lg-5 px-3">
                    <p class="text-muted">পাসওয়ার্ড পরিবর্তন করুন </p>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="form-control log-f-border"
                        placeholder="নতুন পাসওয়ার্ড দিন"
                        aria-label="Your email"
                      />
                    </div>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setRpassword(e.target.value)}
                        type="password"
                        class="form-control log-f-border"
                        placeholder="পুনরায় লিখুন "
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={passHandle}
                      class="btn btn-success text-center w-100 fw-bold log-btn"
                    >
                      পরিবর্তন করুন
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Forgetpass);
