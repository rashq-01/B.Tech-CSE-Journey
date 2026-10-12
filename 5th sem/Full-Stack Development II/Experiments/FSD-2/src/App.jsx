import './App.css';
import { Component } from "react";
import { useState } from "react";


function Message(){
  return <h2 className="header">Welcome to React!</h2>
}


function App(){
  const [name , setName] = useState("");
  const [count , setCount] = useState(0);
  const [show , setShow] = useState(false);
  let Name = "Rajesh"
  let Course = "B.Tech"

  return(
    <div>
      <h1>React form</h1>

      <input 
      type="text" 
      placeholder="Enter you username"
      value={name}
      onChange={(event)=>setName(event.target.value)}
      />
      <h2>username : {name}</h2>



      <br />
      <br />
      <h1>React-Counter</h1>
      <h2>Current Count : {count}</h2>
      <button onClick={()=>setCount(count+1)}>Increase</button><br />
      <button onClick={()=>setCount(count-1)}>Decrease</button><br />
      <button onClick={()=>setCount(0)}>Reset</button>


      <br /><br />
      <h1>Handling the Button click events</h1>

      <button onClick={()=>alert("Button was clicked.")}>Click</button>

      <br /><br />

    
      <h1>Conditional Render </h1>
      {show && <Message/>}
      <button onClick={()=>setShow(!show)}>{show ? "Hide" : "Show"}</button>

       <br /><br />

       <h1>String Literals</h1>
       <h2>Hi {Name}!</h2>
       <h2>Welcome to {Course}</h2>
    </div>
  );
}


export default App;

/*
Write a React program to implement a counter  button by using react-class component


2. b) Write a React program to implement a counter button by using functional component

2 c) Write a React program to handle button click events in function components
2 d) WARP to conditionally render a component in the browser
2 e) WARP to render string laterals

*/