import React from 'react'
import style from './Signup.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div >
      <Navbar />
      <div className={style.outerDivSignup}>
        <div className={style.signupParent}>
          <h2>Signup</h2>
          <div className={style.signupForm}>
            <input placeholder="First Name" required />
            <input placeholder="Last Name" required />
            <input placeholder="Email" required />
            <input placeholder="Password" required />
            <input placeholder="Confirm Password" required />
            <button>SignUp</button>
            <div className={style.signupFooter}>
              <p>Already have an account? <Link className={style.redirectLogin} to= "/login">Login</Link></p>
              <button className={style.googleBtn}>Signup with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
