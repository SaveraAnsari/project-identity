import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function AdminMedical() {
  const [medicalData, setMedicalData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch medical data from Firestore when component mounts
    const fetchMedicalData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Medical"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setMedicalData(data);
      } catch (error) {
        console.error("Error fetching medical data: ", error);
      }
    };

    fetchMedicalData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Medical", id));
      setMedicalData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting medical data: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditedData(data);
    setEditId(data.id);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditedData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "Medical", editId), editedData);
      setEditedData({});
      setEditId(null);
    } catch (error) {
      console.error("Error updating medical data: ", error);
    }
  };

  return (
    <div>
      <h1>Medical Data</h1>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Medical Conditions</th>
            <th>Medications Prescribed</th>
            <th>Allergies</th>
            <th>Surgeries/Procedures</th>
            <th>Vaccination History</th>
            <th>Family Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalData.map((data) => (
            <tr key={data.id}>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.cnic}
                    onChange={(e) => handleChange(e, "cnic")}
                  />
                ) : (
                  data.cnic
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.medicalConditions}
                    onChange={(e) => handleChange(e, "medicalConditions")}
                  />
                ) : (
                  data.medicalConditions
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.medicationsPrescribed}
                    onChange={(e) => handleChange(e, "medicationsPrescribed")}
                  />
                ) : (
                  data.medicationsPrescribed
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.allergies}
                    onChange={(e) => handleChange(e, "allergies")}
                  />
                ) : (
                  data.allergies
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.surgeryDetails}
                    onChange={(e) => handleChange(e, "surgeryDetails")}
                  />
                ) : (
                  data.surgeryDetails
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.vaccinations.join(", ")}
                    onChange={(e) => handleChange(e, "vaccinations")}
                  />
                ) : (
                  data.vaccinations.join(", ")
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.familyMedicalHistory}
                    onChange={(e) => handleChange(e, "familyMedicalHistory")}
                  />
                ) : (
                  data.familyMedicalHistory
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMedical;
