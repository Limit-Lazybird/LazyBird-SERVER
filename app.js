//node_modules 에 있는 express 모듈 불러오기
const express = require("express");
//express는 함수이므로, 반환값을 변수에 저장하여 사용
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//npm install nodemon >> 파일이 업데이트 됐는지 모니터링 후 자동으로 노드 실행

//rest api
const oauthLogin = require('./routes/oauthLogin.js');
const customized = require('./routes/customized.js');
const exhibit = require('./routes/exhibit.js');
const status = require('./routes/exhbtStatus.js');

app.use('/oauth', oauthLogin);
app.use('/customized', customized);
app.use('/exhibit', exhibit);
app.use('/status', status);


app.get('/test', (req, res) => {
    res.send('접속 확인용 : Hello World:) by.jiwon');
});

// http listen port 생성 서버 실행
app.listen(3000, () => console.log('개발이 취미인 jiwon :)'));


module.exports = app;