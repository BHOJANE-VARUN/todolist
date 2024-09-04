import React, { useState } from 'react'

function TaskContainer({data}) {
    const [complete,setcomplete] = useState(data.completed);
    const handleclick = async ()=>{
      const url = "http://localhost:3001/mytasks/" + data._id;
        const raw = await fetch(url,{
          method: "POST", 
          headers:{
            "authication":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlwidmFydW5iXCIiLCJwYXNzd29yZCI6IlwiMTI0NDIxXCIiLCJpYXQiOjE3MjUyNzM4MjF9.9ncpIQLD_XjyILa8xv3EL2qE79xudWeZqAJGUjx4YXc",
          }
        })
        setcomplete(!complete);
    } 
  return (
    <div className='indtask'>
        <span>{data.description}</span>
        <button onClick={handleclick}>{complete?"Completed":"Pending"}</button>
    </div>
  )
}

export default TaskContainer