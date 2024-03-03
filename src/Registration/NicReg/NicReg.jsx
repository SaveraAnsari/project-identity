import React, { useState } from "react";
import "./nicreg.css";
import HomeNav from "../../Home/HomeNav";
import Footer from "../../Common/Footer";
import { Link } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/Firebase";

function NicReg() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    fatherNIC: "",
    motherName: "",
    motherNIC: "",
    dob: "",
    address: "",
    permanentAddress: "",
    generatedNIC: "",
    age: "",
    photo: null,
    birthCertificate: null,
    fathersNic: null,
    bForm: null,
  });
  const [Imagess, setImagess] = useState({});

  const handleFileChange = (e, inputId) => {
    const file = e.target.files[0];
    setImagess((prevImages) => ({
      ...prevImages,
      [inputId]: file,
    }));
    uploadFile(file); // Automatically upload the file when selected
  };

  const handleLabelClick = (inputId) => {
    const fileInput = document.getElementById(inputId);
    fileInput.click();
  };

  const uploadFile = async (file) => {
    if (!file) return;
    const filesFolderRef = ref(storage, `ApplyForNIC/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "dob") {
      // For date of birth, directly set the value
      setFormData((prevState) => ({
        ...prevState,
        dob: value,
      }));
      // Calculate age based on the selected date of birth
      const dobDate = new Date(value);
      const today = new Date();
      const ageDiff = today.getFullYear() - dobDate.getFullYear();
      const isBirthdayPassed =
        today.getMonth() < dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() &&
          today.getDate() < dobDate.getDate());
      const age = isBirthdayPassed ? ageDiff - 1 : ageDiff;
      setFormData((prevState) => ({
        ...prevState,
        age: age,
      }));
    } else if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateNIC = (nic) => {
    // Regular expression for NIC validation
    const nicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    return nicRegex.test(nic);
  };

  const NIC = () => {
    const randomNIC =
      Math.floor(40000 + Math.random() * 10000) +
      "-" +
      Math.floor(1000000 + Math.random() * 9000000) +
      "-" +
      Math.floor(1 + Math.random() * 9); // Generates NIC in the pattern 5-7-1
    setFormData((prevState) => ({
      ...prevState,
      generatedNIC: randomNIC,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate NIC
    if (!validateNIC(formData.fatherNIC) || !validateNIC(formData.motherNIC)) {
      alert("Invalid NIC format. Please enter NIC in the correct format.");
      return;
    }

    // Add further validation as needed

    const {
      generatedNIC,
      photo,
      birthCertificate,
      fathersNic,
      bForm,
      ...formDataWithoutFiles
    } = formData;

    // Combine form data into an object
    const formDataEntry = {
      ...formDataWithoutFiles,
      generatedNIC: generatedNIC,
      photo: photo ? photo.name : null,
      birthCertificate: birthCertificate ? birthCertificate.name : null,
      fathersNic: fathersNic ? fathersNic.name : null,
      bForm: bForm ? bForm.name : null,
    };

    // Retrieve existing data from local storage or initialize as an empty array
    const existingData = JSON.parse(localStorage.getItem("nicData")) || [];

    // Add the new entry to the existing data
    existingData.push(formDataEntry);

    // Save the updated data back to local storage
    localStorage.setItem("nicData", JSON.stringify(existingData));

    // Clear the form fields after submission
    setFormData({
      name: "",
      fatherName: "",
      fatherNIC: "",
      motherName: "",
      motherNIC: "",
      dob: "",
      address: "",
      permanentAddress: "",
      generatedNIC: "",
      age: "",
      photo: null,
      birthCertificate: null,
      fathersNic: null,
      bForm: null,
    });

    alert("Wait for admin approval. Check tomorrow.");
  };

  return (
    <>
      <HomeNav />{" "}
      <div className="NicReg">
        <h1>NIC Registration</h1>
        <div className="b2 bg1">
          <form onSubmit={handleSubmit}>
            <div className="f1">
              <div className="f2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Father Name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="fatherNIC"
                  placeholder="Father NIC No."
                  value={formData.fatherNIC}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="motherName"
                  placeholder="Mother Name"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="motherNIC"
                  placeholder="Mother NIC No."
                  value={formData.motherNIC}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Age Auto Generate"
                  name="age"
                  onChange={handleChange}
                  value={formData.age}
                  readOnly
                  required
                />
              </div>
              <div className="f2">
                <br />
                <label
                  htmlFor="dob"
                  style={{ marginLeft: "20px", fontWeight: "bold" }}
                >
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="permanentAddress"
                  placeholder="Permanent Address"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={NIC}
                  style={{
                    borderRadius: "20px",
                    width: "250px",
                    marginLeft: "20px",
                  }}
                >
                  Generate NIC
                </button>
                <input
                  type="text"
                  name="generatedNIC"
                  placeholder="Generated NIC"
                  value={formData.generatedNIC}
                  readOnly
                  required
                />
              </div>
              <div className="f2">
                {/* <h2 style={{ textAlign: "left", color: "black" }}>
                Upload IMPORTANT DOCUMENTS
              </h2> */}
                <div className="file-input-container center">
                  <label
                    htmlFor="photo"
                    className="file-input-label"
                    onClick={() => handleLabelClick("photo")}
                  >
                    Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={(e) => handleFileChange(e, "photo")}
                    className="file-input"
                    required
                  />
                </div>

                <div className="file-input-container center">
                  <label
                    htmlFor="birthCertificate"
                    className="file-input-label"
                    onClick={() => handleLabelClick("birthCertificate")}
                  >
                    Birth Certificate
                  </label>
                  <input
                    type="file"
                    id="birthCertificate"
                    name="birthCertificate"
                    onChange={(e) => handleFileChange(e, "birthCertificate")}
                    className="file-input"
                    required
                  />
                </div>
                <div className="file-input-container center">
                  <label
                    htmlFor="fathersNic"
                    className="file-input-label"
                    onClick={() => handleLabelClick("fathersNic")}
                  >
                    Father's NIC
                  </label>
                  <input
                    type="file"
                    id="fathersNic"
                    name="fathersNic"
                    onChange={(e) => handleFileChange(e, "fathersNic")}
                    className="file-input"
                    required
                  />
                </div>

                <div class="file-input-container center">
                  <label
                    for="bForm"
                    class="file-input-label"
                    onClick={() => handleLabelClick("bForm")}
                  >
                    B Form
                  </label>
                  <input
                    type="file"
                    id="bForm"
                    name="bForm"
                    class="file-input"
                    onChange={(e) => handleFileChange(e, "bForm")}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="f1" style={{ margin: "-50px 0px" }}>
              <button
                type="submit"
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "24px",
                  width: "180px",
                  margin: "10px",
                  marginLeft: "100px",
                }}
              >
                Submit
              </button>
              <Link to="/check-nic">
                <button
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "24px",
                    width: "180px",
                    margin: "10px",
                    marginLeft: "100px",
                  }}
                >
                  Nic Status
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NicReg;
