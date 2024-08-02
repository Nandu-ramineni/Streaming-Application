import { useEffect, useState } from "react";
import { getVideos } from "../../services/api";

const DisplayVideos = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await getVideos();
            setVideos(response); 
        } catch (error) {
            console.error('Failed to fetch videos', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="w-full px-4">
            <header className="shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-center font-bold text-white">Video Gallery</h1>
                </div>
            </header>
            <main className="py-6 h-[75vh] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <div key={video._id} className="bg-white shadow rounded-lg overflow-hidden">
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                                        {/* <p className="text-gray-600 mb-2"><strong>Description:</strong> {video.description}</p> */}
                                        <p className="text-gray-600 mb-2"><strong>Genre:</strong> {video.genre.join(', ')}</p>
                                        <p className="text-gray-600 mb-2"><strong>Content:</strong> {video.content}</p>
                                        <p className="text-gray-600 mb-2"><strong>Language:</strong> {video.language}</p>
                                        <p className="text-gray-600 mb-2"><strong>Category:</strong> {video.category}</p>
                                        <p className="text-gray-600 mb-2"><strong>Featured:</strong> {video.featured ? 'Yes' : 'No'}</p>
                                        <div className="text-gray-600 mb-2">
                                            <strong>Cast:</strong>
                                            {video.cast.length > 0 ? (
                                                video.cast.map((c, index) => (
                                                    <div key={index}>
                                                        <p>{c.actor} as {c.role}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No cast information available</p>
                                            )}
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full">No videos found</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DisplayVideos;
