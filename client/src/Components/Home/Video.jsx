import { useEffect, useRef, useState } from "react";
import { addToWatchList, API_URL, getSubscriptions, getVideoById } from "../../Services/api";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LatestReleases from "./LatestReleases";

const Video = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null); 
    const [showPlayer, setShowPlayer] = useState(false); 
    const videoRef = useRef(null);
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false); // State to manage share modal visibility

    const fetchMovie = async () => {
        try {
            const response = await getVideoById(id);
            setVideo(response.data);
        } catch (error) {
            console.log('Error while calling getVideoById API ', error);
        }
    };

    const fetchSubscriptions = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await getSubscriptions(userId);
                const subscriptions = response.data; 
                setHasActiveSubscription(subscriptions);
            } else {
                console.log('User ID not found in cookies');
            }
        } catch (error) {
            console.log('Error while calling getSubscriptions API ', error);
        }
    };
    const handleAddToWatchlist = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                await addToWatchList({ userId, videoId: video._id });
                toast.success('Video added to watchlist');
            } catch (error) {
                console.error('Error adding video to watchlist:', error);
                alert('Failed to add video to watchlist');
            }
        } else {
            navigate('/login');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: video.title,
                    text: video.description,
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            setShowShareModal(true);
        }
    };

    useEffect(() => {
        fetchMovie();
        fetchSubscriptions();
    }, [id]);

    useEffect(() => {
        let player;
        if (showPlayer && videoRef.current) {
            player = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                preload: 'auto'
            });
            player.on('ready', () => {
                player.requestFullscreen();
            });
        }
        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [showPlayer]);

    if (!video) return <div>Loading...</div>;

    const getShortLanguageCode = (language) => {
        const langMap = {
            "Telugu": "Tel",
            "Tamil": "Tam",
            "Malayalam": "Mal",
            "Kannada": "Kan",
            "Hindi": "Hin"
        };
        return langMap[language] || language;
    };

    const handleWatchNow = () => {
        if (hasActiveSubscription) {
            setShowPlayer(true);
        } else {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/login');
            } else {
            navigate('/subscription'); 
            }
        }
    };

    return (
        <div
            className="relative min-h-screen w-full"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0.9, 0.9, 0.9, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%), url(${video.backgroundUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                padding: '20px 0'
            }}
        >
            <ToastContainer />
            <div className="text-white pt-16 grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 lg:px-8">
                <div className="lg:col-span-3 flex flex-col lg:flex-row items-center lg:items-start space-x-0 lg:space-x-4">
                    <img src={video.thumbnailUrl} alt="poster" className="w-2/3 lg:w-1/3 h-48 lg:h-[90%] rounded-sm object-cover mb-4 lg:mb-0" />
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-bold">{video.title}</h1>
                        <h2 className="text-sm lg:text-md py-1">{video.year && <span>&#8226; {video.year}</span>} {video.year && video.duration && <span> &#8226; {video.duration}</span>}  &#8226; {video.genre.join(' \u2022 ')} </h2>
                        <div className="flex items-center gap-3 py-2">
                            <h4 className="text-lg lg:text-xl border border-gray-500 px-2 py-0.5">{video.content}</h4>
                            <h3 className="text-lg lg:text-xl flex justify-center items-center gap-2"><FaStar className="text-yellow-500" />{video.rating}</h3> 
                        </div>
                        <h5 className="text-lg lg:text-xl px-2 py-0.5">{getShortLanguageCode(video.language)}</h5>
                        <p className="text-sm lg:text-md mt-4 w-full lg:w-1/2">{video.description}</p>
                        <div className="flex gap-4 pt-4">
                            <button 
                                onClick={handleWatchNow} 
                                className="bg-white text-black font-semibold px-4 py-2 rounded-full flex justify-center items-center gap-2"
                            >
                                <FaPlay /> {hasActiveSubscription ? 'Watch Now' : 'Subscribe'}
                            </button>
                            <button onClick={handleAddToWatchlist}  className="bg-gray-600 bg-opacity-30 backdrop-blur-md text-white font-semibold px-4 py-2 rounded-full "><FaPlus /></button>
                            <button onClick={handleShare} className="bg-gray-600 bg-opacity-30 backdrop-blur-md text-white font-semibold px-4 py-2 rounded-full "><GoShareAndroid /></button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 mt-6">
                    <h3 className="text-md font-semibold">Cast:</h3>
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                        {video.cast.map((member) => (
                            <div key={member._id} className="flex flex-col items-center text-center">
                                <img
                                    src={member.image || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                                    alt={member.actor}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                <p className="text-white text-xs  mt-2"><strong>{member.actor}</strong></p>
                                <p className="text-white text-xs">{member.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                        {video.crew.map((member) => (
                            <div key={member._id} className="flex flex-col items-center text-center">
                                <img
                                    src={member.image || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                                    alt={member.member}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                <p className="text-white text-xs lg:text-sm mt-2"><strong>{member.member}</strong></p>
                                <p className="text-white text-xs">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className="text-white text-2xl font-semibold pl-12 ">Similar {video.category}s</h1>
                </div>
                <LatestReleases/>
            </div>
            {showPlayer && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative w-full h-full max-w-3xl max-h-3xl">
                        <video 
                            ref={videoRef}
                            className="video-js vjs-big-play-centered vjs-fluid vjs-default-skin"
                            controls
                            preload="auto"
                            data-setup='{}'
                        >
                            <source src={`${API_URL}/uploads/${video.videoUrl}`} type="video/mp4" />
                        </video>
                        <button 
                            onClick={() => setShowPlayer(false)} 
                            className="absolute top-4 right-4 text-white text-3xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            {showShareModal && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-black">
                        <h2 className="text-xl font-bold mb-4">Share this video</h2>
                        <p>Copy the link below to share:</p>
                        <div className="flex items-center mt-2">
                            <input 
                                type="text" 
                                value={window.location.href} 
                                readOnly 
                                className="p-2 border border-gray-300 rounded-md flex-1"
                            />
                            <button 
                                onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }}
                                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Copy
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowShareModal(false)} 
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Video;
