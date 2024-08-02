import * as actionTypes from '../Constants/subscription'
import axios from 'axios';

const URL = 'http://localhost:7000';

export const getSubscriptions = (userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.Get_Subscription_Request });
        const { data } = await axios.get(`${URL}/subscription/get/${userId}`);
        dispatch({
            type: actionTypes.Get_Subscription_Success,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.Get_Subscription_Failure,
            payload: error.message
        });
    }
}
