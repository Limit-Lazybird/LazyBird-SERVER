const constants = require('../constants');
const err = require("../err");

const customizedQuery = require('../query/customizedQuery');

/*  성향분석 리스트 */
function IS_CUSTOM_LIST(callback) {
    console.log("서비스 시작 ::: IS_CUSTOM_LIST");

    customizedQuery.CUSTOMIZED_QUESTION_SELECT(function(result) {
        callback(result);
    });
}

/*  use_yn update(N -> Y) */
function IS_USE_UPDATE(user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_USE_UPDATE");

    customizedQuery.CUSTOMIZED_USE_UPDATE(user_email, comp_cd);
}

/*  사용자별 성향분석 정보 저장 */
function IS_CUSTOM_SAVE(user_email, comp_cd, answer_idx, callback) {
    console.log("서비스 시작 ::: IS_CUSTOM_SAVE");

    customizedQuery.CUSTOMIZED_QUESTION_SAVE(user_email, comp_cd, answer_idx, function(result) {
        callback(result);
    });
}

/*  사용자별 성향분석 정보 삭제 */
function IS_CUSTOM_DELETE(user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_CUSTOM_DELETE");

    customizedQuery.CUSTOMIZED_QUESTION_DELETE(user_email, comp_cd, function(result) {
        callback(result);
    });
}

/*  사용자별 성향 확인 후 전시 코드값 출력 */
function IS_USER_CUSTOM_ANSWER_INFO(user_email, comp_cd, callback) {
    customizedQuery.CUSTOMIZED_USER_ANSWER_INFO(user_email, comp_cd, function(result) {
        callback(result);
    });
}

module.exports = {
    IS_CUSTOM_LIST : IS_CUSTOM_LIST,
    IS_CUSTOM_SAVE : IS_CUSTOM_SAVE,
    IS_CUSTOM_DELETE : IS_CUSTOM_DELETE,
    IS_USE_UPDATE : IS_USE_UPDATE,
    IS_USER_CUSTOM_ANSWER_INFO : IS_USER_CUSTOM_ANSWER_INFO
}