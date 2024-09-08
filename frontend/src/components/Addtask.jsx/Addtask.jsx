import React, {useState} from "react";
import style from "./Addtask.module.css";
import axios  from "axios";

export default function Addtask(props) {
  const [addTitle, setAddTitle] = useState({
    title: "",
  });
  const handleAdd = () => {
    const data = {
      title: addTitle.title,
    };
    axios
        .post("/api/interaction/add", data)
        .then((res)=>{
            console.log(res)
            props.handleaddtask(prev=>!prev)
        })
        .catch(err=>console.log(err))
  };
  return (
    <div className={style.addTaskParent}>
      <input
        name="title"
        className={style.addTaskInput}
        placeholder="Add Task"
        onChange={(e) => {
          setAddTitle({ ...addTitle, [e.target.name]: e.target.value });
        }}
      />
      <button className={style.addTaskBtn} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
