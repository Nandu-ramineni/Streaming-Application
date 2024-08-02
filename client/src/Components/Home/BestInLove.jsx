import { useState, useEffect } from "react";
import { getVideos } from "../../Services/api";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

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

const BestInLove = () => {
    const [bestInLove, setBestInLove] = useState([]);

    const fetchBestInLove = async () => {
        try {
            const response = await getVideos();
            const romanceGenre = response.data
                .filter(video => video.genre.includes("Romance"));
            setBestInLove(romanceGenre);
        } catch (error) {
            console.log('Error while calling getVideos API', error);
        }
    }

    useEffect(() => {
        fetchBestInLove();
    }, []);

    if (!bestInLove.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1 className="text-white text-2xl font-semibold pl-12 ">Best in Love</h1>
            </div>
            <div className="px-6 py-2">
                <Carousel
                    responsive={responsive}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                    keyBoardControl={true}
                    autoPlay={false}
                    infinite={true} swipeable={true}
                    draggable={false}
                    className="py-4 "
                >
                    {bestInLove.map((video) => (
                        <Link to={`/video/${video._id}`} key={video._id}>
                            <div
                                key={video._id}
                                className="w-full h-60 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100"
                                style={{ borderRadius: '0.75rem' }}
                            >
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    className="w-full h-[80%] object-cover"
                                    style={{ borderRadius: '0.75rem', objectPosition: 'center 15%' }}
                                />
                                <p className="text-white text-center text-lg">{video.title}</p>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default BestInLove;
