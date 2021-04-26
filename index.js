const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

//application/x-www-urlencoded <-  분석해서 가져오는 bodyParser
app.use(bodyParser.urlencoded({extended : true}));
//application/json <-  분석해서 가져오는 bodyParser
app.use(bodyParser.json());


const mongoose = require ('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('Mongo DB Connected,,,,'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})