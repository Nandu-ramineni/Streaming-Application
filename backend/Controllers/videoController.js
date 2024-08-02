
import Video from '../Models/Video.js';
// import generateSignedUrl from '../utils/generateSignedUrl.js';
// import uploadVideo from '../Utils/uploadVideo.js';
import fs from 'fs';
import path from 'path';

export const uploadVideoController = async (req, res) => {
    const { title, description, thumbnailUrl, featured ,genre,content,category, cast, crew,language,backgroundUrl,ageRestriction,rating,duration,year } = req.body;
    const parsedCast = Array.isArray(cast) ? cast : JSON.parse(cast);
    const parsedCrew = Array.isArray(crew) ? crew : JSON.parse(crew);
    const parsedGenre = Array.isArray(genre) ? genre : JSON.parse(genre);
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const videoFile = req.file ? req.file.filename : undefined;
        const video = new Video({
            title,
            description,
            thumbnailUrl,
            featured: featured || false,
            genre: parsedGenre,
            content,
            category,
            language,
            backgroundUrl,
            rating,
            duration,
            year,
            ageRestriction,
            cast: parsedCast,
            crew: parsedCrew,
            videoUrl: videoFile
        });
        await video.save();
        res.status(200).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
        res.status(500).json({ message: 'Video upload failed', error: error.message });
    }
};
// export const uploadVideoController = async (req, res) => {
//     const { title, description, thumbnailUrl, featured ,genre,content,category, cast, crew,language,backgroundUrl,ageRestriction } = req.body;
//     const parsedCast = Array.isArray(cast) ? cast : JSON.parse(cast);
//     const parsedCrew = Array.isArray(crew) ? crew : JSON.parse(crew);
//     try {
//         if (!req.file) {
//             throw new Error('No file uploaded');
//         }
//         const result = await uploadVideo(req.file.path, {
//             title,
//             description,
//             thumbnailUrl,
//             featured: featured || false,
//             genre,
//             content,
//             category,
//             language,
//             backgroundUrl,
//             ageRestriction,
//             cast: parsedCast,
//             crew: parsedCrew
//         });
//         res.status(200).json({ message: 'Video uploaded successfully', url: result.Location });
//     } catch (error) {
//         res.status(500).json({ message: 'Video upload failed', error: error.message });
//     }
// };

export const getVideoController = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error });
    }
};

export const getVideoById = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch video', error });
    }
};

// export const streamVideoController = async (req, res) => {
//     const fileName = req.params.fileName;
//     try {
//         const video = await Video.findOne({ videoUrl: { $regex: fileName } });
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }
//         const signedUrl = generateSignedUrl(fileName);
//         video.views += 1;
//         await video.save();
//         res.status(200).json({ signedUrl });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to generate signed URL', error: error.message });
//     }
// };