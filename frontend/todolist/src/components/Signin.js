import React, { useState } from "react";

function Signin() {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const handleclick = async () => {
    const obj = await fetch("http://localhost:3001/signin", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Content type
        username: user,
        password: pass,
      },
    });
    const data = await obj.json();
    console.log(data);
  };
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <div>
        <h3>username:</h3>
        <input
          onChange={(ev) => {
            setuser(ev.target.value);
          }}
          type="text"
        ></input>
      </div>
      <div>
        <h3>password:</h3>
        <input
          onChange={(ev) => {
            setpass(ev.target.value);
          }}
          type="password"
        ></input>
      </div>
      <button onClick={handleclick}>Submit</button>
    </div>
  );
}

export default Signin;
