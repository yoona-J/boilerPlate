//combineReducers를 이용해서 rootReducer로 합쳐준다

import { combineReducers } from 'redux';
//인증기능
import user from './user_reducer';


const rootReducer = combineReducers({
    user
})

export default rootReducer;