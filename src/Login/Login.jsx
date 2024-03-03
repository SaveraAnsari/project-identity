import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../Config/Firebase";
import "./login.css";
import HomeNav from "../Home/HomeNav";
import Footer from "../Common/Footer";

async function getRegistrationData(uid) {
  try {
    const docRef = doc(db, "Registration", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, retrieve data
      const userData = docSnap.data();
      // console.log(userData);
      console.log(userData);
      if (userData) {
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        alert("NO data found");
      }
    } else {
      // Document does not exist
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    // Handle error if necessary
  }
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // console.log(q);
          alert("Sign in successful!");
          window.location.href = "/dashboard";
          getRegistrationData(user.uid);
          // history.push("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            console.log("YES");
            alert("Invalid Email OR password");
          }
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  // Clear error state when input fields change
  const handleInputChange = (e) => {
    setError(""); // Clear any previous error message
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <HomeNav />
      <div className="LoginForm">
        <h1>Login</h1>
        <div className="b1">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              title="Email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="linkk">
              Login
            </button>
            {error && <p className="error">{error}</p>}
            {/* <br />
            <button
              onClick={alert(
                "You Should Contact To Admin Email is saveraansari0@gmail.com"
              )}
            >
            
              Forgot password
            </button> */}
            <button
              onClick={() =>
                alert(
                  "You Should Contact To Admin Email is saveraansari0@gmail.com"
                )
              }
            >
              Forgot password
            </button>

            <br />
            <button>
              <Link to="/Registration" className="linkk">
                Don't Have Account
              </Link>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
  ri;
};

export default Login;
