import { useEffect, useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bottomnav from "../bottomnav";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";

function DeliveryInfo() {
  let history = useHistory();
  const [phone, setPhone] = useState("");
  const [coun, setCoun] = useState(0);
  const [aid, setAid] = useState("");
  const [dlist, setDlist] = useState([]);
  const [hname, setHname] = useState("");
  const [sname, setSname] = useState("");
  const [aname, setAname] = useState("");
  const [street, setStreet] = useState("");
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const data = new FormData();
      data.append("token", localStorage.getItem("token"));
      fetch("https://sowdaapp.com/sandweep/dlist", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setDlist(res.message);
        })
        .catch((err) => console.log(err));
    }
  }, [coun]);

  function clearField() {
    setName("");
    setPhone("");
    setSname("");
    setHname("");
    setAname("");
    setStreet("");
  }
  function sdelivery(x) {
    setAid(x);

    const data = new FormData();
    data.append("id", x);
    fetch("https://sowdaapp.com/sandweep/sdlist", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.message[0].name);
        setPhone(res.message[0].phone);
        setLabel(res.message[0].label);
        setHname(res.message[0].hname);
        setSname(res.message[0].sname);
        setAname(res.message[0].aname);
        setStreet(res.message[0].street);
      })
      .catch((err) => console.log(err));
  }

  function delivery() {
    const data = new FormData();
    data.append("name", name);
    data.append("phone", phone);
    data.append("label", label);
    data.append("hname", hname);
    data.append("sname", sname);
    data.append("aname", aname);
    data.append("street", street);
    data.append("token", localStorage.getItem("token"));

    fetch("https://sowdaapp.com/sandweep/deliverypost", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setCoun(coun + 1);
        toast.success("ঠিকানা যোগ করা হয়েছে", {
          icon: "🛵",
        });
      })
      .catch((err) => console.log(err));
  }

  function delivery2() {
    const data = new FormData();
    data.append("name", name);
    data.append("phone", phone);
    data.append("label", label);
    data.append("hname", hname);
    data.append("sname", sname);
    data.append("aname", aname);
    data.append("street", street);
    data.append("id", aid);

    fetch("https://sowdaapp.com/sandweep/deliveryedit", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setCoun(coun + 1);
        toast.success("ডেলিভারি ঠিকানা পরিবর্তন করা হয়েছে", {
          icon: "🛵",
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <Navbar2 />
      <div
        class="modal fade  animate__animated animate__slideInUp"
        id="add-address"
        tabindex="-1"
        aria-labelledby="add-addressLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog addcartModal2">
          <div class="modal-content addcartModalC2">
            <div class="modal-body">
              <div class="conatiner my-2 px-3">
                <p class="fs-5 pb-2">ডেলিভারি ঠিকানা</p>

                <div class="g-3">
                  <div class="row mt-2">
                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputfullname"
                        class="form-label fs-6 text-muted"
                      >
                        নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputnumber"
                        class="form-label fs-6 text-muted"
                      >
                        মোবাইল নাম্বার
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="inputnumber"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputhousename"
                        class="form-label fs-6 text-muted"
                      >
                        বাড়ি / বিল্ডিং এর নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setHname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputStreetnumber"
                        class="form-label fs-6 text-muted"
                      >
                        রাস্তার নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setSname(e.target.value)}
                      />
                    </div>

                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputAreaname"
                        class="form-label fs-6 text-muted"
                      >
                        এলাকার নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setAname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-12 mt-2">
                      <label
                        for="inputStatename"
                        class="form-label fs-6 text-muted"
                      >
                        ইউনিয়ন
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => setStreet(e.target.value)}
                      >
                        <option selected>নির্বাচন করুন</option>
                        <option>Azimpur</option>
                        <option>Amanullah</option>
                        <option>Bauria</option>
                        <option>Gachua</option>
                        <option>Harispur</option>
                        <option>Haramia</option>
                        <option>Kalapania</option>
                        <option>Magdhara</option>
                        <option>Maitbhanga</option>
                        <option>Musapur</option>
                        <option>Rahmatpur</option>
                        <option>Santoshpur</option>
                        <option>Sarikait</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <label
                      for="inputAreaname"
                      class="form-label fs-6 text-muted"
                    >
                      ডেলিভারি লেভেল
                    </label>
                    <div class="col-lg-6 col-6">
                      <button
                        onClick={(e) => setLabel("Home")}
                        class="btn btn-light home-office-btn w-100"
                      >
                        বাড়ি
                      </button>
                    </div>
                    <div class="col-lg-6 col-6">
                      <button
                        onClick={(e) => setLabel("Office")}
                        class="btn btn-light home-office-btn w-100"
                      >
                        কর্মস্থল
                      </button>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-lg-6 col-6">
                      <button
                        onClick={delivery}
                        class="btn add-address-btn-modal-save w-100"
                        data-bs-dismiss="modal"
                      >
                        ঠিকানা যোগ করুন
                      </button>
                    </div>
                    <div class="col-lg-6 col-6">
                      <button
                        class="btn add-address-btn-modal-cancel w-100"
                        data-bs-dismiss="modal"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade animate__animated animate__slideInUp"
        id="edit-address"
        tabindex="-1"
        aria-labelledby="add-addressLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog addcartModal2">
          <div class="modal-content addcartModalC2">
            <div class="modal-body">
              <div class="conatiner my-2 px-3">
                <p class="fs-5 pb-2">ডেলিভারি ঠিকানা</p>

                <div class="g-3">
                  <div class="row mt-2">
                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputfullname"
                        class="form-label fs-6 text-muted"
                      >
                        নাম
                      </label>
                      <input
                        value={name}
                        type="text"
                        class="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputnumber"
                        class="form-label fs-6 text-muted"
                      >
                        মোবাইল নাম্বার
                      </label>
                      <input
                        value={phone}
                        type="number"
                        class="form-control"
                        id="inputnumber"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputhousename"
                        class="form-label fs-6 text-muted"
                      >
                        বাড়ি / বিল্ডিং এর নাম
                      </label>
                      <input
                        value={hname}
                        type="text"
                        class="form-control"
                        onChange={(e) => setHname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputStreetnumber"
                        class="form-label fs-6 text-muted"
                      >
                        রাস্তার নাম
                      </label>
                      <input
                        value={sname}
                        type="text"
                        class="form-control"
                        onChange={(e) => setSname(e.target.value)}
                      />
                    </div>

                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputAreaname"
                        class="form-label fs-6 text-muted"
                      >
                        এলাকার নাম
                      </label>
                      <input
                        value={aname}
                        type="text"
                        class="form-control"
                        onChange={(e) => setAname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 col-12 mt-2">
                      <label
                        for="inputStatename"
                        class="form-label fs-6 text-muted"
                      >
                        ইউনিয়ন
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => setStreet(e.target.value)}
                      >
                        <option selected>{street}</option>
                        <option>Azimpur</option>
                        <option>Amanullah</option>
                        <option>Bauria</option>
                        <option>Gachua</option>
                        <option>Harispur</option>
                        <option>Haramia</option>
                        <option>Kalapania</option>
                        <option>Magdhara</option>
                        <option>Maitbhanga</option>
                        <option>Musapur</option>
                        <option>Rahmatpur</option>
                        <option>Santoshpur</option>
                        <option>Sarikait</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <label
                      for="inputAreaname"
                      class="form-label fs-6 text-muted"
                    >
                      ডেলিভারি লেভেল
                    </label>
                    <div class="col-lg-6 col-6">
                      <button
                        onClick={(e) => setLabel("Home")}
                        class={
                          label == "Home"
                            ? "btn btn-warning home-office-btn w-100"
                            : "btn btn-light home-office-btn w-100"
                        }
                      >
                        বাড়ি
                      </button>
                    </div>
                    <div class="col-lg-6 col-6">
                      <button
                        onClick={(e) => setLabel("Office")}
                        class={
                          label == "Office"
                            ? "btn btn-warning home-office-btn w-100"
                            : "btn btn-light home-office-btn w-100"
                        }
                      >
                        কর্মস্থল
                      </button>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-6">
                      <button
                        onClick={delivery2}
                        class="btn add-address-btn-modal-save w-100"
                        data-bs-dismiss="modal"
                      >
                        পরিবর্তন করুন
                      </button>
                    </div>
                    <div class="col-6">
                      <button
                        class="btn add-address-btn-modal-cancel w-100"
                        data-bs-dismiss="modal"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row mx-0 my-2 pb-3 border bg-light">
          <p class="fs-5 py-1 border-bottom">ডেলিভারি ঠিকানা</p>
          <div class="col-lg-12">
            <div class="text-center">
              {dlist.length == 0 ? <p>কোন ঠিকানা যোগ করা হয়নি!</p> : null}

              {dlist.length == 2 ? null : (
                <a href="#">
                  <button
                    onClick={clearField}
                    class="btn btn-edit-address py-2 w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#add-address"
                  >
                    ঠিকানা যোগ করুন
                  </button>
                </a>
              )}
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3">
            {dlist.map((item) => (
              <div class="col-12 p-2 card bg-light">
                <div class="d-flex justify-content-between">
                  <span>
                    <p class="mb-1">
                      <b>{item.name}</b>
                    </p>
                    <p class="mb-1">{item.phone}</p>
                  </span>

                  <button
                    onClick={() => sdelivery(item.id)}
                    class="editbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-address"
                  >
                    Edit
                  </button>
                </div>
                <div class="d-flex rounded shadow-sm bg-white align-items-center py-1">
                  <div class="px-2">
                    <p class="fw-bold mb-0" style={{ color: "#ffa200" }}>
                      {item.label}
                    </p>
                    <p class="m-0">
                      <small>
                        {item.hname}, {item.sname}, {item.aname}, {item.street}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Bottomnav />
    </>
  );
}

export default DeliveryInfo;
