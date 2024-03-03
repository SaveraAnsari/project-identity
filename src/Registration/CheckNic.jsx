import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NicReg/nicreg.css";
import HomeNav from "../Home/HomeNav";
import Footer from "../Common/Footer";

function CheckNic() {
  const [nic, setNic] = useState("");
  const [mNic, setmNic] = useState("");
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(true);

  const handleCheck = (e) => {
    e.preventDefault();

    // Retrieve data from local storage
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("nicData")) || [];

    // Find matching data for the provided NIC and name
    const matchingUserData = dataFromLocalStorage.find(
      (user) => user.fatherNIC === nic && user.motherNIC === mNic
    );

    if (matchingUserData) {
      // Matching data found
      setUserData(matchingUserData);
    } else {
      // No matching data found
      alert("No matching data found.");
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    // Save changes to the backend or update local storage if needed
  };

  return (
    <div>
      <HomeNav />
      <div className="f4">
        <h2>Check NIC</h2>
        <form onSubmit={handleCheck}>
          <div className="f3">
            <label htmlFor="fatherNic">Father's NIC:</label>
            <input
              id="fatherNic"
              type="text"
              placeholder="Father's NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              disabled={!editable}
            />
            <br />
            <label htmlFor="motherNic">Mother's NIC:</label>
            <input
              id="motherNic"
              type="text"
              placeholder="Mother's NIC"
              value={mNic}
              onChange={(e) => setmNic(e.target.value)}
              disabled={!editable}
            />
            <button type="submit">Check</button>
          </div>
        </form>
        {userData && (
          <div>
            <h3>Nic Information:</h3>
            <p>Name: {userData.name}</p>
            <p>Father: {userData.fatherName}</p>
            <p>Father NIC: {userData.fatherNIC}</p>
            <p>Mother: {userData.motherName}</p>
            <p>Mother NIC: {userData.motherNIC}</p>
            <p>Address: {userData.address}</p>
            <p>Permanent Address: {userData.permanentAddress}</p>
            <p>NIC: {userData.generatedNIC}</p>
            <p>
              Status:{" "}
              {userData.status === "approved" ? "Approved" : "Pending/Rejected"}
            </p>
            {userData.status !== "approved" &&
              (editable ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              ))}
          </div>
        )}

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default CheckNic;
