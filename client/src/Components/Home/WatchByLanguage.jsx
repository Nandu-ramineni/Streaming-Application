import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Telugu from "../../assets/Telugu.webp";
import Tamil from "../../assets/Tamil.webp";
import Malayalam from "../../assets/Malayalam.webp";
import Hindi from "../../assets/Hindi.webp";
import Kannada from "../../assets/Kannada.webp";
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

const languageImages = [
    { src: Telugu, alt: "Telugu", language: "Telugu" },
    { src: Tamil, alt: "Tamil", language: "Tamil" },
    { src: Malayalam, alt: "Malayalam", language: "Malayalam" },
    { src: Hindi, alt: "Hindi", language: "Hindi" },
    { src: Kannada, alt: "Kannada", language: "Kannada" },
];

const WatchByLanguage = () => {
    const navigate = useNavigate();

    const handleLanguageClick = (language) => {
        navigate(`/watch/${language}`);
    };

    return (
        <div>
            <div>
                <h1 className="text-white text-2xl font-semibold pl-12">Watch in your Language</h1>
            </div>
            <div className="px-6 py-2">
                <Carousel
                    responsive={responsive}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                    keyBoardControl={true}
                    autoPlay={false}
                    infinite={true}
                    swipeable={true}
                    draggable={true}
                    className="py-4"
                >
                    {languageImages.map((image) => (
                        <div
                            key={image.language}
                            className="w-full h-44 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100"
                            onClick={() => handleLanguageClick(image.language)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: '0.75rem' }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default WatchByLanguage;
