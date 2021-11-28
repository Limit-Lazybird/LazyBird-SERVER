const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const fetch = require('cross-fetch');
const winston = require('winston'); //log library
const logger = winston.createLogger();
const qs = require('qs');
const router = express.Router();

const jwt = require('../modules/lazybirdJwt');
const constants = require('../constants');
const err = require('../err');
const oauthModule = require('../modules/oauthModule');
// const customModule = require('../modules/customizedModule');

const jwtApple = require('jsonwebtoken');

const getUserInfo = async (comp_cd, url, token) => {
    // 카카오 사용자 정보
    if (comp_cd == constants.KAKAO) {
        try {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json());
        } catch (e) {
            logger.info('error', e);
        }
    }
    // 구글 사용자 정보
    else if (comp_cd == constants.GOOGLE) { 
        try {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    'access_token': token // access_token으로 받지만, 실제로는 id_token임
                }),
            }).then(res => res.json());
        } catch (e) {
            logger.info('error', e);
        }
    }
    else {
        const err_info = {
            err_code: err.UNEXPECTED_ERROR_CODE,
            err_msg: err.UNEXPECTED_ERROR_MSG
        }
        console.log('LMOL :: ' + err.UNEXPECTED_ERROR_MSG + ', 에러코드 :: ' + err.UNEXPECTED_ERROR_CODE);
        res.send({ error: err_info });
    }
};

// login/oauth/회사명, req.body  : {comp_cd, token, email, name}
router.post('/login/:coperation', async (req, res) => {
    console.log("login route by.jiwon");
    try {
        const comp_cd = req.body.comp_cd;   // 회사 코드
        const token = req.body.token;       // 토큰값
        const name = req.body.name;         // 사용자 이름

        let useYN = 'Y'; // 성향분석 진행 여부
        let email = '';

        if(comp_cd == constants.KAKAO){
            const userInfoKaKao = await getUserInfo(comp_cd, constants.KAKAO_USER_INFO_URL, token); // API를 통한 유저 검증
            email = String(userInfoKaKao.id);       // 이메일 정보
            console.log('카카오 유저정보 ::: ' + JSON.stringify(userInfoKaKao.id));
        }
        else if(comp_cd == constants.GOOGLE){
            //access_token
            //const userInfoGoogle = await getUserInfo(comp_cd, constants.GOOGLE_USER_INFO_URL, token); // API를 통한 유저 검증
            //email = userInfoGoogle.sub
            
            //id_token
            email = String(jwtApple.decode(token).sub);
            console.log('구글 유저정보 ::: ' + JSON.stringify(email));
        }
        
        //JWT 생성 객체
        const enc = {
            comp_cd: comp_cd,
            email: email,
            name: name
        };

        const encRefresh = {
            comp_cd: '04',
            email: 'empty',
            name: 'empty'
        };


        console.log("---------- enc check start ----------");
        console.log(enc);
        console.log("---------- enc check end ----------");

        // 카카오 로그인
        if (comp_cd == constants.KAKAO) {
            oauthModule.IS_NEWUSER(email, name, comp_cd, function(result) { // 신규유저 판단
                oauthModule.IS_USER_CHECK(email, comp_cd, function(count) {
                    if(count > 0) { // 정상적으로 db에 있는 유저라면
                        oauthModule.IS_USE_YN(email, comp_cd, async function(result) { // 성향분석 진행여부 판단
                            useYN = result; // 진행 Y, 미진행 N

                            const jwtToken = await jwt.sign(enc);   // JWT 생성
                            const refreshToken = await jwt.sign(encRefresh);
                            console.log('jwt 발급 완료 ::: ' + JSON.stringify(jwtToken));
                            console.log('refresh 발급 완료 ::: ' + JSON.stringify(refreshToken));
                            console.log('asdasdas :: ' + refreshToken.token);

                            oauthModule.IS_USER_REFRESH_TOKEN(email, comp_cd, refreshToken.token, function(result){
                                if(result){
                                    res.send({jwt: jwtToken, refreshToken: refreshToken.token, useYN : useYN, code : 200, msg : '카카오 로그인 성공하였습니다.'}); // use_YN은 성향분석 여부이나 기존유저, 신규유저 확인용으로도 쓰임
                                }
                                else{
                                    res.send('error');
                                }
                            });
                        });
                    }
                    else {
                        res.send('사용자 없음');
                    }
                });
            });
        }

        // 구글 로그인
        else if (comp_cd == constants.GOOGLE) {
            oauthModule.IS_NEWUSER(email, name, comp_cd, function(result) {// 신규유저 판단
                oauthModule.IS_USER_CHECK(email, comp_cd, function(count) {
                    if(count > 0) { // 정상적으로 db에 있는 유저라면
                        oauthModule.IS_USE_YN(email, comp_cd, async function(result) { // 성향분석 진행여부 판단
                            useYN = result; //진행 Y, 미진행 N
                            
                                
                            const jwtToken = await jwt.sign(enc);   // JWT 생성
                            const refreshToken = await jwt.sign(encRefresh);
                            console.log('jwt 발급 완료 ::: ' + JSON.stringify(jwtToken));
                            console.log('refresh 발급 완료 ::: ' + JSON.stringify(refreshToken));
                            console.log('asdad :: ' + typeof refreshToken.token);

                            oauthModule.IS_USER_REFRESH_TOKEN(email, comp_cd, refreshToken.token, function(result){
                                if(result){
                                    res.send({jwt: jwtToken, refreshToken: refreshToken.token, useYN : useYN, code : 200, msg : '구글 로그인 성공하였습니다.'}); // use_YN은 성향분석 여부이나 기존유저, 신규유저 확인용으로도 쓰임
                                }
                                else{
                                    res.send('error');
                                }
                            });
                        });
                    }
                    else {
                        res.send('사용자 없음');
                    }
                });
            });

        }

        // 애플 로그인
        else if(comp_cd == constants.APPLE) {
            console.log("apple login start!");

            const apple_email = jwtApple.decode(token).email;
            //const apple_name = jwtApple.decode(token).name;
            console.log(apple_email);

            const apple_enc = { // JWT 생성 객체
                comp_cd: comp_cd,
                email: apple_email,
                name: name
            };

            console.log("---------- apple_enc check start ----------");
            console.log(apple_enc);
            console.log("---------- apple_enc check end ------------");

            oauthModule.IS_NEWUSER(apple_email, name, comp_cd, function(result) {// 신규유저 판단
                oauthModule.IS_USER_CHECK(apple_email, comp_cd, function(count) {
                    if(count > 0) { // 정상적으로 db에 있는 유저라면
                        oauthModule.IS_USE_YN(apple_email, comp_cd, async function(result) { // 성향분석 진행여부 판단
                            useYN = result; // 진행 Y, 미진행 N
                                
                            const jwtToken = await jwt.sign(enc);   // JWT 생성
                            const refreshToken = await jwt.sign(encRefresh);
                            console.log('jwt 발급 완료 ::: ' + JSON.stringify(jwtToken));
                            console.log('refresh 발급 완료 ::: ' + JSON.stringify(refreshToken));

                            oauthModule.IS_USER_REFRESH_TOKEN(email, comp_cd, refreshToken.token, function(result){
                                if(result){
                                    res.send({jwt: jwtToken, refreshToken: refreshToken.token, useYN : useYN, code : 200, msg : '애플 로그인 성공하였습니다.'}); // use_YN은 성향분석 여부이나 기존유저, 신규유저 확인용으로도 쓰임
                                }
                                else{
                                    res.send('error');
                                }
                            });
                        });
                    }
                    else {
                        res.send('사용자 없음');
                    }
                });
            });
        }
        else {
            console.log('error !!!!!!');
            res.send({ error: ERROR(err.UNVALID_PARAMETER_MSG, err.UNVALID_PARAMETER_CODE) });
        }
    } catch (e) {
        console.log('catch error!!!!!!');
        res.send({ error: ERROR(err.UNEXPECTED_ERROR_MSG, err.UNEXPECTED_ERROR_CODE) });
    }
});

