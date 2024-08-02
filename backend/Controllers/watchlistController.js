import User from '../Models/User.js';
import Video from '../Models/Video.js';

export const addToWatchlist = async (req, res) => {
    const { userId, videoId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.watchList.includes(videoId)) {
            user.watchList.push(videoId);
            await user.save();
            return res.status(200).json({ message: 'Video added to watchlist', watchList: user.watchList });
        }
        res.status(400).json({ message: 'Video already in watchlist' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getWatchlistByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('watchList');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ watchList: user.watchList });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteWatchListById = async (req, res) => {
    const { userId, videoId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.watchList = user.watchList.filter(id => id.toString() !== videoId);
        await user.save();
        return res.status(200).json({ message: 'Video removed from watchlist', watchList: user.watchList });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
