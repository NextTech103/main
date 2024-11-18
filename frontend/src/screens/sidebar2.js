import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar2({ id }) {
  const [cate, setCate] = useState([]);
  const [wlist, setWlist] = useState([]);

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchcate", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setCate(res.message))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const data = new FormData();
    data.append("cate", id);
    fetch("https://sowdaapp.com/sandweep/fetchcate2", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setWlist(res.message);
      })
      .catch((err) => console.log(err));
  }, [wlist]);

  var active = window.location.pathname.replace("/category/", "");
  const dispatch = useDispatch();

  return (
    <div class="col-lg-3 testside moboff">
      <div class="catside">
        <ul class="card-body bg-white border-cate pb-2">
          <li class="d-flex pb-2">
            <a
              class="a-text fs-5 fw-bold bangla_font"
              style={{ textDecoration: "none", color: "#262626" }}
            >
              Category
            </a>
          </li>

          {cate.map((item) => (
            <Link
              to={"/category/" + item.id}
              class="py-1 my-2 card cardcm navlinkc bangla_font"
            >
              <div class="row align-items-center my-1">
                <div class="col-lg-3">
                  <img
                    src={"https://sowdaapp.com/sandweep/image/" + item.image}
                    class="cate-logo1 mx-3"
                    alt=""
                    srcset=""
                  />
                </div>
                <div
                  class={
                    active == item.id ? "col-lg-9 b-text" : "col-lg-9 a-text"
                  }
                >
                  {item.cname}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      <div className="catside2">
        <div class="suggesteditem text-center pb-2">
          <h5 class="text-warning p-3 pb-1 bangla_font">Only for you</h5>
          <center>
            {wlist.map((item) => (
              <div to={"/product/2"} class="hpcart3 text-center py-2 px-2">
                <div class="card pb-3 productcard3 ">
                  <Link class="link" to={"/product/" + item.id}>
                    <img
                      src={"https://sowdaapp.com/sandweep/image/" + item.pimage}
                      class="card-img-top3"
                      alt=""
                      srcset=""
                    />
                    <p class="mtop prname mt-3 p-0 p-1">
                      {item.pname.substring(0, 22)}...
                    </p>
                    {/* <p class="mtop qty-text">{item.quan}</p> */}
                    <p class=" pprprice2 mx-5">
                      {item.offer == 1 ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginRight: 8,
                            }}
                          >
                            ৳ {item.price}
                          </span>
                          <span>৳ {item.oprice}</span>
                        </>
                      ) : (
                        <span>৳ {item.price}</span>
                      )}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </center>
        </div>
      </div>
    </div>
  );
}

export default Sidebar2;
