
import {Navbar} from './components/Navbar'
function App(){


  return(
    <BrowserRouter>
    <Navbar/>

    <br />

    <Routes>
      <Route to='/home'></Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;

