import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  customFetch  from "../../fetch-wrapper";


function PersonalInfo() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [allprod, setAllprod] = useState([]);
  const [coun, setCoun] = useState(0);
  const [edit, setEdit] = useState(true);
  const [opassword, setOpassword] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [fb, setFb] = useState("");

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
      <div
        class="modal fade"
        id="passChange"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content" style={{ borderRadius: 0 }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                পাসওয়ার্ড পরিবর্তন
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="col-lg-12 my-2">
                <input
                  onChange={(e) => setOpassword(e.target.value)}
                  type="password"
                  class="form-control log-f-border"
                  placeholder="পূর্বের পাসওয়ার্ড লিখুন"
                  aria-label="Your email"
                />
              </div>

              <div class="col-lg-12 my-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control log-f-border"
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  aria-label="Your email"
                />
              </div>

              <div class="col-lg-12 my-2">
                <input
                  onChange={(e) => setRpassword(e.target.value)}
                  type="password"
                  class="form-control log-f-border"
                  placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                  aria-label="Your email"
                />
              </div>

              
            </div>
          </div>
        </div>
      </div>
      <div class="conatiner my-4 py-3">
        <p class="fs-4 pb-3">Personal Information</p>
        <div class="row">
          <div class="col-lg-8 px-4">
            <form class="row g-3">
              <div class="col-lg-12">
                <label for="inputfullname" class="form-label text-muted pb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  class="form-control form-control-input"
                  id="inputfullname"
                  readOnly={edit}
                />
              </div>

              <div class="col-lg-12">
                <label for="inputEmail4" class="form-label text-muted pb-2">
                  Email
                </label>
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
          

        
        
          {/* <div class="col-lg-8 mt-4">
              <button
                data-bs-toggle="modal"
                data-bs-target="#passChange"
                type="submit"
                class="btn btn-edit-pass w-50 fs-6 fw-bold "
              >
                পাসওয়ার্ড পরিবর্তন
              </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;
