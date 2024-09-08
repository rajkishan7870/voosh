import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Home.module.css";
import Card from "../../components/Card/Card";
import Addtask from "../../components/Addtask.jsx/Addtask";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { interaction_data } from "../../Recoil/interaction";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [addTask, setAddTask] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [allInProgress, setAllInProgress] = useState([]);
  const [allDone, setAllDone] = useState([]);
  const [cardChange, setCardChange] = useState(false);
  const interactionDataFromAtom = useRecoilValue(interaction_data);
  const [dnd, setDnd] = useState(false)
  const navigate = useNavigate()

  let cookies = document.cookie;


  useEffect(()=>{
    if (!cookies) {
      navigate("/");
      return;
    }
  })

  useEffect(() => {
    // Fetch all TODO tasks
    axios
      .get("/api/interaction/alltodo")
      .then((res) => {
        console.log(res);
        if(res.data.length >0){
          setAllTodo(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, [addTask, cardChange, dnd]);

  useEffect(() => {
    // Fetch all InProgress tasks
    axios
      .get("/api/interaction/allInProgress")
      .then((res) => {
        console.log(res);
        if(res.data.length >0){
          setAllInProgress(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, [addTask, cardChange, dnd]);

  useEffect(() => {
    // Fetch all Done tasks
    axios
      .get("/api/interaction/allDone")
      .then((res) => {
        console.log(res);
        if(res.data.length >0){
          setAllDone(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, [addTask, cardChange, dnd]);

  const handleAddTask = (data) => {
    setAddTask(true);
    setAddTask(data);
  };

  const handleCardChange = () => {
    setCardChange((prev) => !prev);
  };

  const handleDragAndDrop = (dropping_status) => {
    const data = {
      _id: interactionDataFromAtom?.id,
      card: dropping_status,
    };
    axios
      .patch("/api/interaction/drag", data)
      .then((res) => {
        console.log(res);
        setDnd(!dnd)
      })
      .catch((err) => console.log(err));
  };

  const handleOnDrop = (e) => {
    const dropping_status = e.target.getAttribute("card-name");
    if (dropping_status === "TODO") {
      handleDragAndDrop("TODO");
    } else if (dropping_status === "IN PROGRESS") {
      handleDragAndDrop("IN PROGRESS");
    } else if (dropping_status === "DONE") {
      handleDragAndDrop("DONE");
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar home="Home"/>
      <div className={style.homeParent}>
        {addTask ? (
          <Addtask handleaddtask={handleAddTask} />
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
        <div className={style.searchParent}>
          <div>
            Search : <input placeholder="search" />
          </div>
          <div>Sort By : Recent</div>
        </div>
        <div
          className={style.cardParent}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <Card
            handleCardChange={handleCardChange}
            name="TODO"
            task={allTodo}
          />
          <Card
            handleCardChange={handleCardChange}
            name="IN PROGRESS"
            task={allInProgress}
          />
          <Card
            handleCardChange={handleCardChange}
            name="DONE"
            task={allDone}
          />
        </div>
      </div>
    </div>
  );
}
