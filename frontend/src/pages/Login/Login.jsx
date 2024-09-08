import React, { useState } from "react";
import style from "./Login.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (details.email === "" && details.password === "") {
      setError("Enter your email and password");
      return;
    } else if (details.email === "" && details.password !== "") {
      setError("Enter your email first");
      return;
    } else if (details.email !== "" && details.password === "") {
      setError("Enter your password first");
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const userData = {
      email: details.email,
      password: details.password,
    };
    axios
      .post("/api/user/login", userData, config)
      .then((res) => {
        console.log(res.data.token);
        if (res.data.message === "Invalid Email or password") {
          setError("Invalid Email or password");
          return;
        } else if (res.data.token) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Navbar />
      <div className={style.outerDivLogin}>
        <div className={style.loginParent}>
          <h2>Login</h2>
          <div className={style.loginForm}>
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
            <p className={style.error}>{error}</p>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <div className={style.loginFooter}>
              <p>
                Don't have an account?{" "}
                <Link className={style.redirectSignUp} to="/signup">
                  SignUp
                </Link>
              </p>
              <button className={style.googleBtn}>Login with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
