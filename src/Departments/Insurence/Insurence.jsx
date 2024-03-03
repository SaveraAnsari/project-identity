import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function InsuranceForm() {
  const [cnic, setcnic] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [insuranceStartDate, setInsuranceStartDate] = useState("");
  const [insuranceEndDate, setInsuranceEndDate] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      insuranceType,
      insuranceStartDate,
      insuranceEndDate,
      insuranceCompany,
      insurancePolicyNumber,
      premiumAmount,
    };
    const insurecneData = {
      insuranceType: formData.insuranceType,
      insuranceStartDate: formData.insuranceStartDate,
      insuranceEndDate: formData.insuranceEndDate,
      insuranceCompany: formData.insuranceCompany,
      insurancePolicyNumber: formData.insurancePolicyNumber,
      premiumAmount: formData.premiumAmount,
    };

    submitDataToFirestore(insurecneData, "insurence");

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Check if cnic number already exists in localStorage
    if (!existingData[cnic]) {
      existingData[cnic] = { InsuranceData: {} };
    }

    existingData[cnic].InsuranceData = formData;

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setcnic("");
    setInsuranceType("");
    setInsuranceStartDate("");
    setInsuranceEndDate("");
    setInsuranceCompany("");
    setInsurancePolicyNumber("");
    setPremiumAmount("");
  };

  return (
    <>
      <Nav />
      <div className="marriage-form-container insurence">
        <div className="marriage-form" style={{ height: "120vh" }}>
          <form onSubmit={handleSubmit}>
            <h1>Insurance Form</h1>
            <label>Cnic:</label>
            <br />
            <input
              type="text"
              value={cnic}
              onChange={(e) => setcnic(e.target.value)}
              required
            />

            <br />
            <label>Insurance Type: </label>
            <br />
            <input
              type="text"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              required
            />

            <br />
            <label>Insurance Start Date: </label>
            <input
              type="date"
              value={insuranceStartDate}
              onChange={(e) => setInsuranceStartDate(e.target.value)}
              required
            />

            <br />
            <label>Insurance End Date:</label>
            <input
              type="date"
              value={insuranceEndDate}
              onChange={(e) => setInsuranceEndDate(e.target.value)}
              required
            />

            <br />
            <label>Insurance Company:</label>
            <input
              type="text"
              value={insuranceCompany}
              onChange={(e) => setInsuranceCompany(e.target.value)}
              required
            />

            <br />
            <label>Insurance Policy Number:</label>
            <input
              type="text"
              value={insurancePolicyNumber}
              onChange={(e) => setInsurancePolicyNumber(e.target.value)}
              required
            />

            <br />
            <label>Premium Amount:</label>
            <input
              type="number"
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
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

export default InsuranceForm;
