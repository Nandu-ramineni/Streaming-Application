import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { getSubscriptionReducer } from './Reducers/SubscriptionReducers';


const reducer = combineReducers({
    getSubscriptions: getSubscriptionReducer
})
const middleware= [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;