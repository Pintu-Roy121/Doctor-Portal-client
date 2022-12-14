import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthPorvider';
import { FaBars } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(result => {
                localStorage.removeItem('access-Token');
                alert('Logout Successful')
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>

        {
            user?.uid ?
                <>
                    <li><p>{user?.email}</p></li>
                    <li><p>{user?.displayName}</p></li>
                    <li><Link onClick={handleLogout} to="/login">Log Out</Link></li>
                </>
                :
                <li><Link to="/login">Login</Link></li>
        }
    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold"><span className='text-red-400'>D</span> octors <span className='text-red-400 ml-1'> Portal</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 font-semibold">
                    {menuItems}
                </ul>
            </div>
            <label tabIndex={2} className="btn btn-ghost lg:hidden" htmlFor="my-drawer-2">
                <FaBars className="h-5 w-5" />
            </label>

        </div>
    );
};

export default Navbar;