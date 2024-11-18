import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import { useHistory, withRouter } from "react-router-dom";
import Navbar from "./navbar";
import decrement from "../actions/decrement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nullify from "../actions/nullify";

function Foodcart() {
  let history = useHistory();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const [coun, setCoun] = useState(0);
  const [total, setTotal] = useState(0);
  const [dlist, setDlist] = useState([]);
  const [did, setDid] = useState("");
  const [load, setLoad] = useState(false);
  const [allprod, setAllprod] = useState([]);

  const [allfood, setAllfood] = useState([]);

  const [show, setShow] = useState(false);
  const [otype, setOtype] = useState("food");

  useEffect(() => {
    if (localStorage.getItem("foods") != null) {
      setItems(JSON.parse(localStorage.getItem("foods")));
      var i = 0;
      JSON.parse(localStorage.getItem("foods")).map((item) => {
        i = i + item.quantity * item.price;
      });

      setTotal(i.toFixed(2));
    }

    fetch("https://sowdaapp.com/sandweep/fetchproduct", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAllprod(res.message);
      })
      .catch((err) => console.log(err));

    fetch("https://sowdaapp.com/sandweep/foodfetch", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAllfood(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }, [coun]);

  useEffect(() => {
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
  }, [dlist]);

  function upquan(index, i) {
    i++;
    var items = JSON.parse(localStorage.getItem("foods"));
    items[index].quantity = i;
    localStorage.setItem("foods", JSON.stringify(items));
    setCoun(coun + 1);
  }

  function upquan2(index, i) {
    i--;
    if (i < 1) {
      i = 1;
    }
    var items = JSON.parse(localStorage.getItem("foods"));
    items[index].quantity = i;
    localStorage.setItem("foods", JSON.stringify(items));
    setCoun(coun + 1);
  }

  function orderprod() {
    if (localStorage.getItem("token") == null) {
      history.push("/login");
      return false;
    }

    setLoad(true);

    var x = Number(total) + Number(0.5);
    const data = new FormData();
    data.append("status", "Order Placed");
    data.append("total", x);
    data.append("did", did);
    data.append("token", localStorage.getItem("token"));
    data.append("otype", otype);
    data.append("note", localStorage.getItem("note"));
    data.append("items", localStorage.getItem("foods"));

    fetch("https://sowdaapp.com/sandweep/orderprod", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == null) {
          localStorage.removeItem("foods");
          localStorage.removeItem("count");
          setLoad(false);
          setCoun(coun + 1);
          dispatch(nullify());
          history.push("/account");

          toast.success("Product ordered successfully !", {
            icon: "🛒",
          });
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div class="bg-light">
        <div class="container-fluid px-5">
          <div class="row">
            <div class="col-lg-9">
              {localStorage.getItem("token") == null ? null : (
                <div class="col-lg-12 card-body bg-white my-4">
                  <p class="my-auto fs-5 fw-bold">Delivery Information</p>

                  {dlist.length == 0 ? (
                    <div class="d-flex justify-content-between mt-3">
                      <p class="">
                        No Delivery location Added! Please add your delivery
                        location.
                      </p>
                      <a
                        href="#"
                        class=" modal-decoration"
                        data-bs-toggle="modal"
                        data-bs-target="#add-address"
                      >
                        Add Location
                      </a>
                    </div>
                  ) : null}

                  <div class="d-flex justify-content-between mt-3">
                    <table class="table text-center table-hover">
                      <thead>
                        <tr class="bg-light">
                          <th scope="col">Name</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Label</th>
                          <th scope="col">Address</th>
                          <th scope="col">Select</th>
                        </tr>
                      </thead>

                      {dlist.map((item) => (
                        <tbody>
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>
                              <div class="border rounded-pill text-white bg-label mx-auto p-auto">
                                {item.label}
                              </div>
                            </td>
                            <td>
                              <p class="mx-auto">
                                {item.hname} {item.sname} {item.aname}{" "}
                                {item.street}
                              </p>
                            </td>
                            <td>
                              <input
                                onChange={(e) => setDid(item.id)}
                                type="checkbox"
                                checked={did == item.id ? true : false}
                              />
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>

                    <div
                      class="modal fade add-address-modal-top"
                      id="add-address"
                      tabindex="-1"
                      aria-labelledby="add-addressLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-body">
                            <div class="conatiner my-2">
                              <p class="fs-4 pb-3">Delivery Address</p>

                              <form class=" g-3">
                                <div class="row mt-2">
                                  <div class="col-lg-6 mt-2">
                                    <label
                                      for="inputfullname"
                                      class="form-label text-muted"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputfullname"
                                    />
                                  </div>
                                  <div class="col-lg-6 mt-2">
                                    <label
                                      for="inputnumber"
                                      class="form-label text-muted"
                                    >
                                      Mobile number
                                    </label>
                                    <input
                                      type="number"
                                      class="form-control"
                                      id="inputnumber"
                                    />
                                  </div>
                                </div>
                                <div class="row mt-2">
                                  <div class="col-lg-6">
                                    <label
                                      for="inputhousename"
                                      class="form-label text-muted"
                                    >
                                      House Name / Number
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputhousename"
                                    />
                                  </div>
                                  <div class="col-lg-6">
                                    <label
                                      for="inputStreetnumber"
                                      class="form-label text-muted"
                                    >
                                      Street Number
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputStreetnumber"
                                    />
                                  </div>
                                </div>
                                <div class="row mt-2">
                                  <div class="col-lg-6">
                                    <label
                                      for="inputAreaname"
                                      class="form-label text-muted"
                                    >
                                      Area Name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputAreaname"
                                    />
                                  </div>
                                  <div class="col-lg-6">
                                    <label
                                      for="inputStatename"
                                      class="form-label text-muted"
                                    >
                                      State Name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputStatename"
                                    />
                                  </div>
                                </div>
                                <div class="row mt-2">
                                  <label
                                    for="inputAreaname"
                                    class="form-label text-muted"
                                  >
                                    Delivery Label
                                  </label>
                                  <div class="col-lg-3">
                                    <button class="btn btn-light home-office-btn w-75">
                                      Home
                                    </button>
                                  </div>
                                  <div class="col-lg-3 ">
                                    <button class="btn btn-light home-office-btn w-75">
                                      Office
                                    </button>
                                  </div>
                                </div>
                                <div class="row mt-5">
                                  <div class="col-lg-6"></div>
                                  <div class="col-lg-6 text-end">
                                    <button class="btn add-address-btn-modal-save">
                                      Save Address
                                    </button>
                                    <button class="btn  mx-3 add-address-btn-modal-cancel">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div class="col-lg-12 card-body bg-white my-4">
                <p class="my-auto fs-5">Shopping Cart ({counter})</p>
              </div>
              <div class="col-lg-12 card-body bg-white mb-4">
                {items.map((item, index) => (
                  <div class="row mb-1 cartitem py-2">
                    <div class="col-lg-5">
                      <div class="d-flex">
                        {otype == "shop" ? (
                          <>
                            {allprod.map((y) => (
                              <>
                                {y.id == item.id ? (
                                  <img
                                    src={
                                      "https://sowdaapp.com/sandweep/image/" +
                                      y.pimage
                                    }
                                    class="cart-pr-img"
                                    alt=""
                                    srcset=""
                                  />
                                ) : null}
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            {allfood.map((y) => (
                              <>
                                {y.id == item.id ? (
                                  <img
                                    src={
                                      "https://sowdaapp.com/sandweep/image/" +
                                      y.image
                                    }
                                    class="cart-pr-img"
                                    alt=""
                                    srcset=""
                                  />
                                ) : null}
                              </>
                            ))}
                          </>
                        )}

                        <div class="my-auto mx-4">
                          <p class="cart-pro-name">{item.name}</p>
                          <p class="text-warning fs-5 mtop">${item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 my-auto">
                      <div class="input-group cart-i-d-margin">
                        <input
                          type="button"
                          value="-"
                          class="button-minus text-muted rounded-circle icon-sm mx-3"
                          data-field="quantity"
                          onClick={() => upquan2(index, item.quantity)}
                        />
                        <input
                          type="number"
                          value={item.quantity}
                          placeholder="1000 gm"
                          name="quantity"
                          class="quantity-field  text-center w-25"
                          readOnly
                        />
                        <input
                          type="button"
                          value="+"
                          class="button-plus text-muted rounded-circle icon-sm  mx-3"
                          data-field="quantity"
                          onClick={() => upquan(index, item.quantity)}
                        />
                      </div>
                    </div>
                    <div class="col-lg-4 my-auto">
                      <div class="text-end cart-trash">
                        <i
                          onClick={() => {
                            dispatch(decrement(index));
                            setCoun(coun + 1);
                          }}
                          class="fa-solid fa-trash-can text-muted cur"
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div class="col-lg-3">
              <div class="container">
                <div class="card-body bg-white text-muted my-4">
                  <p class="fs-5  fw-bold">Order Summary</p>
                  <div class="d-flex justify-content-between">
                    <p>Subtotal</p>
                    <p>${total}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>Shipping Fee</p>
                    <p>$0.5</p>
                  </div>
                  <div class="mtop">
                    <hr />
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold">Total</p>
                    <p class="text-warning">$ {Number(total) + Number(0.5)}</p>
                  </div>

                  <button
                    class="btn btn-success w-100"
                    onClick={orderprod}
                    disabled={load ? true : false}
                  >
                    {load ? "Loading" : "BUY NOW"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Foodcart);
