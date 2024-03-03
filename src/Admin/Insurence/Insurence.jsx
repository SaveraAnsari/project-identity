import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function InsuranceDataTable() {
  const [insuranceData, setInsuranceData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({
    cnic: "",
    insuranceType: "",
    insuranceStartDate: "",
    insuranceEndDate: "",
    insuranceCompany: "",
    insurancePolicyNumber: "",
    premiumAmount: "",
  });

  useEffect(() => {
    // Fetch insurance data from Firestore when component mounts
    const fetchInsuranceData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "insurence"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setInsuranceData(data);
      } catch (error) {
        console.error("Error fetching insurance data: ", error);
      }
    };

    fetchInsuranceData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "insurence", id));
      setInsuranceData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting insurance data: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditedData(data);
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
      await updateDoc(doc(db, "insurence", editId), editedData);
      setEditedData({
        cnic: "",
        insuranceType: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        insuranceCompany: "",
        insurancePolicyNumber: "",
        premiumAmount: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error updating insurance data: ", error);
    }
  };

  return (
    <div>
      <h1>Insurance Data</h1>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Insurance Type</th>
            <th>Insurance Start Date</th>
            <th>Insurance End Date</th>
            <th>Insurance Company</th>
            <th>Insurance Policy Number</th>
            <th>Premium Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.map((data) => (
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
                    value={editedData.insuranceType}
                    onChange={(e) => handleChange(e, "insuranceType")}
                  />
                ) : (
                  data.insuranceType
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="date"
                    value={editedData.insuranceStartDate}
                    onChange={(e) => handleChange(e, "insuranceStartDate")}
                  />
                ) : (
                  data.insuranceStartDate
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="date"
                    value={editedData.insuranceEndDate}
                    onChange={(e) => handleChange(e, "insuranceEndDate")}
                  />
                ) : (
                  data.insuranceEndDate
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.insuranceCompany}
                    onChange={(e) => handleChange(e, "insuranceCompany")}
                  />
                ) : (
                  data.insuranceCompany
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.insurancePolicyNumber}
                    onChange={(e) => handleChange(e, "insurancePolicyNumber")}
                  />
                ) : (
                  data.insurancePolicyNumber
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="number"
                    value={editedData.premiumAmount}
                    onChange={(e) => handleChange(e, "premiumAmount")}
                  />
                ) : (
                  data.premiumAmount
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <button onClick={handleSave}>Save</button>
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

export default InsuranceDataTable;
