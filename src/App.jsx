import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login/Login";
import Education from "./Departments/Education/Education";
import Forgot from "./Registration/Forgot/Forgot";
import Registration from "./Registration/Registration";
import NewRegistration from "./Registration/Reg/Registration";
import RegistrationData from "./Admin/RegistrationData";
import Nic from "./Registration/NicReg/NicReg";
import NicApprove from "./Admin/NicApprove";
import CheckNic from "./Registration/CheckNic";
import Empolyemnet from "./Departments/Employment/EmploymentForm";
import Marriage from "./Departments/Marriage/MarriageForm";
import Medical from "./Departments/MedicalHistory/MedicalHistory";
import TravelForm from "./Departments/Travel/Travel";
import InsuranceForm from "./Departments/Insurence/Insurence";
import AdminPanelMarrige from "./Admin/MarrigeAdmin/AdminPanelMarrige";
import AdminPanelMedical from "./Admin/MedicalAdmin/AdminPanelMedical";
import Dashboard from "./Dashboard/Dashboard";
import UserData from "./Admin/AllData/Data";
import Admin from "./Admin/Admin";
import Home from "./Home/Home";
import About from "./Common/About";
import Contact from "./Common/Contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Your authentication logic here
    if (username === "admin" && password === "savera") {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/userData" element={<UserData />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/education" element={<Education />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/new" element={<NewRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nic" element={<Nic />} />

        <Route path="/check-nic" element={<CheckNic />} />
        <Route path="/employment" element={<Empolyemnet />} />
        <Route path="/marriage" element={<Marriage />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/travel" element={<TravelForm />} />
        <Route path="/insurance" element={<InsuranceForm />} />
        <Route
          path="/admin-panel-marriage"
          element={isLoggedIn ? <AdminPanelMarrige /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-panel-medical"
          element={isLoggedIn ? <AdminPanelMedical /> : <Navigate to="/" />}
        />
        <Route
          path="/user-data"
          element={isLoggedIn ? <UserData /> : <Navigate to="/" />}
        />
        <Route
          path="/registration-data"
          element={isLoggedIn ? <RegistrationData /> : <Navigate to="/" />}
        />
        <Route
          path="/nic-approve"
          element={isLoggedIn ? <NicApprove /> : <Navigate to="/" />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
