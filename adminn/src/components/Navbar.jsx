import './Navbar.css';
import { assets } from '../assets/assets'; // Ensure the path to assets is correct

function Navbar({ setToken }) {
  const handleLogout = () => {
    // Clear the token (if stored in localStorage or context)
    setToken(''); // This will update the token state to empty
    localStorage.removeItem('token'); // Optionally, clear the token from localStorage
    // Optionally, redirect the user to the login page or another page
  };

  return (
    <div className='navbar'>
      <div className='nav-container'>
        <img src={assets.logo} alt="Logo" className='logo' />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