/* 자동로그인 */
router.post('/autoLogin', async(req, res) => {
    try {
        const TOKEN_EXPIRED = -3;
        const refreshToken = req.body.token;
        console.log(refreshToken);

        oauthModule.IS_USER_COUNT(refreshToken, async function(result){
            if(result < 1){
                res.send('잘못된 토큰 정보');
            }
            else{
                // 토큰 유효성 체크
                const decode =  await jwt.verify(refreshToken);
                console.log(decode);
    
                oauthModule.IS_USER_INFO(refreshToken, async function(result){
                    const comp_cd = result.comp_cd;
                    const email = result.user_email;
                    const name = result.name;

                    console.log(comp_cd + ' ' + email + ' ' + name);

                    if(decode == TOKEN_EXPIRED){ //토큰 만료
                        const clearToken = '';
                        oauthModule.IS_USER_REFRESH_TOKEN(email, comp_cd, clearToken, function(result){
                            res.send({msg : '로그아웃'});
                        });
                    }
                    else{ //토큰 비만료
                        const enc = {
                            comp_cd: comp_cd,
                            email: email,
                            name: name
                        };
                        const jwtToken = await jwt.sign(enc);   // JWT 생성
                        res.send({ jwt: jwtToken }); // use_YN은 성향분석 여부이나 기존유저, 신규유저 확인용으로도 쓰임
                    }
                });
            }
        });
    } catch (e) {
        res.send('error');
    }
});

function ERROR(err_msg, err_code) {
    const err_info = {
        err_msg: err_msg,
        err_code: err_code
    }
    console.log('LMOL :: ' + err_msg + ', 에러코드 :: ' + err_code);
    return err_info;
}

module.exports = router;