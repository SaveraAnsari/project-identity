import React, { useState } from "react";
import "../../Admin/regData.css";
import "./education.css";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function Education() {
  const [formData, setFormData] = useState({
    cnic: "",
    degreeName: "",
    instituteName: "",
    duration: "",
    startDate: "",
    status: "",
    cgpaPercentage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const EducationData = {
      cnic: formData.cnic,
      degreeName: formData.degreeName,
      instituteName: formData.instituteName,
      duration: formData.duration,
      startDate: formData.startDate,
      status: formData.status,
      cgpaPercentage: formData.cgpaPercentage,
    };

    submitDataToFirestore( EducationData, "Education");
    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Step 4: Use cnic value from formData when storing form data in localStorage
    const { cnic } = formData;

    // Initialize education data if it doesn't exist
    if (!existingData[cnic]) {
      existingData[cnic] = { Education: {} };
    }

    // Save form data under a unique key in the education object
    existingData[cnic].Education = formData;

    localStorage.setItem("Data", JSON.stringify(existingData));
    setFormData({
      cnic: "",
      degreeName: "",
      instituteName: "",
      duration: "",
      startDate: "",
      status: "",
      cgpaPercentage: "",
    });
  };

  return (
    <>
      <Nav />

      <div className="education marriage-form-container">
        <div className="marriage-form">
          <form onSubmit={handleSubmit}>
            <h1>Education Details</h1>
            <input
              type="text"
              placeholder="CNIC"
              value={formData.cnic}
              onChange={(e) =>
                setFormData({ ...formData, cnic: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Degree Name"
              value={formData.degreeName}
              onChange={(e) =>
                setFormData({ ...formData, degreeName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Institute Name"
              value={formData.instituteName}
              onChange={(e) =>
                setFormData({ ...formData, instituteName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
            <br />
            <label htmlFor="start">Start Date</label>
            <br />
            <input
              type="date"
              id="start"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
            <br />
            <input
              type="radio"
              id="complete"
              name="status"
              value="Complete"
              checked={formData.status === "Complete"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
            <label htmlFor="complete" className="radioo">
              Complete
            </label>
            <input
              type="radio"
              id="inProcess"
              name="status"
              value="In Process"
              checked={formData.status === "In Process"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
            <label htmlFor="inProcess" className="radioo">
              In Process
            </label>
            <input
              type="text"
              placeholder="CGPA/Percentage"
              value={formData.cgpaPercentage}
              onChange={(e) =>
                setFormData({ ...formData, cgpaPercentage: e.target.value })
              }
            />
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Education;
