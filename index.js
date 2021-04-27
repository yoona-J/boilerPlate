const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");


//application/x-www-urlencoded <-  분석해서 가져오는 bodyParser
app.use(bodyParser.urlencoded({extended : true}));
//application/json <-  분석해서 가져오는 bodyParser
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require ('mongoose');
const { request } = require('express');
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('Mongo DB Connected,,,,'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {

  
  const user = new User(req.body)
  //정보들이 user 모델에 저장됨
  user.save((err, userInfo) => {
    //에러가 뜨면 실패
    if(err) return res.json ({success : false, err})
    //status(200)은 성공
    return res.status(200).json({
      success : true
    })
  })
})

app.post('/login', (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.

    //만약 요청된 이메일을 가진 유저가 한명도 없다면
  User.findOne({ email : req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess : false,
        message : "이메일이 유저에 등록되어있지 않습니다."
      })
    }

  // 2. 요청된 이메일이 데이터베이스에 있는지 확인되면 비밀번호가 일치하는지 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json ({
          loginSuccess: false,
          message : "비밀번호가 틀렸습니다."
        })

  // 3. 비밀번호가 일치하면 토큰을 생성하기
  //npm install jsonwebtoken --save
      
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에?? 
        //-> 현재 user 안에 있는 토큰을 쿠키나 로컬 스토리지에 저장 (지금은 쿠키에 저장한다)
        //npm install cookie-parser --save\
        res.cookie("x_auth", user.token)
          //성공 코드
          .status(200)
          .json ({
            loginSuccess: true,
            userId: user._id
          })
      })
    })
  })
})

//auth에서 request한 뒤 call-back 하기 전 중간에서 auth.js으로 인증처리
app.get('/api/users/auth', auth, (req, res) => {

  //여기까지 미들웨어를 통과해왔다는 얘기는 Authentication = true 라는 뜻임
  res.status(200).json ({
    _id: req.user._id,
    //role === 1 -> 일반유저 //role !== 0이면 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})