import React, { useState } from "react";
import "./MarriageForm.css"; // Import CSS file for styling
import Footer from "../../Common/Footer";
import Nav from "../../Dashboard/Navbar";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes } from "firebase/storage";

function MarriageForm() {
  const [husbandName, setHusbandName] = useState("");
  const [husbandCnic, setHusbandCnic] = useState("");
  const [brideName, setBrideName] = useState("");
  const [brideCnic, setBrideCnic] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriageCertificateImage, setMarriageCertificateImage] =
    useState(null);
    const [fileInput, setFileInput] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      husbandName,
      husbandCnic,
      brideName,
      brideCnic,
      marriageDate,
      // marriageCertificateImage,
    };
    const MarriageData = {
      husbandName: formData.husbandName,
      husbandCnic: formData.husbandCnic,
      brideName: formData.brideName,
      brideCnic: formData.brideCnic,
      marriageDate: formData.marriageDate,
      // marriageCertificateImage: formData.marriageCertificateImage,
    };

    submitDataToFirestore(MarriageData, "Marriage");
    alert("done");

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Use husbandCnic value when storing form data in localStorage
    if (!existingData[husbandCnic]) {
      existingData[husbandCnic] = { MarriageData: {} };
    }

    existingData[husbandCnic].MarriageData = formData; // Save form data under 'MarriageData' key

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setHusbandName("");
    setHusbandCnic("");
    setBrideName("");
    setBrideCnic("");
    setMarriageDate("");
    // setMarriageCertificateImage(null);
  };

  
  const handleFileChange = (e) => {
    setMarriageCertificateImage(e.target.files[0]);
    uploadFile(e.target.files[0]); 
  };
  const handleLabelClick = () => {
    const fileInput = document.getElementById("marriageCertificate");
    fileInput.click();
  };
  
  const uploadFile = async (file) => {
    if (!file) return;
    const filesFolderRef = ref(storage, `Marriage/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
    } catch (err) {
      console.error(err);
    }
  };

 



  return (
    <div>
      <Nav />
      <div className="marriage-form-container marriage">
        <form onSubmit={handleSubmit} className="marriage-form">
          <div className="form-section">
            <h2>Groom Details</h2>
            <input
              type="text"
              placeholder="Husband Name"
              value={husbandName}
              onChange={(e) => setHusbandName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Husband CNIC"
              value={husbandCnic}
              onChange={(e) => setHusbandCnic(e.target.value)}
            />
            <br />
          </div>
          <div className="form-section">
            <h2>Bride Details</h2>
            <input
              type="text"
              placeholder="Bride Name"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Bride CNIC"
              value={brideCnic}
              onChange={(e) => setBrideCnic(e.target.value)}
            />
            <br />
          </div>
          <div className="form-section">
            <h2>Marriage Details</h2>
            <label htmlFor="marriageDate">Marriage Date:</label>
            <br />
            <input
              id="marriageDate"
              type="date"
              value={marriageDate}
              onChange={(e) => setMarriageDate(e.target.value)}
            />
            <br />
          
            <div className="file-input-container">
              <label htmlFor="marriageCertificate" className="file-input-label">
                Select Marriage Certificate
              </label>
              <input
                id="marriageCertificate"
                type="file"
                onChange={handleFileChange}
                className="file-input"
                required
              />
             
             
            </div>

            <br />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default MarriageForm;
