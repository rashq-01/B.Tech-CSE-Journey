import { useState } from "react";

function App(){
  const [name , setName] = useState("");


  const handleSubmit = (event)=>{
    event.preventDefault();
    alert("Hello " + name);
  }


  return(
    <div>
      <h2>Student From</h2>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input 
        type="text"  
        value={name} 
        onChange={(event) => {

          setName(event.target.value)
        }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default App;

// import React, {useEffect , useState} from "react";

// function App(){
//   const [users , setUsers] = useState([]);

//   useEffect(()=>{
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response)=>response.json)
//     .then((data)=>setUsers(data));
//   }, []);

//   return(
//     <div>
//       <h2>User List</h2>

//       {users.map((user)=>(<p key={user.id}>{user.name}</p>
//     ))}
//     </div>
//   );
// }


// export default App;







// import UserProfile from "./components/UserProfile";
// import Counter from "./components/Counter";
// function App(){
//   return(
//     <div className="App">
//      <Counter msg="Rajesh"/>
//     </div>
//   );
// }

// export default App;



/*
It is also used for side effects.
it is used for timers, updating profile, fetching api, subscriptions, working with external systems


SYNTAX  

 useEffect(()=>{
  //API Call
  },[]);


Fetch is used for get,post or update the data through the API or an link and we get the response from the server in a JSON format and we need to structure the data for our usage

Map function is used to map the data of the users by key value pairs

react forms are used to collect user inputs.
Forms are commonly used by state and event handlers
A controlled input is an input whose values are controlled by react state
*/