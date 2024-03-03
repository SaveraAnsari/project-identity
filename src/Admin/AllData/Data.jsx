import React, { useState, useEffect } from "react";

import Footer from "../../Common/Footer";
import Nav from "../../Dashboard/Navbar";
import getDataToFirestore from "../../Config/Getdata";

function UserData() {
  //Need to call here
  useEffect(() => {
    // Call getDataToFirestore function when component mounts
    getDataToFirestore("Travel", cnic);
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const [cnic, setCnic] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    const data = JSON.parse(localStorage.getItem("Data"));
    const userEntry = data[cnic];
    if (userEntry) {
      setUserData(userEntry);
    } else {
      setUserData(null);
    }
  };

  const handleEdit = (section) => {
    // Redirect or display editing options for the selected section
    console.log(`Editing ${section} data`);
    alert("You Don't have admin rights ");
  };

  const handleDelete = () => {
    // Implement logic to delete the user data
    console.log("Deleting user data");
    alert("You Don't have admin rights ");
  };

  return (
    <div>
      <Nav />
      <div className="marriage-form-container new">
        <div className="marriage-form">
          <h1>User Data</h1>
          <input
            type="text"
            placeholder="Enter CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {userData && (
        <div>
          <h2>User Details</h2>
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Data</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userData).map((section) => (
                <tr key={section}>
                  <td>{section}</td>
                  <td>{JSON.stringify(userData[section])}</td>
                  <td>
                    <button onClick={() => handleEdit(section)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDelete}>Delete User Data</button>
        </div>
      )}
      {!userData && <p>No data found for the entered CNIC.</p>}
      <Footer />
    </div>
  );
}

export default UserData;
