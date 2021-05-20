import React, { useEffect} from 'react'
import axios from 'axios';
//import { response } from 'express';

//랜딩페이지에 들어오자 마자 get request를 server로 보낸다.
//보낸 후 서버 콘솔 창에 내용이 보이게 한다
function LandingPage(props) {

    useEffect(() => {
        //host 연결 주소 -> server 4000
        axios.get('/api/hello')
        .then(response => { console.log(response) })
    }, [])


    const onClickHandler = () => {
        axios.get (`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert ('로그아웃 하지 못했습니다')
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
            <h2>시작페이지</h2>

            <button onClick = {onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
