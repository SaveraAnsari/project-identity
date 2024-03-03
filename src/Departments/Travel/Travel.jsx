import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes } from "firebase/storage";

// import "./TravelForm.css";

// import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "../../Config/Firebase.jsx"; // Adjust the path as per your file

// import { v4 as uuidv4 } from "uuid";

function TravelForm() {
  const [Cnic, setCnic] = useState("");
  const [travelDestination, setTravelDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");
  const [travelDocuments, setTravelDocuments] = useState(null);
  const [fileInput, setFileInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Cnic,
      travelDestination,
      travelDate,
      travelPurpose,
      // travelDocuments: travelDocuments.name, // Save only the filename for now
    };

    const travelData = {
      cnic: formData.Cnic,
      destination: formData.travelDestination,
      date: formData.travelDate,
      purpose: formData.travelPurpose,
      // document: "",
    };

    submitDataToFirestore(travelData, "Travel");

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Check if CNIC number already exists in localStorage
    if (!existingData[Cnic]) {
      existingData[Cnic] = { TravelData: {} };
    }

    existingData[Cnic].TravelData = formData; // Save form data under 'TravelData' key

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setCnic("");
    setTravelDestination("");
    setTravelDate("");
    setTravelPurpose("");
    // setTravelDocuments("");
  };

  const handleFileChange = (e) => {
    setTravelDocuments(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };
  const handleLabelClick = () => {
    const fileInput = document.getElementById("travelDocuments");
    fileInput.click();
  };

  const uploadFile = async (file) => {
    if (!file) return;
    const filesFolderRef = ref(storage, `Travel/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <div className="marriage-form-container travel">
        <form onSubmit={handleSubmit}>
          <div className="marriage-form">
            <h2>Travel Details</h2>
            <input
              type="text"
              placeholder="CNIC"
              value={Cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Destination"
              value={travelDestination}
              onChange={(e) => setTravelDestination(e.target.value)}
              required
            />
            <br />
            <label htmlFor="travelDate">Travel Date:</label>
            <br />
            <input
              id="travelDate"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
              style={{ padding: "20px" }}
            />
            <br />
            <textarea
              placeholder="Purpose of Travel"
              value={travelPurpose}
              onChange={(e) => setTravelPurpose(e.target.value)}
              required
            ></textarea>
            <br />
            <div className="file-input-container center">
              <label htmlFor="travelDocuments" className="file-input-label">
                Select Travel Documents
              </label>
              <input
                id="travelDocuments"
                type="file"
                onChange={handleFileChange}
                className="file-input"
                required
              />
            </div>
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default TravelForm;
