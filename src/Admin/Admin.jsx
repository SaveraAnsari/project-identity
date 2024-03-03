import React, { useState } from "react";
import RegistrationData from "./RegistrationData";
import UserData from "./AllData/Data";
import AdminPanelMedical from "./MedicalAdmin/AdminPanelMedical";
import AdminPanelMarrige from "./MarrigeAdmin/AdminPanelMarrige";
import NicApprove from "./NicApprove";
import EmploymentDataTable from "./Employment/Employmentadmin";
import InsuranceDataTable from "./Insurence/Insurence";
import AdminEducation from "./Education/AdminEducation";
import TravelDataDisplay from "./Travel/TravelAdmin";
import Nav from "../Dashboard/Navbar";
import Footer from "../Common/Footer";
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "savera") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome Admin</h1>
          <AdminNavbar onLogout={handleLogout} />
          <NicApprove />
          <br />
          <RegistrationData />
          <br />
          <AdminPanelMarrige />
          <br />
          <AdminPanelMedical />
          <br />
          <EmploymentDataTable />
          <br />
          <InsuranceDataTable />
          <br />
          <AdminEducation />s
          <br />
          <TravelDataDisplay />
          <br />
          <br />
        </div>
      ) : (
        <div>
          <Nav />
          <div className="LoginForm">
            <h2>Admin Login</h2>
            <div className="marriage-form">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleLogin}>Login</button>
              {error && <div>{error}</div>}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

function AdminNavbar({ onLogout }) {
  return (
    <nav>
      <ul>
        <li
          onClick={onLogout}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "38px",
            marginLeft: "1300px",
          }}
        >
          Sign Out
        </li>
      </ul>
    </nav>
  );
}

export default Admin;
