import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

function Productnav() {
  let history = useHistory();
  const [allcate, setAllcate] = useState([]);

  

  return (
    <>
      <div class="moboff">
        <div class="bg-white text-center border-bottom py-2">
          {allcate.map((item) => (
            <div class="d-inline-flex flex-row justify-content-between">
              <Link to={"/category/" + item.id} class="navlinkc">
                <div class="mx-4 catnfont">
                  <p class="mb-0">{item.cname}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div class="mobc">
        <div class="d-flex flex-row bg-white align-items-center py-2">
          <i
            class="fa-sharp fa-solid fa-arrow-left fs-5 px-2"
            onClick={() => history.goBack()}
          ></i>
          <div class="flex-fill border rounded-pill bg-white mx-2">
            <div class="input-group" style={{ position: "relative" }}>
              <span class="input-group-prepend ">
                <div class="input-group-text home-search">
                  <i
                    class="fa fa-search"
                    style={{ color: "#565656", fontSize: 14 }}
                  ></i>
                </div>
              </span>
              <span
                onClick={() => history.push("/search")}
                class="form-control form-control-search py-2 home-search"
                style={{ fontSize: 12, cursor: "pointer" }}
                type="search"
              >
                সার্চ করুন...
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Productnav;
