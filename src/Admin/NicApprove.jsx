import React, { useEffect, useState } from "react";

function NicApprove() {
  const [nicData, setNicData] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("nicData")) || [];
    setNicData(dataFromLocalStorage);
  }, []);

  const handleApprove = (index) => {
    // Update status to 'approved' and display alert
    const updatedData = [...nicData];
    updatedData[index].status = "approved";
    setNicData(updatedData);
    localStorage.setItem("nicData", JSON.stringify(updatedData));
    alert("Status updated to Approved");
  };

  const handleReject = (index) => {
    // Handle rejection logic here
    const updatedData = [...nicData];
    updatedData[index].status = "Reject";
    setNicData(updatedData);
    localStorage.setItem("nicData", JSON.stringify(updatedData));
    alert("Status updated to Rejected");
  };

  const handleDelete = (index) => {
    // Handle deletion logic here
    const updatedData = [...nicData];
    updatedData.splice(index, 1);
    setNicData(updatedData);
    localStorage.setItem("nicData", JSON.stringify(updatedData));
    console.log("Entry at index", index, "deleted.");
  };

  return (
    <div>
      <h2>NIC Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Father NIC No.</th>
            <th>Mother Name</th>
            <th>Mother NIC No.</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Permanent Address</th>
            <th>Generated NIC</th>
            <th>Age</th>
            <th>Photo</th>
            <th>Birth Certificate</th>
            <th>Father's NIC</th>
            <th>B Form</th>
          </tr>
        </thead>
        <tbody>
          {nicData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.fatherName}</td>
              <td>{entry.fatherNIC}</td>
              <td>{entry.motherName}</td>
              <td>{entry.motherNIC}</td>
              <td>{entry.dob}</td>
              <td>{entry.address}</td>
              <td>{entry.permanentAddress}</td>
              <td>{entry.generatedNIC}</td>
              <td>{entry.age}</td>
              {/* Displaying images */}
              <td>
                {entry.photo ? (
                  <img
                    src={`/images/${entry.photo}`}
                    alt="Photo"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No photo"
                )}
              </td>
              <td>
                {entry.birthCertificate ? (
                  <img
                    src={`/images/${entry.birthCertificate}`}
                    alt="Birth Certificate"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No birth certificate"
                )}
              </td>
              <td>
                {entry.fathersNic ? (
                  <img
                    src={`/images/${entry.fathersNic}`}
                    alt="Father's NIC"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No father's NIC"
                )}
              </td>
              <td>
                {entry.bForm ? (
                  <img
                    src={`/images/${entry.bForm}`}
                    alt="B Form"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No B Form"
                )}
              </td>
              <td>
                <button onClick={() => handleApprove(index)}>Approve</button>
                <button onClick={() => handleReject(index)}>Reject</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NicApprove;
