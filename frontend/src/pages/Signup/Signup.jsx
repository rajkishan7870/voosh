import React, { useState } from "react";
import style from "./Signup.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    console.log(details);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const userData = {
      fName: details.fName,
      lName: details.lName,
      email: details.email,
      password: details.password,
    };
    axios.post("/api/user/signup", userData, config).then((response) => {
      console.log(response.status);
    });
    navigate("/");
  }

  return (
    <div>
      <Navbar />
      <div className={style.outerDivSignup}>
        <div className={style.signupParent}>
          <h2>Signup</h2>
          <div className={style.signupForm}>
            <input
              placeholder="First Name"
              name="fName"
              onChange={(e) => {
                setDetails({ ...details, [e.target.name]: e.target.value });
              }}
              required
            />
            <input
              placeholder="Last Name"
              name="lName"
              onChange={(e) => {
                setDetails({ ...details, [e.target.name]: e.target.value });
              }}
              required
            />
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => {
                setDetails({ ...details, [e.target.name]: e.target.value });
              }}
              required
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => {
                setDetails({ ...details, [e.target.name]: e.target.value });
              }}
              required
            />
            <input
              placeholder="Confirm Password"
              type="password"
              name="cpassword"
              onChange={(e) => {
                setDetails({ ...details, [e.target.name]: e.target.value });
              }}
              required
            />
            <button type="submit" onClick={handleSubmit}>
              SignUp
            </button>
            <div className={style.signupFooter}>
              <p>
                Already have an account?{" "}
                <Link className={style.redirectLogin} to="/">
                  Login
                </Link>
              </p>
              <button className={style.googleBtn}>Signup with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
