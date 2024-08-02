import { Link } from "react-router-dom"
import {  IoSettingsOutline} from "react-icons/io5";
import { BiHomeCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoFilmOutline } from "react-icons/io5";
import Logo from '../../assets/logo.png'
import { PiFilmReelLight } from "react-icons/pi";
import { MdSubscriptions,MdNotifications } from "react-icons/md";
import image from  '../../assets/img.png'
const Sidebar = () => {
    return (
        <div className="navbar-container w-52  h-[100vh] shadow-lg rounded-tr-2xl rounded-br-2xl pl-[-4rem] overflow-hidden">
            <Link to='/' className="flex justify-center items-center gap-1 text-[#8EC44C] pt-6">
                <img src={Logo} alt="logo" className="w-10 h-10"/>
                <h2 className="text-2xl font-medium pt-1">enjoyio</h2>
            </Link>
            <div className="block justify-start items-center pt-12">
                <nav className="w-full flex justify-center">
                    <ul className="flex flex-col justify-start items-start">
                        <Link to='/' className="text-white text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#8EC44C]">
                            <BiHomeCircle />Home
                        </Link>
                        <Link to='/users' className="text-white text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#8EC44C]">
                            <FiUsers />Users
                        </Link>
                        <Link to='/stream' className="text-white text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <PiFilmReelLight /> Movies
                        </Link>
                        <Link to='/upload' className="text-white text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <IoFilmOutline /> Add Movies
                        </Link>
                        <Link to='/subscriptions' className="text-white text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <MdSubscriptions /> Subscriptions
                        </Link>
                        <Link to='/notifications' className="text-white text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <MdNotifications /> Notifications
                        </Link>
                        <Link to='/settings' className="text-white text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <IoSettingsOutline />Settings
                        </Link>
                    </ul>
                </nav>
            </div> <br /> <br /> 
            
            <img src={image} alt="img" className="translate-y-8 "/>
            <div className="text-center   w-40 rounded-tr-2xl rounded-br-2xl h-44 mt-[-2rem] pt-12 pb-6">
                <p className="pt-4 text-white">Share Your Own  <br /><span>Movie</span></p>
                <button className="bg-[#85BC3A] text-white flex justify-center mx-auto py-2 px-4 rounded-md mb-6 mt-2" >Upload Now </button>
            </div>
            
        </div>
    )
}

export default Sidebar
