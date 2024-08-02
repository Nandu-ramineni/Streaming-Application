import { useEffect, useState } from "react"
import { getVideos } from "../../Services/api";
import { useNavigate } from "react-router-dom";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Movies = () => {
    const [movies,setMovies] = useState('');
    const navigate = useNavigate();
    const fetchMovies = async() => {
        try {
            const response = await getVideos();
            const filteredMovies = response.data.filter(video => video.category === 'Movie');
            setMovies(shuffleArray(filteredMovies));
        } catch (error) {
            console.log('Error while calling getVideos API ', error);
        }
    }
    useEffect(() => {
        fetchMovies();
    },[]) 
    return (
        <div className="pt-20">
            <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-2 min-h-[50vh]">
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie._id} className="w-full h-60 hover:scale-110 transition-transform cursor-pointer ease-out duration-300 px-4 z-100" style={{ borderRadius: '0.75rem' }} onClick={() => navigate(`/video/${movie._id}`)}>
                            <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-3/4 object-cover" style={{ borderRadius: '0.75rem', objectPosition: 'center 15%' }} />
                            <p className="text-white text-center text-lg">{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center text-white text-center text-2xl">
                        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" alt="Not found" className="mb-4 w-52 h-52" />
                        <p>No Movies found</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Movies
