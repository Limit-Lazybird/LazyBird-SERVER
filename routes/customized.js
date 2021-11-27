const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();
const fs = require('fs');

const jwt = require('../modules/lazybirdJwt');
const err = require('../err');

const oauthModule = require('../modules/oauthModule');
const customModule = require('../modules/customizedModule');

// 성향 질문 리스트 가져오기
router.post('/list', async(req, res) => {
    try {
        const token = req.body.token;
        console.log(token);

        // 토큰 유효성 체크  (세션 주고 받을 때 사용 >> 동작하는지 테스트 진행)
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;

        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {
                // ues_yn  update (N -> Y update)
                customModule.IS_USE_UPDATE(user_email, comp_cd);

                // 성향 리스트
                customModule.IS_CUSTOM_LIST(function(result) {
                    res.send({ customList: result });
                });
            } else {
                res.send('error');
            }
        });
    } catch (e) {
        res.send("error");
    }
});

// USER 테이블 USE_YN update (N -> Y)
/*router.post('/useUpdate', async(req, res) => {
    try {
        const token = req.body.token;
        console.log(token);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;

        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {

                // USE_YN UPDATE
                customModule.IS_USE_UPDATE(user_email, comp_cd, function(result) {
                    res.send({ msg: result });
                });
            }
        });
    } catch (e) {
        res.send("error");
    }
});*/

/* 성향 분석 저장 */
router.post('/listSave', async(req, res) => {
    try{
        const body = req.body; // 질문 답변 받음
        const token = body.token;
        const answer_idx = body.answer_idx;

        console.log(answer_idx);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 성향 저장
                customModule.IS_CUSTOM_SAVE(user_email, comp_cd, answer_idx, function(result) {
                    if(result) {
                        res.send({msg: 'insertSuccess'});
                    }
                    else {
                        res.send({msg: 'insertFail'});
                    } 
                });
    
            }
        });
    }
    catch(e){
        res.send("error ::: " + e);
    }
});

/* 성향 분석 삭제 */
router.post('/listDelete', async(req, res) => {
    try{
        const token = req.body.token;
        console.log(token);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);
        console.log(decode);
        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        console.log(user_email);
        console.log(comp_cd);
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {
                // 성향 삭제
                customModule.IS_CUSTOM_DELETE(user_email, comp_cd, function(result) {
                    if(result) {
                        res.send({msg: 'deleteSuccess'});
                    }
                    else {
                        res.send({msg: 'deleteFail'});
                    } 
                });
            } else {
                res.send({msg: '사용자 정보가 존재하지 않습니다.'});
            }
        });
    }
    catch(e) {
        res.send("error ::: " + e);
    }
});

//image 보내기
router.get('/image/:imgName', async(req, res) => {
    const imgName = req.params.imgName;
    const imageList = ['onb1_opt1.png', 'onb1_opt2.png', 'onb2_opt1.png', 'onb2_opt2.png'];
    if(imageList.includes(imgName)) {
        let filePath = './img/' + imgName;
        fs.readFile(filePath, function(err, img) {
            res.writeHead(200, { "Context-Type": "image/png" }); // 보낼 헤더를 만듬
            res.write(img);   // 본문을 만들고
            res.end();  // 클라이언트에게 응답을 전송한다
        });
    }
    else {
        res.send("error");
    }
});

module.exports = router;