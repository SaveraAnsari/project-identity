import React from "react";
import Nav from "./Navbar";
import Sliderr from "./Sliderr";
import Logo from "../assets/nadra.png";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";

function Dashboard() {
  return (
    <div>
      <Nav />
      <Sliderr />

      <div className="a21">
        <div className="">
          <Link to={"/education"}>
            <div className="education a22">Education</div>
          </Link>
          <Link to={"/employment"}>
            <div className="employee a22">Employment</div>
          </Link>
        </div>
        <div>
          {/* </div> */}
          <Link to={"/insurance"}>
            <div className="insurence a22">Insurence</div>
          </Link>
          <Link to={"/marriage"}>
            <div className="marriage a22">Marriage</div>
          </Link>
        </div>
        <div>
          <Link to={"/medical"}>
            <div className="medical a22">Medical</div>
          </Link>
          <Link to={"/travel"}>
            <div className="travel a22">Travel</div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
