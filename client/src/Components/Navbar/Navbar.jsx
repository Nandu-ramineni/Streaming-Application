import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import Logo from '../../assets/logo.png';
import CustomButtons from "./CustomButtons";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`flex justify-between items-center px-4 fixed w-full z-10 md:px-20 py-4 transition duration-300 ${scrollY > 100 ? 'bg-white bg-opacity-10 backdrop-blur-sm rounded-bl-3xl rounded-br-3xl' : 'bg-transparent'}`}>
            <div className="flex items-center gap-6">
                <Link to="/">
                    <h2 className="text-[#66BB6A] hover:scale-110 transition ease-in-out flex gap-2 items-center">
                        <img src={Logo} alt="logo" className="w-10 h-10" />
                        <span className="text-2xl text-white capitalize" style={{ fontFamily: '"Outfit", sans-serif' }}>enjoyio</span>
                    </h2>
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] px-1 py-2 rounded-md transition ease-in-out duration-300">
                    Home
                </Link>
                <Link to="/movies" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                    Movies
                </Link>
                <Link to="/series" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                    Series
                </Link>
                <Link to="/watch-list" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                    Watch list
                </Link>
            </div>
            <div className="hidden md:block">
                <CustomButtons />
            </div>
            <div className="md:hidden flex items-center gap-4 ml-auto ">
                <CustomButtons />
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl hover:text-[#66BB6A] transition ease-in-out duration-300">
                    {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white bg-opacity-10 backdrop-blur-sm shadow-md rounded-br-2xl rounded-bl-2xl md:hidden flex flex-col items-center gap-6 py-4">
                    <Link to="/" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <GoHome />Home
                    </Link>
                    <Link to="/movies" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <IoSearch />Movies
                    </Link>
                    <Link to="/series" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <BiSupport />Series
                    </Link>
                    <Link to="/watch-list" className="flex items-center gap-2 text-lg font-medium text-white hover:text-[#66BB6A] transition ease-in-out duration-300">
                        Watch list
                    </Link>
                </div>
            )}
        </div>

    );
};

export default Navbar;
