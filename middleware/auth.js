const { User } = require("../server/models/User");

let auth = (req, res, next) => {

    //인증 처리를 하는 곳


    //1. client cookie 에서 token을 가져온다.
    let token = req.cookies.x_auth;

    //2. 토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        //유저가 없으면
        if (!user) return res.json ({
            isAuth: false,
            error: true
        })
        //유저가 있으면 ->
        //index.js에서 middleware인 auth에서 req로 넘어갈 때 user, token정보를 넘겨준다
        req.token = token;
        req.user = user;
        //index.js에서 middleware인 auth에서 다음으로 넘어갈 수 있게 언급
        next()
    })

    //3. 유저가 있으면 인증 okay

    //4. 유저가 없으면 인증 no!
}

module.exports = {auth};