//import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {

    const dispatch = useDispatch();

    //안에서 데이터를 바꿀 때 -> state
    //email을 위한 state와 password 용 state
    //useState => 처음 나타나는 내용
    //onChange를 통해 email과 같은 state를 바꿔준다

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ComfirmPassword, setComfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail (event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName (event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword (event.currentTarget.value)
    }

    const onComfirmPasswordHandler = (event) => {
        setComfirmPassword (event.currentTarget.value)
    }
    //페이지 전체가 represh가 되지 않게
    const onSubmitHandler = (event) => {
        event.preventDefault();

        //console.log('email =', Email)
        //console.log('pw =', Password)

        if (Password !== ComfirmPassword) {
            return alert ('비밀번호와 비밀번호 확인 부분이 같지 않습니다')
        }


        let body = {
            email: Email,
            name : Name,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response => {
            if (response.payload.success) {
                props.history.push("/login")
            } else {
                alert ("FAILED TO SIGN UP")
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
                <label>Name</label>
                <input type = "text" value = {Name} onChange = {onNameHandler} />
                <label>Password</label>
                <input type = "password" value = {Password} onChange = {onPasswordHandler} />
                <label>Confire Password</label>
                <input type = "password" value = {ComfirmPassword} onChange = {onComfirmPasswordHandler} />
                

                <br />
                <button type = "submit">
                    회원가입
                </button>

            </form>
        </div>
    )
}

export default RegisterPage
