const constants = require('../constants');
const err = require("../err");
const oauthQuery = require('../query/oauthQuery');

/*  신규 유저, 기존 유저 확인, 1은 기존유저, 0은 신규유저, 이메일,토큰,이름 */
function IS_NEWUSER(user_email, user_nm, comp_cd, callback) {
    console.log("************* 서비스 시작 ::: IS_NEWUSER, (oauthModule) *************");
    let newUser = true; //true(신규유저), false(기존유저)

    oauthQuery.COUNT_USER(user_email, comp_cd, function(result) {
        if(result < 1) { //신규유저
            oauthQuery.INSERT_NEWUSER(user_email, user_nm, comp_cd, function(result) {
                if(result){ //insert 성공
                    newUser = true;
                }
            });
        }
        else { //기존유저
            console.log("사용자 정보 존재합니다.");
            newUser = false;
        }
        console.log("************* 서비스 종료 ::: IS_NEWUSER, (oauthModule) ************* \n\n");
        callback(newUser);
    });
}

/*  신규 사용자라면 성향분석 진행 */
function IS_USE_YN(email, comp_cd, callback) {
    console.log("************* 서비스 시작 ::: IS_USE_YN, (oauthModule) *************");

    oauthQuery.USER_USE_YN_CHECK(email, comp_cd, function(result) {
        console.log("************* 서비스 종료 ::: IS_USE_YN, (oauthModule) ************* \n\n");
        callback(result); //진행 Y, 미진행 N
    });
}

/* 공통사용 :: 사용자 정보 디비에 있는지 확인 */
function IS_USER_CHECK(email, comp_cd, callback) {
    console.log("************* 서비스 시작 ::: IS_USER_CHECK, (oauthModule) *************");

    oauthQuery.COUNT_USER(email, comp_cd, function(result) {
        console.log("************* 서비스 종료 ::: IS_USER_CHECK, (oauthModule) ************* \n\n");
        callback(result); //신규 유저 0, 기존 유저 1
    });
}



module.exports = {
    IS_NEWUSER : IS_NEWUSER,
    IS_USE_YN : IS_USE_YN,
    IS_USER_CHECK : IS_USER_CHECK
}