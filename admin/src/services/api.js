import axios from "axios";

const URL = "http://localhost:7000";

export const authenticateAdmin = async (data) => {
    try {
        const response = await axios.post(`${URL}/admin/login`,data);
        return response;
    } catch (error) {
        console.log("Error while Authenticate admin",error);
    }
}

export const uploadVideo = async (videoData) => {
    try {
        const response = await axios.post(`${URL}/video/upload`, videoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error while uploading video",error);
    }
};
export const getVideos = async () => {
    try {
        const response = await axios.get(`${URL}/video/stream`);
        return response.data;
    } catch (error) {
        console.log("Error while getting videos",error);
    }
}

export const getStreamUrl = async (fileName) => {
    try {
        const response = await axios.get(`${URL}/video/stream/${fileName}`);
        return response.data.signedUrl;
    } catch (error) {
        console.log("Error while getting stream url",error);
    }
};

export const getSubscriptions = async () => {
    try {
        const response = await axios.get(`${URL}/subscription/get`);
        return response.data;
    } catch (error) {
        console.log("Error while getting subscriptions",error);
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${URL}/user/get`);
        return response.data;
    } catch (error) {
        console.log("Error while getting users",error);
    }
}

export const deleteUserById = async (userId) => {
    try {
        const response = await axios.delete(`${URL}/user/delete/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Error while deleting user",error);
    }
}

export const getAllNotifications = async () => {
    try {
        const response = await axios.get(`${URL}/notifications/all`);
        return response;
    } catch (error) {
        console.error('Error fetching notifications', error);
    }
};

export const createNotification = async (message, type, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.post(`${URL}/notifications/create`, { message, type }, config);
        return response;
    } catch (error) {
        console.error('Error creating notification', error);
    }
};

export const getFilteredNotifications = async (type, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.get(`${URL}/notifications/filter`, { params: { type }, ...config });
        return response;
    } catch (error) {
        console.error('Error fetching filtered notifications', error);
    }
};

export const maintenanceMode = async (maintenanceMode, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.post(`${URL}/admin/maintenance`, { maintenanceMode }, config);
        return response;
    } catch (error) {
        console.error('Error updating maintenance mode', error);
    }
}