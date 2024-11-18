import { useEffect, useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bottomnav from "../bottomnav";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import  customFetch  from "../../fetch-wrapper";

function PersonalInfo() {
  let history = useHistory();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [allprod, setAllprod] = useState([]);
  const [coun, setCoun] = useState(0);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    customFetch(`${process.env.REACT_APP_URL}users/${userInfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type":"Application/Json",
        "Authorization":localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setFname(res.payload.user.username)
          setEmail(res.payload.user.email)

        }
      })
      .catch((err) => console.log(err));
  }, [coun]);

  

  return (
    <>
      <Navbar />
      <Navbar2 />
      <div class="container-fluid">
        {/* <div class="d-flex">
          <i
            onClick={() => history.goBack()}
            class="fa fa-arrow-left m-2"
            style={{ cursor: "pointer" }}
          ></i>
          <p class="fs-5 pb-3">ব্যক্তিগত তথ্য</p>
        </div> */}

        <div class="row mx-0 my-2 pb-3 border bg-light">
          <p class="fs-5 py-1 border-bottom">Personal Information</p>
          <div class="col-lg-8">
            <form class="px-2">
              <div class="col-lg-12 mb-3">
                <p for="inputfullname" class="form-label pb-2">
                  Name
                </p>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  class="form-control form-control-input"
                  id="inputfullname"
                  readOnly={edit}
                />
              </div>

              <div class="col-lg-12 mb-3">
                <p for="inputEmail4" class="form-label pb-2">
                  Email
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-control form-control-input"
                  id="inputEmail4"
                  readOnly="false"
                />
              </div>
            </form>
          </div>
          {/* <div class="col-lg-8 my-4 mb-2 px-0">
            <a
              onClick={() => {
                setEdit(!edit);
                UpdateProfile();
              }}
              type="submit"
              class="btn btn-edit-profile fs-6"
            >
              <i class="fa-solid fa-user-pen mx-2"></i>
              তথ্য পরিবর্তন করুন
            </a>
          </div>

          <div class="col-lg-8 px-0">
            <a type="submit" class="btn btn-edit-profile fs-6">
              <i class="fa-solid fa-key mx-2"></i>
              পাসওয়ার্ড পরিবর্তন
            </a>
          </div> */}
        </div>
      </div>

      <Bottomnav />
    </>
  );
}

export default PersonalInfo;
