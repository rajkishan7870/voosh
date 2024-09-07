import React from "react";
import style from "./Task.module.css";
import axios from "axios";

export default function Task(props) {

  const handleDelete = (data) => {
    axios
      .delete("/api/interaction/del", {data})
      .then((res) => {
        console.log(res);
        props.handleTaskChange()
      })
      .catch((err) => console.log(err));

    
  };

  const handleEdit = (index) => {
    console.log(index);
  };

  const handleViewDetails = (index) => {
    console.log(index);
  };

  return (
    <>
      {props.task &&
        props.task.map((ele, index) => {
          return (
            <div className={style.taskParent} key={index}>
              <h2>{ele.title}</h2>
              <div className={style.descDiv}>{ele.description}</div>
              <div>Created at: {ele.createdAt}</div>
              <div className={style.btnColl}>
                <button
                  className={style.delBtn}
                  onClick={() => handleDelete(ele)}
                >
                  Delete
                </button>
                <button
                  className={style.editBtn}
                  onClick={() => handleEdit(ele)}
                >
                  Edit
                </button>
                <button
                  className={style.viewBtn}
                  onClick={() => handleViewDetails(ele)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}
