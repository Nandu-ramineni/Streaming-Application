import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    language: {
        type: String,
        required: true
    },
    backgroundUrl:{
        type: String,
        required: true
    },
    genre: {
        type: [String],
        enum: ['Action','Romance', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller'],
        required: true
    },
    content:{
        type: String,
        enum: ['U','UA','A'],
        required: true
    },
    ageRestriction:{
        type: String,
    },
    rating:{
        type: String,
        default: 0,
        required: true
    },
    category: {
        type: String,
        enum: ['Movie', 'TV Show', 'Web Series'],
        required: true
    },
    year:{
        type: String,
    },
    duration:{
        type: String,
    },

    cast: {
        type: [
            {
                actor: String,
                image: String,
                role: String
            }
        ]
    },
    crew: {
        type: [
            {
                member: String,
                image: String,
                role: String
            }
        ],
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;
