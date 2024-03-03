import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function EmploymentForm() {
  const [cnic, setcnic] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [isJobPresent, setIsJobPresent] = useState(true);
  const [salary, setSalary] = useState("");
  const [jobResponsibility, setJobResponsibility] = useState("");
  const [skills, setSkills] = useState("");

  const handleJobPresentChange = (e) => {
    setIsJobPresent(e.target.value === "yes");
    if (e.target.value === "no") {
      setJobEndDate("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      cnic,
      jobTitle,
      companyName,
      jobStartDate,
      jobEndDate,
      isJobPresent,
      salary,
      jobResponsibility,
      skills,
    };
    const EmployeeData = {
      cnic: formData.cnic,
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      jobStartDate: formData.jobStartDate,
      jobEndDate: formData.jobEndDate,
      isJobPresent: formData.isJobPresent,
      salary: formData.salary,
      jobResponsibility: formData.jobResponsibility,
      skills: formData.skills,
    };

    submitDataToFirestore(EmployeeData, "Employee");
    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Step 4: Use cnic value when storing form data in localStorage
    if (!existingData[cnic]) {
      existingData[cnic] = { EmploymentData: {} };
    }

    existingData[cnic].EmploymentData = formData; // Save form data under 'EmploymentData' key

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setcnic("");
    setJobTitle("");
    setCompanyName("");
    setJobStartDate("");
    setJobEndDate("");
    setIsJobPresent(true);
    setSalary("");
    setJobResponsibility("");
    setSkills("");
  };

  const handleAddAnother = () => {
    // Logic to add another response
    console.log("Adding another response");
  };

  return (
    <>
      <Nav />
      <div className=" marriage-form-container employee">
        <div className="marriage-form" style={{ height: "125vh" }}>
          <form onSubmit={handleSubmit}>
            <h1>Employment Form</h1>
            <label>Cnic:</label>
            <br />
            <input
              type="text"
              value={cnic}
              onChange={(e) => setcnic(e.target.value)}
              required
            />
            <br />
            <label>Job Title:</label>
            <br />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
            <br />
            <label>Company Name:</label>
            <br />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <br />
            <label>Job Start Date:</label>
            <br />
            <input
              type="date"
              value={jobStartDate}
              onChange={(e) => setJobStartDate(e.target.value)}
              required
            />
            <br />
            <label>Are you currently employed:</label>
            <br />
            <input
              type="radio"
              name="jobPresent"
              value="yes"
              checked={isJobPresent}
              onChange={handleJobPresentChange}
              style={{
                border: "none",
                margin: 0,
                padding: 0,
                boxShadow: "none",
                width: "30px",
              }}
            />
            Yes
            <input
              type="radio"
              name="jobPresent"
              value="no"
              checked={!isJobPresent}
              onChange={handleJobPresentChange}
              style={{
                border: "none",
                margin: 0,
                padding: 0,
                boxShadow: "none",
                width: "30px",
              }}
            />
            No
            <br />
            {!isJobPresent && (
              <>
                <label>Job End Date:</label>
                <br />
                <input
                  type="date"
                  value={jobEndDate}
                  onChange={(e) => setJobEndDate(e.target.value)}
                />

                <br />
              </>
            )}
            <label>Salary:</label>
            <br />
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <br />
            <label>Job Responsibility:</label>
            <br />
            <textarea
              value={jobResponsibility}
              onChange={(e) => setJobResponsibility(e.target.value)}
              required
            />
            <br />
            <label>Skills:</label>
            <br />
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmploymentForm;
