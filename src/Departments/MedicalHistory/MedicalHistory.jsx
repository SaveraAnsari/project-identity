import React, { useState } from "react";
import "./MedicalHistoryForm.css";
import "../Marriage/MarriageForm.css";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import UserData from "../../Admin/AllData/Data";
import submitDataToFirestore from "../../Config/SubmitData";

function MedicalHistoryForm() {
  const [cnic, setcnic] = useState(""); // Step 1: State variable for cnic
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medicationsPrescribed, setMedicationsPrescribed] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [hasSurgeriesProcedures, setHasSurgeriesProcedures] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState("");
  const [hasVaccinationHistory, setHasVaccinationHistory] = useState(false);
  const [vaccinations, setVaccinations] = useState([]);
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState("");

  const handleVaccinationChange = (e) => {
    const selectedVaccinations = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setVaccinations(selectedVaccinations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      cnic,
      medicalConditions,
      medicationsPrescribed,
      allergies,
      surgeryDetails,
      vaccinations,
      familyMedicalHistory,
    };

    // alert("Form Data:", formData); // Check if form data is collected correctly
    const Data = {
      cnic: formData.cnic,
      medicalConditions : formData.medicalConditions,
      medicationsPrescribed : formData.medicationsPrescribed,
      allergies : formData.allergies,
      surgeryDetails: formData.surgeryDetails,
      vaccinations : formData.vaccinations,
      familyMedicalHistory: formData.familyMedicalHistory,
    };
    submitDataToFirestore(Data, "Medical");
    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Step 4: Use cnic value when storing form data in localStorage
    if (!existingData[cnic]) {
      existingData[cnic] = { medical: {} };
    }

    existingData[cnic].medical = formData; // Save form data under 'Education' key

    localStorage.setItem("Data", JSON.stringify(existingData));
    const alertMessage = `
    CNIC: ${cnic}
    Medical Conditions: ${medicalConditions}
    Medications Prescribed: ${medicationsPrescribed}
    Allergies: ${hasAllergies ? allergies : "None"}
    Surgeries/Procedures: ${hasSurgeriesProcedures ? surgeryDetails : "None"}
    Vaccination History: ${
      hasVaccinationHistory ? vaccinations.join(", ") : "None"
    }
    Family Medical History: ${familyMedicalHistory}
  `;

    // Display alert with form data
    alert(alertMessage);

    // Reset form fields
    setcnic("");
    setMedicalConditions("");
    setMedicationsPrescribed("");
    setHasAllergies(false);
    setAllergies("");
    setHasSurgeriesProcedures(false);
    setSurgeryDetails("");
    setHasVaccinationHistory(false);
    setVaccinations([]);
    setFamilyMedicalHistory("");
  };

  return (
    <>
      <Nav />
      <div className="marriage-form-container medical">
        <form
          className="marriage-form"
          onSubmit={handleSubmit}
          style={{
            height: "120vh",
          }}
        >
          {/* Step 2: Add cnic input field */}
          <label>Cnic: </label>
          <input
            type="text"
            value={cnic}
            onChange={(e) => setcnic(e.target.value)}
            required
          />

          <br />
          <label>Medical Conditions:</label>
          <input
            type="text"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            required
          />

          <br />
          <label>Medications Prescribed:</label>
          <input
            type="text"
            value={medicationsPrescribed}
            onChange={(e) => setMedicationsPrescribed(e.target.value)}
            required
          />

          <br />
          <label>Allergies:</label>
          <input
            type="checkbox"
            checked={hasAllergies}
            onChange={(e) => setHasAllergies(e.target.checked)}
          />

          {hasAllergies && (
            <>
              <br />
              <label>Details of Allergies:</label>
              <textarea
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              ></textarea>
            </>
          )}
          <br />
          <label>Surgeries/Procedures:</label>
          <input
            type="checkbox"
            checked={hasSurgeriesProcedures}
            onChange={(e) => setHasSurgeriesProcedures(e.target.checked)}
          />

          {hasSurgeriesProcedures && (
            <>
              <br />
              <label>Details of Surgeries/Procedures:</label>
              <textarea
                value={surgeryDetails}
                onChange={(e) => setSurgeryDetails(e.target.value)}
              ></textarea>
            </>
          )}
          <br />
          <label>Vaccination History:</label>
          <input
            type="checkbox"
            checked={hasVaccinationHistory}
            onChange={(e) => setHasVaccinationHistory(e.target.checked)}
          />

          {hasVaccinationHistory && (
            <>
              <br />
              <label>Select Vaccinations:</label>
              <select
                style={{
                  padding: "30px",
                  height: "400px",
                  fontSize: "24px      ",
                }}
                multiple
                value={vaccinations}
                onChange={handleVaccinationChange}
              >
                <option value="COVID-19">COVID-19</option>
                <option value="Flu">Flu</option>
                <option value="Hepatitis">Hepatitis</option>
                <option value="MMR">MMR</option>
                <option value="Varicella">Varicella</option>
                {/* Add more vaccination options as needed */}
              </select>
            </>
          )}
          <br />
          <label>
            Family Medical History:
            <textarea
              value={familyMedicalHistory}
              onChange={(e) => setFamilyMedicalHistory(e.target.value)}
              required
            ></textarea>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default MedicalHistoryForm;
