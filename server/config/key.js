//환경 변수 process.enc.NOSE_ENV가
if (process.env.NODE_ENV === 'production') {
    //deploy(배포 한 후)환경이면(production)이면 prod.js에서 불러오기
    module.exports = require('./prod');
} else {
    //local 환경이면 (development) 모듈을 dev.js으로 가져온다.
    module.exports = require('./dev')
}