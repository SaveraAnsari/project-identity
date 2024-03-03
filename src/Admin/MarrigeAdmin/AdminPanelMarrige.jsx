import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function AdminPanelMarriage() {
  const [marriageData, setMarriageData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({
    husbandName: "",
    husbandCnic: "",
    brideName: "",
    brideCnic: "",
    marriageDate: "",
    marriageCertificateImage: null,
  });

  useEffect(() => {
    // Fetch marriage data from Firestore when component mounts
    const fetchMarriageData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Marriage"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setMarriageData(data);
      } catch (error) {
        console.error("Error fetching marriage data: ", error);
      }
    };

    fetchMarriageData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Marriage", id));
      setMarriageData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting marriage data: ", error);
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
      await updateDoc(doc(db, "Marriage", editId), editedData);
      setEditedData({
        husbandName: "",
        husbandCnic: "",
        brideName: "",
        brideCnic: "",
        marriageDate: "",
        marriageCertificateImage: null,
      });
      setEditId(null);
    } catch (error) {
      console.error("Error updating marriage data: ", error);
    }
  };

  return (
    <div>
      <h1>Marriage Data</h1>
      <table>
        <thead>
          <tr>
            <th>Husband Name</th>
            <th>Husband CNIC</th>
            <th>Bride Name</th>
            <th>Bride CNIC</th>
            <th>Marriage Date</th>
            <th>Marriage Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marriageData.map((data) => (
            <tr key={data.id}>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.husbandName}
                    onChange={(e) => handleChange(e, "husbandName")}
                  />
                ) : (
                  data.husbandName
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.husbandCnic}
                    onChange={(e) => handleChange(e, "husbandCnic")}
                  />
                ) : (
                  data.husbandCnic
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.brideName}
                    onChange={(e) => handleChange(e, "brideName")}
                  />
                ) : (
                  data.brideName
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    value={editedData.brideCnic}
                    onChange={(e) => handleChange(e, "brideCnic")}
                  />
                ) : (
                  data.brideCnic
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    type="date"
                    value={editedData.marriageDate}
                    onChange={(e) => handleChange(e, "marriageDate")}
                  />
                ) : (
                  data.marriageDate
                )}
              </td>
              <td>marriageCertificateImage not found</td>
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

export default AdminPanelMarriage;
