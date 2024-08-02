import * as actionTypes from '../Constants/subscription';

const initialState = {
    subscriptions: [],
    loading: false,
    error: null,
};

export const getSubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Get_Subscription_Request:
            return {
                ...state,
                loading: true,
                error: null 
            };
        case actionTypes.Get_Subscription_Success:
            return {
                ...state,
                loading: false,
                subscriptions: action.payload
            };
        case actionTypes.Get_Subscription_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
