import React, { useState, useEffect } from "react";
import { db } from "../../Config/Firebase.jsx";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

function AdminEducation() {
  const [educationData, setEducationData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    cnic: "",
    degreeName: "",
    instituteName: "",
    duration: "",
    startDate: "",
    status: "",
    cgpaPercentage: ""
  });

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Education"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setEducationData(data);
      } catch (error) {
        console.error("Error fetching Education data: ", error);
      }
    };

    fetchEducationData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Education", id));
      const updatedData = educationData.filter((item) => item.id !== id);
      setEducationData(updatedData);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const selectedData = educationData[index];
    setEditedData(selectedData);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "Education", editedData.id), editedData);
      const updatedData = [...educationData];
      updatedData[editIndex] = editedData;
      setEducationData(updatedData);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="admin-education">
      <h1>Education Details</h1>
      <table>
        <thead>
          <tr>
            <th>Cnic</th>
            <th>Degree Name</th>
            <th>Institute Name</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>CGPA/Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educationData.map((item, index) => (
            <tr key={item.id}>
              <td>{editIndex === index ? (
                <input type="text" name="cnic" value={editedData.cnic} onChange={handleChange} />
              ) : (
                item.cnic
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="degreeName" value={editedData.degreeName} onChange={handleChange} />
              ) : (
                item.degreeName
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="instituteName" value={editedData.instituteName} onChange={handleChange} />
              ) : (
                item.instituteName
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="duration" value={editedData.duration} onChange={handleChange} />
              ) : (
                item.duration
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="startDate" value={editedData.startDate} onChange={handleChange} />
              ) : (
                item.startDate
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="status" value={editedData.status} onChange={handleChange} />
              ) : (
                item.status
              )}</td>
              <td>{editIndex === index ? (
                <input type="text" name="cgpaPercentage" value={editedData.cgpaPercentage} onChange={handleChange} />
              ) : (
                item.cgpaPercentage
              )}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEducation;
