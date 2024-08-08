import axios from 'axios';

const URL  = 'http://localhost:7000';
export const API_URL  = 'http://localhost:7000';

export const authenticateSignup = async (data) => {
    try {
        const response = await axios.post(`${URL}/user/register`,data);
        return response;
    } catch (error) {
        console.log('Error while calling authenticateSignup API ', error);
        
    }
}

export const authenticateLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/user/login`,data);
        return response;
    } catch (error) {
        console.log('Error while calling authenticateLogin API ', error);
    }
}

export const GetProfile = async (userId) => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        const response = await axios.get(`${URL}/user/get/${userId}`,config);
        return response;
    } catch (error) {
        console.log('Error while calling authenticateGetProfile API ', error);
    }
}

export const updateProfile = async (userId, updatedProfile) => {
    try {
        
        const response = await axios.put(`${URL}/user/update/${userId}`, updatedProfile, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error while calling updateProfile API ', error);
    }
};

export const getVideos = async() => {
    try {
        const response = await axios.get(`${URL}/video/stream`);
        return response;
    } catch (error) {
        console.log('Error while calling getVideos API ', error);
    }
}

export const getVideoById = async(id) => {
    try {
        const response = await axios.get(`${URL}/video/stream/${id}`);
        return response;
    } catch (error) {
        console.log('Error while calling getVideoById API ', error);
    }
}
export const getSubscriptions = async(userId) => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        const response = await axios.get(`${URL}/subscription/get/${userId}`,config);
        return response;
    } catch (error) {
        console.log('Error while calling getSubscriptions API ', error);
    }
}

export const buySubscription = async(data) => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        const response = await axios.post(`${URL}/subscription/buy`,data,config);
        return response;
    } catch (error) {
        console.log('Error while calling buySubscription API ', error);
    }
}

export const updateSubscription = async (userId, data) => {
    try {
        const response = await axios.patch(`${URL}/subscription/update/${userId}`, data);
        return response;
    } catch (error) {
        console.log('Error while calling updateSubscription API', error);
    }
};

export const addToWatchList = async(user,video,token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.post(`${URL}/watchlist/add`,user,video,config);
        return response;
    } catch (error) {
        console.log('Error while calling addToWatchlist API ', error);
    }
}

export const getWatchList = async(id,token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.get(`${URL}/watchlist/get/${id}`,config);
        return response;
    } catch (error) {
        console.log('Error while calling getWatchlist API ', error);
    }
}

export const deleteWatchList = async (userId, videoId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.post(`${URL}/watchlist/delete`, { userId, videoId }, config);
        return response;
    } catch (error) {
        console.log('Error while calling deleteWatchList API ', error);
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


export const initiatePayment = async (subscriptionId, amount) => {
    try {
        const response = await axios.post(`${URL}/payments`, {
            subscriptionId,
            amount
        });
        return response.data;
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw error;
    }
};

export const validatePayment = async (paymentDetails) => {
    try {
        const response = await axios.post(`${URL}/payments/validate`, paymentDetails);
        return response.data;
    } catch (error) {
        console.error('Error validating payment:', error);
        throw error;
    }
};

export const sendPaymentDetails = async (id, paymentId, paymentStatus) => {
    try {
        const response = await axios.put(`${URL}/subscription/updateStatus/${id}`, {
            paymentId,
            paymentStatus
        });
        return response.data;
    } catch (error) {
        console.error('Error sending payment details:', error);
        throw error;
    }
};

export const getInvoice = async (subscriptionId) => {
    try {
        const response = await axios.get(`${URL}/subscription/downloadInvoice/${subscriptionId}`, {
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        console.error('Error fetching invoice:', error);
        throw error;
    }
}

export const getMaintenanceMode = async () => {
    try {
        const response = await axios.get(`${URL}/admin/isMaintenance`);
        return response;
    } catch (error) {
        console.error('Error fetching maintenance mode status:', error);
        throw error;
    }
}