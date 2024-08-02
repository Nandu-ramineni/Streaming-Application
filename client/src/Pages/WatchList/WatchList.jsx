import { useEffect, useState } from "react";
import { getWatchList, deleteWatchList } from "../../Services/api";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WatchList = () => {
    const [watchList, setWatchList] = useState([]);
    const navigate = useNavigate();

    const fetchWatchList = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token'); 
            if (userId) {
                const response = await getWatchList(userId, token);
                setWatchList(response.data.watchList);
            } else {
                console.log('User ID not found in local storage');
            }
        } catch (error) {
            console.log('Error while fetching watchlist ', error);
        }
    };

    const handleDeleteWatchlist = async (videoId) => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token'); 
            if (userId) {
                await deleteWatchList(userId, videoId, token);
                toast.success('Video removed from watchlist');
                fetchWatchList();
            } else {
                console.log('User ID not found in local storage');
            }
        } catch (error) {
            console.log('Error while deleting watchlist ', error);
            toast.error('Failed to remove video from watchlist');
        }
    };

    useEffect(() => {
        fetchWatchList();
    }, []);

    return (
        <div className="pt-20">
            <ToastContainer />
            <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-2 min-h-[50vh] mt-2">
                {watchList && watchList.length > 0 ? (
                    watchList.map((video) => (
                        <div key={video._id} className="relative w-full h-72 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100" style={{ borderRadius: '0.75rem' }}>
                            <img src={video.thumbnailUrl} alt="poster" className="w-full h-3/4 object-cover" style={{ borderRadius: '0.75rem', objectPosition: 'center 15%' }} onClick={() => navigate(`/video/${video._id}`)}/>
                            <button 
                                className="absolute top-2 right-6 bg-gray-800 text-white rounded-full p-1"
                                onClick={() => handleDeleteWatchlist(video._id)}
                            >
                                <FaTimes />
                            </button>
                            <h2 className="text-white text-center text-lg mt-2">{video.title}</h2>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center text-white text-center text-2xl">
                        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" alt="Not found" className="mb-4 w-52 h-52" />
                        <button onClick={() => navigate('/movies')} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 my-4">Add Movies</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default WatchList;
