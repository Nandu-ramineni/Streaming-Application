import { s3 } from '../awsConfig.js';
import fs from 'fs';
import path from 'path';
import Video from '../Models/Video.js';

const uploadVideo = async (filePath, videoMetadata) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `videos/${fileName}`,
        Body: fileContent,
        ContentType: 'video/mp4'
    };
    try {
        const result = await s3.upload(params).promise();
        const video = new Video({
            ...videoMetadata,
            videoUrl: result.Location
        });
        await video.save();
        return result;
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw error;
    }
};
export default uploadVideo;
