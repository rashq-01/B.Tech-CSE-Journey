import { useState } from "react";

function Counter({msg}){
    const [count,setCount] = useState(0);

    return(
        <>
        <br /><br /><br />
        <h1>Message : {msg}</h1>
        <br /><br />
        <h1>Current Count : {count}</h1>

        <button onClick={()=>{
            setCount(count+1);
        }} >Increase</button>
        <br /><br />


        <button onClick={()=>{
            setCount(count-1);
        }} >Decrease</button>

        <br /> <br />

        <button onClick={()=>{
            setCount(0);
        }} >Reset</button>


        </>
    )
}

export default Counter;