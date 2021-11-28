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
                    if(result) {
                        res.send({exhbtList : result, code : 200, msg : '얼리 전시 리스트를 찾았습니다.'});
                    } else {
                        res.send({exhbtList : [], code : 400, msg : '얼리 전시 리스트를 찾을 수 없습니다.'});
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
                    if(result) {
                        res.send({exhbtList : result, code : 200, msg : '얼리 전시 리스트를 찾았습니다.'});
                    } else {
                        res.send({exhbtList : [], code : 400, msg : '얼리 전시 리스트를 찾을 수 없습니다.'});
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
                        if(result) {
                            res.send({exhbtList : result, code : 200, msg : '사용자 맞춤 전시리스트를 찾았습니다.'});
                        } else {
                            res.send({exhbtList : [], code : 400, msg : '사용자 맞춤 전시리스트를 찾을 수 없습니다.'});
                        }
                    });
                }) 
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
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
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
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
                        res.send({exhbtList : result, code : 200, msg : '선택한 상세 정보 전시 리스트를 찾았습니다.'});
                    } else {
                        res.send({exhbtList : [], code : 400, msg : '선택한 상세 정보 전시 리스트를 찾을 수 없습니다.'});
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
                    res.send({exhbtList : [], code : 500, msg : '단어를 입력하시기 바랍니다.'});
                }
                else {
                    exhibitModule.IS_EXHIBIT_SEARCH_LIST(words, user_email, comp_cd, function(result) {
                        if(result.length < 1) {
                            res.send({exhbtList : [], code : 400, msg : '조건에 맞는 전시 리스트를 찾을 수 없습니다.'});
                        }
                        else {
                            res.send({exhbtList : result, code : 200, msg : '조건에 맞는 전시 리스트를 찾았습니다.'});
                        }
                    });
                }
            } else {
                res.send({code : 100, msg : '로그인이 제대로 이루어지지 않았습니다.'});
            }
        });
    }
    catch(e) {
        res.send({code : 300, msg : '실행할 수 없는 상태입니다.'});
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
                exhibitModule.IS_EXHIBIT_RECENT_SELCET(user_email, comp_cd, function(results) {
                    if(results) {
                        res.send({rct_sc_log : results, code : 200, msg : '최근검색어에 대한 리스트를 조회하였습니다.'});
                    } else {
                        res.send({rct_sc_log : [], code : 400, msg : '최근검색어에 대한 리스트를 조회하지 못했습니다.'});
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
                    if(result) {
                        res.send({code : 200, msg : '최근 검색어에서 제일 오래된 검색어가 삭제되었습니다.'});
                    }
                    else {
                        res.send({code : 400, msg : '최근 검색어에서 제일 오래된 검색어가 삭제되지 않았습니다.'});
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

/* 최근검색어 추가 */
router.post('/wordSave', async(req, res) => {
    try {
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
                exhibitModule.IS_EXHIBIT_RECENT_INSERT(user_email, comp_cd, newWord, function(result) {
                    if(result) {
                        res.send({code : 200, msg : '최근 검색어에 해당 단어가 추가되었습니다.'});
                    }
                    else {
                        res.send({code : 400, msg : '최근 검색어에 해당 단어가 추가되지 않았습니다.'});
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

module.exports = router;