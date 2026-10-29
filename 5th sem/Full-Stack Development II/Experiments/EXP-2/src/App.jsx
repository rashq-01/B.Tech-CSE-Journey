
import { useState, useEffect } from "react";

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div>
//       <h2>Users List</h2>

//       <ol>
//         {data.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ol>
//     </div>
//   );
// }

// export default App;

function App(){
  const [data , setData] = useState([]);

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err=>console.log(err))

  }, []);
  

  return(
    <div>
      <h2>User lists</h2>

      <ol>
        {data.map((user) => (<li key={user.id}>{user.name}</li>))}
      </ol>
    </div>
  );
}


export default App;