import { useState } from 'react';

const genres = ['Action', 'Romance', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller'];
const contents = ['U', 'UA', 'A'];
const categories = ['Movie', 'TV Show', 'Web Series'];

const UploadVideo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [featured, setFeatured] = useState(false);
    const [file, setFile] = useState(null);
    const [genresSelected, setGenresSelected] = useState([]);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [rating, setRating] = useState('');
    const [duration,setDuration] = useState('');
    const [year,setYear] = useState('');
    const [cast, setCast] = useState([{ actor: '', role: '' }]);
    const [crew, setCrew] = useState([{ member: '', role: '' }]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleCastChange = (index, e) => {
        const newCast = [...cast];
        newCast[index][e.target.name] = e.target.value;
        setCast(newCast);
    };

    const handleCrewChange = (index, e) => {
        const newCrew = [...crew];
        newCrew[index][e.target.name] = e.target.value;
        setCrew(newCrew);
    };

    const addCast = () => setCast([...cast, { actor: '', role: '',image:'' }]);
    const removeCast = (index) => setCast(cast.filter((_, i) => i !== index));

    const addCrew = () => setCrew([...crew, { member: '', role: '',image:'' }]);
    const removeCrew = (index) => setCrew(crew.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (genresSelected.length === 0 || !content) {
            setMessage('Please select at least one genre and content rating');
            return;
        }
        setLoading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnailUrl', thumbnailUrl);
        formData.append('featured', featured);
        formData.append('video', file);
        formData.append('genre', JSON.stringify(genresSelected));
        formData.append('content', content);
        formData.append('category', category);
        formData.append('language', language);
        formData.append('backgroundUrl', backgroundUrl);
        formData.append('rating', rating);
        formData.append('duration', duration);
        formData.append('year', year);
        formData.append('cast', JSON.stringify(cast));
        formData.append('crew', JSON.stringify(crew));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:7000/video/upload');
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
                setMessage('Video uploaded successfully');
                setTitle('');
                setDescription('');
                setThumbnailUrl('');
                setFeatured(false);
                setFile(null);
                setGenresSelected([]);
                setContent('');
                setCategory('');
                setLanguage('');
                setBackgroundUrl('');
                setCast([{ actor: '', role: '' }]);
                setCrew([{ member: '', role: '' }]);
            } else {
                const response = JSON.parse(xhr.responseText);
                setMessage(response.error || 'Video upload failed');
            }
            setLoading(false);
        };
        xhr.onerror = () => {
            setMessage('Video upload failed');
            setLoading(false);
        };
        xhr.send(formData);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl text-white text-center font-bold mb-4">Upload Movie</h2>
            <form onSubmit={handleSubmit} className="form-bg space-y-4  px-6 py-4 rounded-md">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Title</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={title} required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Thumbnail URL</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={thumbnailUrl} required
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Language</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={language} required
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Background URL</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={backgroundUrl} required
                            onChange={(e) => setBackgroundUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Description</label>
                        <textarea
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={description} required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Content Rating</label>
                        <select
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={content} required
                            onChange={(e) => setContent(e.target.value)}
                        >
                            <option value="" disabled>Select Content Rating</option>
                            {contents.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-4">
                <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Genre</label>
                        <select
                            multiple
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={genresSelected}
                            onChange={(e) => setGenresSelected(Array.from(e.target.selectedOptions, option => option.value))} required
                        >
                            <option value="" disabled>Select Genre</option>
                            {genres.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Category</label>
                        <select
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} required
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Cast</h3>
                    {cast.map((c, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="actor" placeholder="Actor Name" required
                                value={c.actor}
                                onChange={(e) => handleCastChange(index, e)}
                            />
                            <input
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="role" placeholder="Role"
                                value={c.role}
                                onChange={(e) => handleCastChange(index, e)}
                            />
                            <input 
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="image" placeholder="Image URL" 
                                value={c.image}
                                onChange={(e) => handleCastChange(index, e)}
                            />
                            <button type="button" className="text-red-500" onClick={() => removeCast(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="text-blue-500" onClick={addCast}>Add Cast</button>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Crew</h3>
                    {crew.map((c, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="member" placeholder="Crew Member" 
                                value={c.member}
                                onChange={(e) => handleCrewChange(index, e)}
                            />
                            <input
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="role" placeholder="Role" 
                                value={c.role}
                                onChange={(e) => handleCrewChange(index, e)}
                            />
                            <input
                                type="text"
                                className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                                name="image" placeholder="Image URL" 
                                value={c.image}
                                onChange={(e) => handleCrewChange(index, e)}
                            />
                            <button type="button" className="text-red-500" onClick={() => removeCrew(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="text-blue-500" onClick={addCrew}>Add Crew</button>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Duration</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Year</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={year} 
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Featured</label>
                        <input
                            type="checkbox"
                            className="mt-1 h-6 w-6 text-indigo-600 border-gray-300 rounded bg-gray-800"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Video File</label>
                        <input
                            type="file"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            onChange={(e) => setFile(e.target.files[0])} required
                        />
                    </div>
                </div>
                <div className="flex-1">
                        <label className="block text-sm font-medium text-white">Rating</label>
                        <input
                            type="text"
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white"
                            value={rating} required
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                {loading && <div className="text-white">Uploading... {progress}%</div>}
                {message && <div className="text-white">{message}</div>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
                >
                    Upload Video
                </button>
            </form>
        </div>
    );
};

export default UploadVideo;
