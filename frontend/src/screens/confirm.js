import { withRouter, Link } from "react-router-dom";
import Oconfirm from "../image/icons/orderc.png";
import Navbar from "./navbar.js";
import Bottomnav from "./bottomnav";
import Navbar2 from "./navbar2.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

function Confirm() {
  let history = useHistory();
  return (
    <>
      <Navbar />
      <Navbar2 />
      <center class="mt-5">
        <img src={Oconfirm} class="orderc mt-5" />
        <br></br>
        <button
        onClick={()=> history.push("/")}
        style={{
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "10px",
          cursor: "pointer",
          borderRadius: "12px"
        }}
      >
        Shop Again
      </button>


      </center>

      <Bottomnav />
    </>
  );
}

export default Confirm;
