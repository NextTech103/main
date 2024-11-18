import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Navbar from "./navbar.js";
import Navbar2 from "./navbar2.js";
import Bottomnav from "./bottomnav.js";
import Footer from "./footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'


function Reg() {
  let history = useHistory();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActivetab] = useState("reg");
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [vericode, setVericode] = useState("");
  const [cvericode, setCvericode] = useState("");


  const [loading,setLoading] = useState(false)

  function handleVerify() {
    if (fname === "") {
      toast.dark("Name is empty", {
        icon: "👤",
      });

      return false;
    }

    if (email === "") {
      toast.dark("Email is empty", {
        icon: "📧",
      });

      return false;
    }


    if (password === "") {
      toast.dark("Password is empty", {
        icon: "🔑",
      });

      return false;
    }
    
    setLoading(true)
    const payload = {
      "username":fname,
      "email":email,
      "password":password
    }
    fetch(`${process.env.REACT_APP_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type":"Application/Json",
      },
      body: JSON.stringify(payload)
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

 

  function submitHandle() {
    if (vericode != cvericode) {
      toast.dark("Invalid verification code", {
        icon: "⚠️",
      });
      return false;
    }
    const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("password", password);

    fetch("https://sowdaapp.com/sandweep/userpost", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        history.push("/account");
      })
      .catch((err) => console.log(err));
  }

  function mcheck(x) {
    console.log(x);
    const data = new FormData();
    data.append("email", x);

    fetch("https://sowdaapp.com/sandweep/mcheck", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setMsg(res.message);
      })
      .catch((err) => console.log(err));
  }

  function pcheck(x) {
    const data = new FormData();
    data.append("phone", x);

    fetch("https://sowdaapp.com/sandweep/pcheck", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => setMsg2(res.message))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Navbar2 />
      <Bottomnav />
      <div class="container my-lg-5 my-3 mb-5 log-w">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-12 mb-4 mb-lg-0">
            <div class="card pt-3 rounded-0">
              {activeTab == "reg" ? (
                <div class="row card-body px-5">
                  <p class="fs-5 fw-bold mb-lg-4 mb-2">
                    Create your account
                  </p>

                  <div class="col-lg-6 col-12">
                    
                    <div class="col-lg-12">
                      <label>
                        <small style={{ color: "#262626" }}>Full Name*</small>
                      </label>
                      <input
                        onChange={(e) => setFname(e.target.value)}
                        type="text"
                        class="form-control log-f-border"
                        placeholder="Your name"
                        aria-label="Your first name"
                      />
                    </div>
                    <div class="col-lg-12 my-3">
                      <small>{msg}</small>
                      <label>
                        <small style={{ color: "#262626" }}>Email</small>
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        class="form-control log-f-border"
                        placeholder="Your email"
                        aria-label="Your email"
                      />
                    </div>

                  </div>
                  <div class="col-lg-6 col-12">
                    <div class="col-lg-12 my-3">
                      <label>
                        <small style={{ color: "#262626" }}>Password*</small>
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        class="form-control log-f-border"
                        placeholder="Enter 6 digit password"
                        aria-label="Password"
                      />
                    </div>

                    <button
                      onClick={handleVerify}
                      class="btn btn-success text-center mt-3 w-100 fw-bold log-btn"
                    >
                      Register
                    </button>
                    <div class="my-1">
                      <small>
                        Your agree with the terms and conditions
                      </small>
                    </div>
                    
                    <div class="text-center my-3">
                      <Link to={"/login"} class=" f-c-acc">
                        ALready have an account ?
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab == "verification" ? (
                <div class="card-body row justify-content-center px-lg-5 px-3 pb-5">
                  <div class="col-lg-8">
                    <img
                      src={require("../image/icons/otp.png")}
                      class="navbar-logo-1 mb-3"
                      alt=""
                      srcset=""
                    />
                    <br />
                    <small class="text-muted">
                      আপনার মোবাইল নাম্বারে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে
                    </small>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setCvericode(e.target.value)}
                        type="text"
                        class="form-control log-f-border"
                        placeholder="* * * *"
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={submitHandle}
                      class="btn btn-success text-center w-100 fw-bold log-btn"
                    >
                      ভেরিফাই করুন
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reg;
