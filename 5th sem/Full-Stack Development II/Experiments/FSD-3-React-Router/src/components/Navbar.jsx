import {Link} from 'react-router-dom'

function Navbar(){
    return (
        <nav>
            <Link to="/home">Home</Link>{" | "}
            <Link to="/student">Student</Link>{" | "}
            <Link to="/about">About</Link>{" | "}
            <Link to="/contact">Contact</Link>{" | "}
        </nav>
    );
}

export default Navbar;