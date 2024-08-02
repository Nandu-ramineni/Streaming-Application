import { useEffect, useState } from "react";
import { getVideos } from "../../Services/api";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import LatestReleases from "./LatestReleases";
import BestInLove from "./BestInLove";
import WatchByLanguage from "./WatchByLanguage";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const Banner = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const response = await getVideos();
            setVideos(response.data);
            setSelectedVideo(shuffleArray(response.data)[0]);
        } catch (error) {
            console.log('Error while calling getVideos API ', error);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [navigate]);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
    }

    return (
        <div>
            {selectedVideo && (
                <div
                    key={selectedVideo._id}
                    className="h-[80vh]"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0.9, 0.9, 0.9, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%), url(${selectedVideo.backgroundUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: 'hidden',
                        padding: '20px 0'
                    }}
                >
                    <div className="text-white pt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="px-4 md:px-8 col-span-1 md:col-span-2 lg:col-span-3  flex items-start space-x-4">
                            <img src={selectedVideo.thumbnailUrl} alt="poster" className="w-2/3 lg:w-1/3 h-48 lg:h-[90%] rounded-sm object-cover mb-4 lg:mb-0" />
                            <div>
                                <h1 className="text-xl md:text-4xl font-bold">{selectedVideo.title}</h1>
                                <h2 className="text-sm md:text-xl py-2">&#8226; {selectedVideo.genre.join(' \u2022 ')}</h2>
                                <h4 className="text-sm md:text-xl w-12 border border-gray-500 px-2 py-0.5 my-2">{selectedVideo.content}</h4>
                                <h5 className="text-sm md:text-xl py-2">{selectedVideo.language}</h5>
                                <p className="mt-2 w-full md:w-1/2 py-1">{selectedVideo.description}</p> <br />
                                <button className="bg-white text-black font-medium px-4 py-2 rounded-full" onClick={() => navigate(`/video/${selectedVideo._id}`)}>View {selectedVideo.category}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <h1 className="text-white text-2xl font-semibold pl-12 py-2">Trending Now</h1>
            </div>
            <div className="px-6">
            <Carousel
                responsive={responsive}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-20-px"
                containerClass="carousel-container"
                keyBoardControl={true}
                autoPlay={false}
                infinite={true} swipeable={true}
                draggable={false}
                className="pt-4"
            >
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className="w-full h-60 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100"
                        style={{ borderRadius: '0.75rem' }}
                        onClick={() => handleThumbnailClick(video)}
                    >
                        <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-[80%] object-cover"
                            style={{ borderRadius: '0.75rem', objectPosition: 'center 15%' }}
                        />
                        <p className="text-white text-center text-lg">{video.title}</p>
                    </div>
                ))}
            </Carousel>
            </div>
            <div>
                <h1 className="text-white text-2xl font-semibold pl-12 ">Latest Releases</h1>
            </div>
            <LatestReleases />
            <BestInLove />
            <WatchByLanguage/>
        </div>
    )
}

export default Banner;
