import React, { useState, useEffect } from "react";
import style from "./Card.module.css";
import Task from "../Task/Task";

export default function Card(props) {

  return (
    <div
      className={style.cardParent}
      Card-name={props.name}  
    >
      <div className={style.cardName}>{props.name}</div>
      <div className={style.taskParent}>
        <Task
          handleTaskChange={props.handleCardChange}
          task={props.task}
        />
      </div>
    </div>
  );
}
