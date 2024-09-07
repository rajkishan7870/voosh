import React, {useState, useEffect, useMemo} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import style from './Home.module.css'
import Card from '../../components/Card/Card';
import Addtask from '../../components/Addtask.jsx/Addtask';
import axios from 'axios';

export default function Home() {
  const [addTask, setAddTask] = useState(false)
  const [allTodo, setAllTodo] = useState()
  const [cardChange, setCardChange] = useState(false)

  useEffect(()=>{
    const fetchTasks = async () => {
      try {
        // Fetch all TODO tasks
        const todoRes = await axios.get("/api/interaction/alltodo");
        setAllTodo(todoRes.data);

        // Fetch in-progress tasks
        const inProgressRes = await axios.get("/api/interaction/allInProgress");
        console.log(inProgressRes);

        // Fetch done tasks
        const doneRes = await axios.get("/api/interaction/allDone");
        console.log(doneRes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks(); 
  }, [addTask, cardChange])

  const handleAddTask = (data) =>{
    setAddTask(true)
    setAddTask(data)
  }

  const handleCardChange = () =>{
    setCardChange((prev) => !prev)
  }

  return (
    <div>
      <Navbar/>
      <div className={style.homeParent}>
        {addTask? <Addtask handleaddtask = {handleAddTask}/> :<button onClick={handleAddTask}>Add Task</button>}
        <div className={style.searchParent}>
          <div>Search : <input placeholder='search' /></div>
          <div>Sort By : Recent</div>
        </div>
        <div className={style.cardParent}>
          <Card handleCardChange = {handleCardChange} name = "TODO" task = {allTodo}/>
          <Card handleCardChange = {handleCardChange} name = "IN PROGRESS"/>
          <Card handleCardChange = {handleCardChange} name = "DONE"/>
        </div>
      </div>
    </div>
  )
}
