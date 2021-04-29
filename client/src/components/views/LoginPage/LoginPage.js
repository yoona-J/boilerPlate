//import Axios from 'axios'
//import { response } from 'express';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {

    const dispatch = useDispatch();

    //안에서 데이터를 바꿀 때 -> state
    //email을 위한 state와 password 용 state
    //useState => 처음 나타나는 내용
    //onChange를 통해 email과 같은 state를 바꿔준다

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail (event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword (event.currentTarget.value)
    }
    //페이지 전체가 represh가 되지 않게
    const onSubmitHandler = (event) => {
        event.preventDefault();

        //console.log('email =', Email)
        //console.log('pw =', Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                //랜딩 페이지로 넘어가자
                props.history.push('/')
            } else {
                alert ('ERROR!')
            }
        })
    }



    return (
        <div style = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <form style = {{
                display : 'flex',
                flexDirection : 'column'
            }}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type = "password" value = {Password} onChange = {onPasswordHandler} />
                

                <br />
                <button>
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginPage
