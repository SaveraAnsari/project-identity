import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/Firebase"; // Adjust the path as per your file structure

function RegistrationData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Registration"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, "Registration", userId));
      setUserData(userData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h1>User Registration Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>NIC Number</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.nicNo}</td>
              <td>{user.psw}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationData;
