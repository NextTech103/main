import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Sidebar() {
  const [cate, setCate] = useState([]);

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchcate", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setCate(res.message))
      .catch((err) => console.log(err));
  }, []);

  var active = window.location.pathname.replace("/category/", "");

  return (
    <div class="testside moboff" style={{ width: "20%" }}>
      <div class="catside bangla_font">
        <ul class="card-body bg-light border-cate pb-1">
          <p class="a-text fw-bold px-2">Category</p>

          {cate.map((item) => (
            <Link to={"/category/" + item.id} class="my-2 cardcm navlinkc">
              <div class="row align-items-center p-2 my-1 border-top">
                <div class="col-lg-2">
                  <img
                    src={"https://sowdaapp.com/sandweep/image/" + item.image}
                    class="cate-logo1"
                    alt=""
                    srcset=""
                  />
                </div>
                <div
                  class={
                    active == item.id ? "col-lg-9 b-text" : "col-lg-9 n-text"
                  }
                >
                  {item.cname}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div class="card-body bg-light border-cate">
        <p class="fw-bold px-2">Price</p>
        <input type="range" id="points" name="points" min="0" max="10"></input>
      </div>
    </div>
  );
}

export default Sidebar;
