const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();

const jwt = require('../modules/lazybirdJwt');
const err = require('../err');

const oauthModule = require('../modules/oauthModule');
const exhbtStatusModule = require('../modules/exhbtStatusModule');

/* 찜한 전시 저장 */
router.post('/likeSave', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const exhbt_cd = body.exhbt_cd;
        const like_yn = body.like_yn;

        console.log('-------------- exhbt_cd check (LIKE-INSERT) --------------');
        console.log(exhbt_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 찜한 전시 저장
                exhbtStatusModule.IS_LIKE_EXHBT_SAVE(user_email, comp_cd, exhbt_cd, like_yn, function(result) {
                    if(result) {
                        res.send({code : 200, msg: '찜한 전시에 대한 저장을 성공하였습니다.'});
                    }
                    else {
                        res.send({code : 400, msg: '찜한 전시에 대한 저장을 실패하였습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 찜한 전시 삭제 */
router.post('/likeDel', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const exhbt_cd = body.exhbt_cd;
        const like_yn = body.like_yn;

        console.log('-------------- exhbt_cd check (LIKE-DELETE) --------------');
        console.log(exhbt_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 찜한 전시 삭제
                exhbtStatusModule.IS_LIKE_EXHBT_DELETE(user_email, comp_cd, exhbt_cd, function(result) {
                    if(result) {
                        res.send({code : 200, msg: '찜한 전시에 대한 삭제를 성공하였습니다.'});
                    }
                    else {
                        res.send({code : 400, msg: '찜한 전시에 대한 삭제를 실패하였습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 찜한 전시 리스트 출력 */
router.post('/likeList', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const state_cd = body.state_cd;

        console.log('-------------- state_cd check (LIKE-LIST) --------------');
        console.log(state_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 찜한 전시 리스트 출력
                exhbtStatusModule.IS_LIKE_EXHBT_LIST(user_email, comp_cd, function(result) {
                    if(result) {
                        res.send({exhbtList : result, code : 200, msg : '찜한 전시 리스트를 찾았습니다.'});
                    }
                    else {
                        res.send({exhbtList : [], code : 400, msg: '찜한 전시 리스트를 찾을 수 없습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 예약 전시 저장 */
router.post('/reservationSave', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const exhbt_cd = body.exhbt_cd;
        const state_cd = body.state_cd;

        console.log('-------------- exhbt_cd check (RESERVATION-INSERT) --------------');
        console.log(exhbt_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 예약 전시 저장
                exhbtStatusModule.IS_RESERVATION_EXHBT_SAVE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
                    const check = result.find;
                    
                    if(result.find == 'overlap') {
                        res.send({code : 200, msg: '해당 전시는 예약이 완료되었습니다.'});
                    } else if(result.find == 'success') {
                        res.send({code : 200, msg: '예약한 전시에 대한 저장을 성공하였습니다.'});
                    }
                    else if(result.find == 'delAndSc') {
                        res.send({code : 400, msg: '예약한 전시에 대한 저장을 실패하였습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 예약 전시 삭제(=코드값 수정) */
router.post('/reservationDel', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const exhbt_cd = body.exhbt_cd;
        const state_cd = body.state_cd;

        console.log('-------------- exhbt_cd check (RESERVATION-DELETE) --------------');
        console.log(exhbt_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 예약 전시 삭제(=코드값 수정)
                exhbtStatusModule.IS_RESERVATION_EXHBT_DELETE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
                    if(result) {
                        res.send({code : 200, msg: '예약한 전시에 대한 삭제를 성공하였습니다.'});
                    }
                    else {
                        res.send({code : 400, msg: '예약한 전시에 대한 삭제을 실패하였습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 예약 전시 리스트 */
router.post('/reservationList', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;
        const state_cd = body.state_cd;

        console.log('-------------- state_cd check (RESERVATION-SELECT) --------------');
        console.log(state_cd);

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                // 예약 전시 리스트
                exhbtStatusModule.IS_RESERVATION_EXHBT_SELECT(user_email, comp_cd, state_cd, function(result) {
                    if(result) {
                        res.send({exhbtList : result, code : 200, msg : '예약한 전시 리스트를 찾았습니다.'});
                    }
                    else {
                        res.send({exhbtList : [], code : 400, msg: '예약한 전시 리스트를 찾을 수 없습니다.'});
                    } 
                });
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

/* 사용자 정보 보내기 */
router.post('/userInfo', async(req, res) => {
    try {
        const body = req.body;
        const token = body.token;

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        const user_nm = decode.name;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                res.send({user_email : user_email, user_nm : user_nm, comp_cd : comp_cd, code : 200, msg : '사용자 정보가 존재합니다.'});
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
    }
});

module.exports = router;