import React from 'react'
import style from './Navbar.module.css'
import { MdOutlineEventNote } from "react-icons/md";

export default function Navbar() {
  return (
    <div className={style.parentDiv}>
      <div><MdOutlineEventNote className={style.eventIcon}/></div>
      <div className={style.btnParent}>
        <button className={style.button}>Login</button>
        <button className={style.button}>SignUp</button>
      </div>
    </div>
  )
}
