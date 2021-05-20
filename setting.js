/*
<server 부분>
1. node js 다운로드 확인 -> node -v
2. 폴더 만들기 -> cd documents
    mkdir "파일 이름" (여기에서는 yoona)
    cd yoona
    npm init (npm 패키지를 만든다)
3. npm install express --save
4. https://expressjs.com/en/starter/hello-world.html
    기본 express.js -> index.js 파일 제작하여 cv
5. pakage.json 에 scripts 안에 "start": "node index.js" 입력 -> fe 실행
6. mongodb 연결 https://expressjs.com/en/starter/hello-world.html
    회원 가입 후 cluster 만들기-> 이때 connection string only 주소 copy
7. mongoose 다운로드 npm install mongoose --save
    index.js에
        const mongoose = require('mongoose')
        mongoose.connect('아까 그 주소-password 입력', {
            useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
        }).then(() => console.log('Mongo DB Connected,,,,'))
        .catch(err => console.log(err))
8. mongodb model과 schema 제작
    model은 schema를 감싸주고 schema는 C2C를 이용할 때 POST writer, title,,,을 설정한다
    models 파일 생성 -> User.js 파일 생성
        const mongoose = require ('mongoose');
        const userschema = mongoose.Schema({
            name : {
                type : String,
                maxlength : 50
            },
            email : {
                type : String,
                //스페이스를 없애주는 역할
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
        const User = mongoose.model ('User', userschema)
        module.exports = { User } //다른 파일에서도 사용가능하게
9. git 설치 여부 확인 -> terminal에서 확인 : git --version
    없으면 다운 https://git-scm.com/
    git 서버에 만든 파일 저장
        new 파일 설정
        but, react 라이브러리 파일은 빼고 -> 공간 차지 너무 많이 함
        따라서 .gitignore 제작 -> node_modules 작성
        git add .
        git status
        git commit-m "메세지" -> git repository 에만 저장 (local)
10. SSH 이용하여 GITHUB 최종 연결
    SSH가 설정되어 있는지 확인 -> terminal -> ls -a ~/.ssh 를 타이핑
        if id_rsa , id_rsa.pub 이 있으면 설정되어 있는 것
        없으면 설정(SSH KEY 만들기) ->
            https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
        SSH KEY 를 SSH Agent로 연결 -> github에 SSH Agent  붙여넣어 연결
        만든 github 파일에 quick setup - ~ repository from the command line 부분 cv
11. client에서 server 로 데이터를 전송할 때 필요한 body-parser Depandency 다운
    npm install body-parser --save
12. nodemon을 이용해 백엔드의 수정 정보를 즉시 나타낸다. -> 자동적으로 서버를 재부팅
    npm install nodemon --save-dev
    pakage.json 파일에 script 속성에 backend 부분 추가
    "backend" : "nodemon index.js",

<client 부분>
13. react 설정하기
    client 폴더 생성 -> terminal 에서 cd client 로 경로 변경
    npx create-react-app .
        if err -> sudo rm -rf $(xcode-select -print-path)
                  xcode-select --install
14. 각각의 component 생성 시 [ES7 React/Redux/GraphQL/React-Native snippets extencions]를 이용해
        rfce(기본 코드 틀 - functional component) 생성
15. 기본적인 웹페이지 인터렉션을 할 때 react router dom 사용
        https://reactrouter.com/web/example/basic -> example code site
        dependancy download -> cd client로 경로 변경
        npm install react-router-dom --save
        위의 페이지 들어가서 20번째 줄 코드부터 끝까지 cv -> app.js(기본 화면 구성 파일 - 여기서는 App.js)
        if navigation_bar를 따로 생성할 거라면 -> code 62 ~ 84까지는 navigation_bar page 파일로 옮겨주어야 함
        ##추천 사항##
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            -> 이러한 path는 <Route exact path = "/dashboard" component = {DashBoardPage} /> 로 축약 가능
16. server 에서 client로 request를 보낼 때 AXIOS를 사용함
        cd client 로 경로 변경 -> npm install axios --save
17. but 두개의 포트를 가지고 있는 서버는 보안 상의 문제로 그냥 서버에 정보를 보낼 수 없으므로 proxy 사용
        https://create-react-app.dev/docs/proxying-api-requests-in-development/
        Configuring the Proxy Manually -> 이 부분을 따라한다 (프록시 임의로 설정)
18. FrontEnd + BackEnd 를 한번에 켤 수 있는 Concurrently 이용 (여러 커맨드를 한번에 작동시킬 수 있는 툴)
        npm install concurrently --save
        pakage.json에서 start와 backend 연동
            "dev" : "concurrently \"npm run backend\" \"npm run start --prefic client\""
19. 디자인을 해서 코드를 그대로 불러올 수 있는 Ant Design 연동
        https://ant.design/
        react dependancy 이므로 cd client로 경로 변경
        npm install antd --save
        이후 client 서버의 index.js에 import 'antd/dist/antd.css';
20. redux - 상태 관련 라이브러리를 다운받는다 -> 
                why? 여러개의 하위 파일에서 생기는 수정 사항을 redux가 받아 동시에 수정 가능하기 때문임
                npm install redux react-redux redux-promise redux-thuck --save
                    -> 1. redux 2. react-redux 3. redux-promise 4. redux-thuck depandency download
                    https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
                    redux 를 좀 더 쉽게 사용 가능한 툴 다운
*/