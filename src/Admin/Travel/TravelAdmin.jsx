import React, { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx"; // Adjust the path as per your file

function TravelAdmin() {
  const [travelData, setTravelData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Fetch travel data from Firestore when component mounts
    const fetchTravelData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Travel"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setTravelData(data);
      } catch (error) {
        console.error("Error fetching travel data: ", error);
      }
    };

    fetchTravelData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Travel", id));
      setTravelData(travelData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, "Travel", editId), editData);
      setEditId(null);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div>
      <div className="admin-container">
        <h2>Travel</h2>
        <div className="travel-data-container">
          <table>
            <thead>
              <tr>
                <th>Travel ID</th>
                <th>CNIC</th>
                <th>Destination</th>
                <th>Travel Date</th>
                <th>Purpose</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {travelData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>
                    {editId === data.id ? (
                      <input
                        type="text"
                        name="cnic"
                        value={editData.cnic}
                        onChange={handleInputChange}
                      />
                    ) : (
                      data.cnic
                    )}
                  </td>
                  <td>
                    {editId === data.id ? (
                      <input
                        type="text"
                        name="destination"
                        value={editData.destination}
                        onChange={handleInputChange}
                      />
                    ) : (
                      data.destination
                    )}
                  </td>
                  <td>
                    {editId === data.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleInputChange}
                      />
                    ) : (
                      data.date
                    )}
                  </td>
                  <td>
                    {editId === data.id ? (
                      <input
                        type="text"
                        name="purpose"
                        value={editData.purpose}
                        onChange={handleInputChange}
                      />
                    ) : (
                      data.purpose
                    )}
                  </td>
                  <td>
                    {editId === data.id ? (
                      <button onClick={handleSaveEdit}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(data)}>Edit</button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TravelAdmin;
