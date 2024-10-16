import "./Sidebar.css"
import {Link} from "react-router-dom"
import { assets } from "../assets/assets"
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <Link to='/add'>
           <img src={assets.add_icon} alt=""/>
            <p>Add Items</p>
        </Link>
        <Link to='/list'>
            <img src={assets.list_icon} alt=""/>
            <p>List Items</p>
        </Link>
        <Link to='/order'>
           <img src={assets.list_icon} alt=""/>
           <p>Order Items</p>
        </Link>

      </div>
    </div>
  )
}

export default Sidebar