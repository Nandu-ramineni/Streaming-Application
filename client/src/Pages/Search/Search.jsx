import { useEffect, useState } from "react";
import { getVideos } from "../../Services/api";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value) {
            const filteredMovies = movies.filter((movie) =>
                movie.title.toLowerCase().includes(value.toLowerCase()) 
            );
            setMovies(filteredMovies);
            
        } else {
            fetchMovies();
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await getVideos();
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
        
    }, []);

    return (
        <div className="pt-20 min-h-screen">
            <div className="flex justify-center m-auto">
                <div className="relative w-1/2 my-4">
                    <input
                        type="text"
                        placeholder="Search MovieTitle"
                        className="w-full p-2 pl-14 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        value={search}
                        onChange={handleSearch}
                    />
                    <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-500">
                        <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.41-1.41l4.12 4.13a1 1 0 01-1.42 1.41l-4.11-4.13zM8 14A6 6 0 108 2a6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <section>
                {search === '' ? (
                    <div style={{padding: '1rem 5%'}}>
                        <h1 className="text-2xl font-medium text-gray-300">Popular Searches</h1>
                        {movies.slice(0, 4).map((movie) => (
                            <div key={movie.id} className="flex flex-col">
                                <h1 className="text-lg py-1 text-gray-500">{movie.title}</h1>
                            </div>
                            
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{padding:'1rem 5%'}}>
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
                    </div>
                )}
            </section>
        </div>
    );
};

export default Search;
