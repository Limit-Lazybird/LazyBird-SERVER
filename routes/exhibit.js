const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();

const jwt = require('../modules/lazybirdJwt');
const err = require('../err');

const oauthModule = require('../modules/oauthModule');
const exhibitModule = require('../modules/exhibitModule');
const customModule = require('../modules/customizedModule');
const constants = require('../constants');


/* 전시 정보 리스트 출력 */
router.post('/list', async(req, res) => {
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
                // 전시 리스트
                exhibitModule.IS_EXHIBIT_LIST(user_email, comp_cd, function(result) {
                    res.send({ exhbtList : result });
                });
            }
        });
    } catch (e) {
        res.send('error');
    }
});

/* 얼리 전시 정보 리스트 출력 */
router.post('/earlyList', async(req, res) => {
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
                // 얼리 전시 리스트 출력
                exhibitModule.IS_EXHIBIT_EARLY_LIST(user_email, comp_cd, function(result) {
                    res.send({ exhbtList : result });
                });
            }
        });
    } catch (e) {
        res.send('error');
    }
});

/* 사용자 맞춤 전시 리스트 출력 */
router.post('/customList', async(req, res) => {
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
                // 사용자 성향 확인 후 전시 코드값 출력
                customModule.IS_USER_CUSTOM_ANSWER_INFO(user_email, comp_cd, function(result) {
                    
                    const customList = result[0].cs_cd;
                    console.log('************* 사용자 성향 확인 후 전시 코드값 출력 ************* ');
                    console.log(customList);

                    // 사용자 맞춤 전시 리스트 출력
                    exhibitModule.IS_EXHIBIT_CUSTOM_LIST(customList, user_email, comp_cd, function(result) {
                        res.send({exhbtList : result});
                    });
                }) 
            }
        });
    } catch (e) {
        res.send('error');
    }
});

/* 상세정보 전시 리스트 출력 (해당 리스트는 중복처리) */
/*router.post('/detailList', async(req, res) => {
    try {
        const token = req.body.token;
        console.log(token);

        const selected_ITEMS = req.body.searchList;
        const searchList = selected_ITEMS.split(',');

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);
        const user_email = decode.email;
        const comp_cd = decode.comp_cd;

        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {
                exhibitModule.IS_EXHIBIT_DETAIL_LIST(searchList, function(result) {
                
                    if(result.length < 1) {
                        res.send('조건에 맞는 전시를 찾을 수 없습니다.');
                    }
                    else {
                        res.send(result);
                    }
                });
            }
        });
    } catch (e) {
        res.send('error');
    }
});*/

/* 상세정보 전시 리스트 출력 */
router.post('/detailList', async(req, res) => {
    try {
        const token = req.body.token;
        console.log(token);

        const selected_ITEMS = req.body.searchList;
        const detailList = selected_ITEMS.split(',');

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);
        const user_email = decode.email;
        const comp_cd = decode.comp_cd;

        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {
                exhibitModule.IS_EXHIBIT_DETAIL_LIST(detailList, user_email, comp_cd, function(result) {
                    if(result.length > 0) {
                        res.send({exhbtList : result});
                    } else {
                        res.send({msg : '조건에 맞는 전시를 찾을 수 없습니다.'});
                    }
                });
            } else {
                res.send({msg : '사용자 정보를 확인해주세요.'});
            }
        });
    } catch (e) {
        res.send('error');
    }
});

/* 검색 전시 리스트 출력 */
router.post('/searchList', async(req, res) => {
    try {
        const token = req.body.token;
        console.log(token);

        const words = req.body.words;

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);
        const user_email = decode.email;
        const comp_cd = decode.comp_cd;

        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result;

            if(userCheck == 1) {
                if(words.trim().length < 1) {
                    res.send({exhbtList : [], msg : '단어를 입력해주세요.'});
                }
                else {
                    exhibitModule.IS_EXHIBIT_SEARCH_LIST(words, user_email, comp_cd, function(result) {
                        if(result.length < 1) {
                            res.send({exhbtList : [], msg : '조건에 맞는 전시를 찾을 수 없습니다.'});
                        }
                        else {
                            res.send({exhbtList : result, msg : 'success'});
                        }
                    });
                }
            }
        });
    } catch (e) {
        res.send('error');
    }
});

/* 최근검색어 조회 */
router.post('/wordList', async(req, res) => {
    try{
        const body = req.body; // 질문 답변 받음
        const token = body.token;

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                exhibitModule.IS_EXHIBIT_RECENT_SELCET(user_email, comp_cd, function(results){
                    res.send({rct_sc_log : results});
                });
            } else {
                res.send({msg : '사용자 정보를 확인해주세요.'});
            }
        });
    }
    catch(e){
        res.send('error ::: ' + e);
    }
});

/* 최근검색어 삭제 */
router.post('/wordDel', async(req, res) => {
    try{
        const body = req.body; // 질문 답변 받음
        const token = body.token;
        const selectWords = body.selectWords;

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                exhibitModule.IS_EXHIBIT_RECENT_DELETE(user_email, comp_cd, selectWords, function(results){
                    if(result){
                        res.send({code : 200, msg : 'deleteSuccess'});
                    }
                    else{
                        res.send({code : 400, msg : 'deleteFail'});
                    }
                });
            }
        });
    }
    catch(e){
        res.send('error ::: ' + e);
    }
});

/* 최근검색어 추가 */
router.post('/wordSave', async(req, res) => {
    try{
        const body = req.body; // 질문 답변 받음
        const token = body.token;
        const newWord = body.selectWords;

        // 토큰 유효성 체크
        const decode =  await jwt.verify(token);

        const user_email = decode.email;
        const comp_cd = decode.comp_cd;
        
        // 사용자 정보 존재하는지 디비에서 확인
        oauthModule.IS_USER_CHECK(user_email, comp_cd, function(result) {
            const userCheck = result; // 유저정보 맞는지 확인

            if(userCheck == 1) {
                exhibitModule.IS_EXHIBIT_RECENT_INSERT(user_email, comp_cd, newWord, function(result){
                    if(result){
                        res.send({code : 200, msg : 'insertSuccess'});
                    }
                    else{
                        res.send({code : 400, msg : 'insertFail'});
                    }
                });
    
            }
        });
    }
    catch(e){
        res.send('error ::: ' + e);
    }
});

module.exports = router;