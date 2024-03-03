import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import HomeNav from "./HomeNav";

import pic1 from "../assets/about_nadra.png";
import Sliderr from "../Dashboard/Sliderr";
import "./home.css";
import UserData from "../Admin/AllData/Data";
import Footer from "../Common/Footer";

function Home() {
  return (
    <>
      <HomeNav />

      {/* <UserData /> */}
      <div className="bgpp">
        <div className="bgp">
          <h1 className="bgph1"> DIGITAL IDENTITY HUB</h1>
          <p className="pppp">Complete your identity</p>
        </div>
      </div>
      <Sliderr />
      <div className="pp-6">
        <div className="d-flex pp-5">
          <div>
            <img src={pic1} alt="" className="ppic1" />
          </div>
          <div>
            <h1 id="hh1">
               Digital Identity Hub
              (DIH)
            </h1>
            <p id="pp1">
              DIH has gained international recognition for its success in
              providing solutions for identification, e-governance and secure
              documents that deliver multiple goals of mitigating identity
              theft, safe-guarding the interests of our clients and facilitating
              the public. In-depth Research and Development efforts have enabled
              DIH to become the trailblazer in the areas of Software
              Integration, Data Warehousing and Network Infrastructure.
            </p>
          </div>
        </div>
      </div>
      <div className="a21">
        <div>
          <div className="education a22">
            <Link to={"/login"}>Education</Link>
          </div>
          <div className="employee a22">
            <Link to={"/login"}>Employment</Link>
          </div>
        </div>
        <div>
          {/* </div> */}
          <div className="insurence a22">
            <Link to={"/login"}>Insurence</Link>
          </div>
          <div className="marriage a22">
            <Link to={"/login"}>Marriage</Link>
          </div>
        </div>
        <div>
          <div className="medical a22">
            <Link to={"/login"}>Medical</Link>
          </div>
          <div className="travel a22">
            <Link to={"/login"}>Travel</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
