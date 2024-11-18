import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeliveryInfo() {
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
        toast.success("Delivery address added !", {
          icon: "🚚",
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
        toast.success("Delivery address updated !", {
          icon: "🚚",
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div
        class="modal fade animate__animated animate__zoomIn"
        id="add-address"
        tabindex="-1"
        aria-labelledby="add-addressLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <div class="conatiner my-2 px-3">
                <p class="fs-4 pb-3">ডেলিভারি ঠিকানা</p>

                <div class=" g-3">
                  <div class="row mt-2">
                    <div class="col-lg-6 mt-2">
                      <label for="inputfullname" class="form-label text-muted">
                        নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 mt-2">
                      <label for="inputnumber" class="form-label text-muted">
                        মোবাইল নাম্বার
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="inputnumber"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-lg-6">
                      <label for="inputhousename" class="form-label text-muted">
                        বাড়ি / বিল্ডিং এর নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setHname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6">
                      <label
                        for="inputStreetnumber"
                        class="form-label text-muted"
                      >
                        রাস্তার নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setSname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-lg-6">
                      <label for="inputAreaname" class="form-label text-muted">
                        এলাকার নাম
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setAname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6">
                      <label for="inputStatename" class="form-label text-muted">
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
                    <label for="inputAreaname" class="form-label text-muted">
                      ডেলিভারি লেভেল
                    </label>
                    <div class="col-lg-3">
                      <button
                        onClick={(e) => setLabel("Home")}
                        class="btn btn-light home-office-btn w-75"
                      >
                        বাড়ি
                      </button>
                    </div>
                    <div class="col-lg-3 ">
                      <button
                        onClick={(e) => setLabel("Office")}
                        class="btn btn-light home-office-btn w-75"
                      >
                        কর্মস্থল
                      </button>
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-lg-6"></div>
                    <div class="col-lg-6 text-end">
                      <button
                        onClick={delivery}
                        class="btn add-address-btn-modal-save"
                        data-bs-dismiss="modal"
                      >
                        ঠিকানা যোগ করুন
                      </button>
                      <button
                        class="btn  mx-3 add-address-btn-modal-cancel"
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
        class="modal fade animate__animated animate__zoomIn"
        id="edit-address"
        tabindex="-1"
        aria-labelledby="add-addressLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <div class="conatiner my-2 px-3">
                <p class="fs-4 pb-3">ডেলিভারি ঠিকানা</p>

                <div class=" g-3">
                  <div class="row mt-2">
                    <div class="col-lg-6 mt-2">
                      <label for="inputfullname" class="form-label text-muted">
                        নাম
                      </label>
                      <input
                        value={name}
                        type="text"
                        class="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 mt-2">
                      <label for="inputnumber" class="form-label text-muted">
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
                  </div>
                  <div class="row mt-2">
                    <div class="col-lg-6">
                      <label for="inputhousename" class="form-label text-muted">
                        বাড়ি / বিল্ডিং এর নাম
                      </label>
                      <input
                        value={hname}
                        type="text"
                        class="form-control"
                        onChange={(e) => setHname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6">
                      <label
                        for="inputStreetnumber"
                        class="form-label text-muted"
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
                  </div>
                  <div class="row mt-2">
                    <div class="col-lg-6">
                      <label for="inputAreaname" class="form-label text-muted">
                        এলাকার নাম
                      </label>
                      <input
                        value={aname}
                        type="text"
                        class="form-control"
                        onChange={(e) => setAname(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6">
                      <label for="inputStatename" class="form-label text-muted">
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
                    <label for="inputAreaname" class="form-label text-muted">
                      ডেলিভারি লেভেল
                    </label>
                    <div class="col-lg-3">
                      <button
                        onClick={(e) => setLabel("Home")}
                        class={
                          label == "Home"
                            ? "btn btn-warning home-office-btn w-75"
                            : "btn btn-light home-office-btn w-75"
                        }
                      >
                        বাড়ি
                      </button>
                    </div>
                    <div class="col-lg-3 ">
                      <button
                        onClick={(e) => setLabel("Office")}
                        class={
                          label == "Office"
                            ? "btn btn-warning home-office-btn w-75"
                            : "btn btn-light home-office-btn w-75"
                        }
                      >
                        কর্মস্থল
                      </button>
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-lg-6"></div>
                    <div class="col-lg-6 text-end">
                      <button
                        onClick={delivery2}
                        class="btn add-address-btn-modal-save"
                        data-bs-dismiss="modal"
                      >
                        পরিবর্তন করুন
                      </button>
                      <button
                        class="btn  mx-3 add-address-btn-modal-cancel"
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

      <div class="conatiner my-4 py-3">
        <div class="row">
          <div class="col-lg-6">
            <p class="fs-4 pb-3">ডেলিভারি ঠিকানা</p>
          </div>
          <div class="col-lg-6">
            <div class="text-end">
              {dlist.length == 2 ? null : (
                <a href="#">
                  <button
                    onClick={clearField}
                    class="btn btn-edit-address w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#add-address"
                  >
                    যোগ করুন
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>

        {dlist.length == 0 ? <p>কোন ঠিকানা যোগ করা হয়নি!</p> : null}

        <table class="table text-center table-hover">
          <thead>
            <tr class="bg-light">
              <th scope="col">নাম</th>
              <th scope="col">মোবাইল</th>
              <th scope="col">লেভেল</th>
              <th scope="col">ঠিকানা</th>
              <th scope="col">পরিবর্তন</th>
            </tr>
          </thead>

          {dlist.map((item) => (
            <tbody>
              <tr>
                <td class="pb-0 pt-3">{item.name}</td>
                <td class="pb-0 pt-3">{item.phone}</td>
                <td class="pb-0 pt-3">
                  <div class="border-0 rounded-pill text-white bg-label mx-auto p-0 m-0 ">
                    {item.label}
                  </div>
                </td>
                <td class="pb-0 pt-3">
                  <p class="mx-auto">
                    {item.hname}, {item.sname}, {item.aname}, {item.street}
                  </p>
                </td>
                <td class="pb-0 pt-3">
                  <button
                    onClick={() => sdelivery(item.id)}
                    class="editbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-address"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default DeliveryInfo;
