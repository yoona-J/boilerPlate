import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types'

//export default function (previousState, action) => nextState
//이전 state과 action object를 받은 후에 next state를 return함
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            //...state => 이전의 state 관련 내용을 불러온다
            //user_action.js의 payload를 loginSuccess로 보낸다
            return { ...state, loginSuccess : action.payload }
            break;
        
        case REGISTER_USER:
            return {...state, register : action.payload}
            break;

        default:
            return state;
    }
}