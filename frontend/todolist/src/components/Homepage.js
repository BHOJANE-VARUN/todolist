import React, { useRef, useState } from "react";
import TaskContainer from "./TaskContainer";

function Homepage() {
//   const [task, setask] = useState("");
  const task = useRef(null);
  const [tasks,settasks] = useState([]);
  const getdata = async ()=>{
    const raw = await fetch("http://localhost:3001/mytasks",{
        headers:{
            "authication":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlwidmFydW5iXCIiLCJwYXNzd29yZCI6IlwiMTI0NDIxXCIiLCJpYXQiOjE3MjUyNzM4MjF9.9ncpIQLD_XjyILa8xv3EL2qE79xudWeZqAJGUjx4YXc",
        }
    });
    const data = await raw.json();
    settasks(data)
  }
  const headlclick = async () => {
    const obj = await fetch("http://localhost:3001/puttasks", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Content type
        "authication":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlwidmFydW5iXCIiLCJwYXNzd29yZCI6IlwiMTI0NDIxXCIiLCJpYXQiOjE3MjUzNjE5OTN9.ryxz6jB9PvXDQwfg53QoP6Y3nvTKMbDsBbvza_IrVGs"
      },
      body: JSON.stringify({
        description:task.current.value
      })
    });
    const data = await obj.text();
    task.current.value = "";
  };
  return (
    <div className="formcont">
      <div className="taskinput">
        <span>Task: </span>
        <input
          type="text"
          className="inputtext"
          ref={task}
        ></input>
        <button onClick={headlclick}>Add task</button>
      </div>
      <div className="taskscont">
      <button onClick={getdata}>Get Tasks</button>
      
        {tasks.map((t)=> <TaskContainer data={t} key={t._id}/>)}
      </div>
    </div>
  );
}

export default Homepage;
