import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';


export function loginUser (dataTosubmit) {

    //http 메소드인 post를 이용해 loginPage.js의 body에 찍힌 값을 
    //login에 넣어준다.
    //surver의 request를 response
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)

    return {
        type : LOGIN_USER,
        payload : request

    }    

}


export function registerUser (dataTosubmit) {

    //http 메소드인 post를 이용해 loginPage.js의 body에 찍힌 값을 
    //login에 넣어준다.
    //surver의 request를 response
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)

    return {
        type : REGISTER_USER,
        payload : request

    }    

}