const mongoose = require ('mongoose');

const bcrypt = require('bcrypt');
//salt를 이용해 비밀번호를 암호화한다. -salt를 먼저 생성
//saltRounds = x자리 수를 만들어서 비밀번호를 암호화함
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userschema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        /*스페이스를 없애주는 역할*/
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})

//유저 정보를 저장하기 전에 함수를 연결함
userschema.pre('save', function(next){
    //const userschema = mongoose.Schema를 가르킴
    var user = this;

    //유저의 정보를 변경할 때마다 비밀번호를 암호화하지 않기 위해
    //비밀번호를 변경할 때만 암호화를 해줘야 한다.
    //따라서
    //user스키마에서 password의 정보만이 변경될 때에만 암호화해주는 조건식 추가
    if (user.isModified('password')) {

        //비밀번호를 암호화시킨다
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            //유저가 입력한 순수한 비밀번호를
            //myPlaintextPassword(user.password)에 넣어준다
            //hash -> 암호화된 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next (err)
                //오류가 안나면 hash로 변경
                user.password = hash
                next()
            });
        });
    } else {
        //password 이외의 내용이라면 index의 /register로 넘겨준다.
        next()
    }
})

//cb -> callback
userschema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword -> 1234567   암호화된 비밀번호 ->  (가정)hsjdadadyehiahdasl
    //두가지가 맞는 지 체크한다

    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err),
            //같으면 err는 null, match된다.
            cb(null, isMatch)

    })
}

userschema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    //'secretToken'을 넣어서 user._id가 나온다.
    var token = jwt.sign(user._id, 'secretToken')

    //user._id + 'secretToken' = token
    //-> 
    //'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        //여기에서 user정보는 index의 generateToken의 user
        cb(null, user)
    })
}

userschema.statics.findByToken = function (token, cb) {
    var user = this;


    //user._id + '' = token
    //토큰을 decode 한다. -> decoded는 user._id
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne ({
            "_id": decoded,
            "token": token
        }, function(err, user){
            if (err) return cb (err);
            cb(null, user);
        })
    })
}


const User = mongoose.model ('User', userschema)

module.exports = { User }