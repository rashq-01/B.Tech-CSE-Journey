import { useState } from "react";


function App(){
  const [count , setCount] = useState(0);

  return(
    <div>
      <h2>Counter : {count}</h2>
      <input type="number" name="cnt" id="cnt" />
      <button onClick={()=>{
        var val = Number(document.getElementById('cnt').value);
        setCount(count + val);
      }}>Increase</button>
    </div>
  );
}


export default App;

