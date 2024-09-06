import React from "react";
import style from "./Login.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div >
      <Navbar />
      <div className={style.outerDivLogin}>
        <div className={style.loginParent}>
          <h2>Login</h2>
          <div className={style.loginForm}>
            <input placeholder="Email" required />
            <input placeholder="Password" required />
            <button>Login</button>
            <div className={style.loginFooter}>
              <p>Don't have an account? <Link className={style.redirectSignUp} to= "/signup">SignUp</Link></p>
              <button className={style.googleBtn}>Login with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
