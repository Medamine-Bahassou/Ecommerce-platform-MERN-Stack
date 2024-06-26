import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice'
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    console.log(userData)
    const handeShowMenu = () => {
        setShowMenu(prev => !prev)
    }
    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Logout successfully")
    }

    return (
        <div>
            <header className='fixed shadow w-full h-16 md:px-4 z-50 bg-white'>
                {/* desktop  */}
                <div className='flex items-center h-full justify-between'>
                    <Link to={""}>
                        <div className='h-10'>
                            <img src={logo} className='h-full' />
                        </div>
                    </Link>
                    <div className=' flex items-center gap-4 md:gap-7'>
                        <nav className='flex gap-4 md:gap-7 text-base md:text-lg'>
                            <Link to={""}>Home</Link>
                            <Link to={"menu"}>Menu</Link>
                            <Link to={"about"}>About</Link>
                            <Link to={"contact"}>Contact</Link>
                        </nav>
                        <div className='text-2xl text-slate-600 relative'>
                            <FaShoppingCart />
                            <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>0</div>
                        </div>
                        <div className='text-slate-600 '>
                            <div className='text-3xl cursor-pointer w-8 h-8  rounded-full overflow-hidden shadow drop-shadow-md ' onClick={handeShowMenu}>
                                {userData.image ? <img src={userData.image} className='h-full w-full' /> : <FaRegUserCircle />}
                            </div>
                            {showMenu && (
                                <div className='absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col '>
                                    <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer px-2'>New product</Link>
                                    {
                                        userData.image ? <p className='cursor-pointer text-white px-2 bg-red-500' onClick={handleLogout}>Logout</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>

                                    }
                                </div>
                            )}
                        </div>
                    </div>

                </div>



                {/* mobile */}
            </header>
        </div>
    )
}

export default Header
