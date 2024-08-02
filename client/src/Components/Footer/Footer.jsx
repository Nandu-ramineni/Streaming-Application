
import { FaInstagram, FaYoutube, FaFacebook , } from "react-icons/fa";
import { GooglePlayButton, AppStoreButton } from "react-mobile-app-button";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'
import { useEffect, useState } from "react";
import { getVideos } from "../../Services/api";
const Footer = () => {
    const [movies,setMovies] = useState([]);
    const fetchmovies = async() => {
        try {
            const response = await getVideos();
            setMovies(response.data.splice(0,5));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchmovies();
    },[])
    return (
        <footer className="w-full bg-[#161b27] text-white p-4">
            <div className="flex flex-col md:flex-row justify-around items-center gap-4 py-4 border-b border-gray-700">
                <div className="mb-8 md:mb-0">
                <Link to="/" className="flex  items-center">
                    <img src={Logo} alt="logo" className="w-16 h-16" />
                    <p>Enjoyo</p>
                </Link>
                <p className="text-sm">Unlimited Entertainment</p>
                <p className=" font-normal py-1">Enjoyio Pvt ltd.</p>
                <h2>Connect with Us</h2>
                <div className="flex  items-start gap-4 mt-4 text-2xl text-[#8EC44C]">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500"><FaInstagram /></a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500"><FaFacebook /></a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500"><FaYoutube /></a>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
                    <div>
                        <h4 className="font-bold mb-4">Top Movies</h4>
                        <ul>
                            {movies && movies.map((movie) => (
                                <li key={movie._id} className="mb-2"><Link to={`/video/${movie._id}`} className="hover:text-green-500">{movie.title}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">CATEGORIES</h4>
                        <ul>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Movies</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Web Series</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Shows</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Dramas</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Others</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">MY ACCOUNT</h4>
                        <ul>
                            <li className="mb-2"><Link to='/profile' className="hover:text-green-500">Account</Link></li>
                            <li className="mb-2"><Link to='/profile' className="hover:text-green-500">Subscription</Link></li>
                            <li className="mb-2"><Link to='/profile' className="hover:text-green-500">Profile</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    <div className="flex flex-col items-center gap-4">
                        <div className="mb-2">
                            <GooglePlayButton className="bg-white text-black text-xs py-5 mb-2" height={60} direction={"row"} width={200} />
                        </div>
                        <div className="mb-2">
                            <AppStoreButton className="bg-white text-black" height={60} direction={"row"} width={200} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around items-center md:flex-row">
                <div>
                    <p className="font-medium pt-2">&copy; {new Date().getFullYear()} Enjoyio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
