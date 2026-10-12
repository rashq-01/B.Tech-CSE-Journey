import { useState } from "react";
import Student from "./components/Student";
import Teacher from "./components/Teacher";

function App(){
  const students = ["Madhu" , "Rahul" , "Priya" , "Anil"];
  
  return(
    <div>
      <h2>Student Lists : </h2>
      <ul>
        {students.map((student,idx)=>(<li key={idx}>{student}</li>
      ))}
      </ul>
    </div>
  );
}


export default App;



/*
1.Write a React Program with two react components sharing the data


3d) WRP to implement forms in React

3.e) WARP to implement the iterative using map function
*/

