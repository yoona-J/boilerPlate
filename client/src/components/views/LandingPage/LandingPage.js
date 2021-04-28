import React, { useEffect} from 'react'
import axios from 'axios';
//import { response } from 'express';

//랜딩페이지에 들어오자 마자 get request를 server로 보낸다.
//보낸 후 서버 콘솔 창에 내용이 보이게 한다
function LandingPage() {

    useEffect(() => {
        //host 연결 주소 -> server 4000
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])


    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
