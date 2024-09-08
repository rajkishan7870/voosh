import React from 'react'
import style from './Navbar.module.css'
import { MdOutlineEventNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    navigate("/")
  }

  const handleLogin = ()=>{
    navigate("/")
  }

  const handleSignup = ()=>{
    navigate("/signup")
  }

  return (
    <div className={style.parentDiv}>
      <div><MdOutlineEventNote className={style.eventIcon}/></div>
      {props.home ? <div className={style.btnParent}>
        <button className={style.button} onClick={handleLogout}>Log Out</button>
      </div>
      :<div className={style.btnParent}>
        <button className={style.button} onClick={handleLogin}>Login</button>
        <button className={style.button} onClick={handleSignup}>SignUp</button>
      </div>
}
    </div>
  )
}
