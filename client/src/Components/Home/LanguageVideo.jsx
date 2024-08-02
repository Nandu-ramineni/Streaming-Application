import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVideos } from "../../Services/api";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const LanguageVideos = () => {
    const { language } = useParams();
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    const fetchVideosByLanguage = async () => {
        try {
            const response = await getVideos();
            const filteredVideos = response.data.filter(video => video.language.toLowerCase().includes(language.toLowerCase()));
            setVideos(shuffleArray(filteredVideos));
        } catch (error) {
            console.log('Error while calling getVideos API', error);
        }
    };

    useEffect(() => {
        fetchVideosByLanguage();
    }, [language]);

    return (
        <div className="pt-20">
            <h1 className="text-white text-2xl font-semibold pl-12 py-6">{`Movies in ${language.charAt(0).toUpperCase() + language.slice(1)}`}</h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-2 min-h-[50vh]">
                {videos && videos.length > 0 ? (
                    videos.map(video => (
                        <div key={video._id} className="w-full h-72 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100" style={{ borderRadius: '0.75rem' }} onClick={() => navigate(`/watch/${language}/${video._id}`)}>
                            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-3/4 object-cover" style={{ borderRadius: '0.75rem', objectPosition: 'center 15%' }} />
                            <p className="text-white text-center text-lg">{video.title}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center text-white text-center text-2xl">
                        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" alt="Not found" className="mb-4 w-52 h-52" />
                        <p>No Movies found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageVideos;
