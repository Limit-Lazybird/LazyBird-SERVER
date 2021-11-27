const constants = require('../constants');
const err = require("../err");

const exhbtStatusQuery = require('../query/exhbtStatusQuery');

/*  찜한 전시 저장 */
function IS_LIKE_EXHBT_SAVE(user_email, comp_cd, exhbt_cd, like_yn, callback) {
    console.log("서비스 시작 ::: IS_LIKE_EXHBT_SAVE");

    exhbtStatusQuery.EXHBT_STATUS_LIKE_SAVE(user_email, comp_cd, exhbt_cd, like_yn, function(result) {
        callback(result);
    });
}

/*  찜한 전시 삭제 */
function IS_LIKE_EXHBT_DELETE(user_email, comp_cd, exhbt_cd, callback) {
    console.log("서비스 시작 ::: IS_LIKE_EXHBT_DELETE");

    exhbtStatusQuery.EXHBT_STATUS_LIKE_DELETE(user_email, comp_cd, exhbt_cd, function(result) {
        callback(result);
    });
}

/*  찜한 전시 리스트 출력 */
function IS_LIKE_EXHBT_LIST(user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_LIKE_EXHBT_LIST");

    exhbtStatusQuery.EXHBT_STATUS_LIKE_LIST(user_email, comp_cd, function(result) {
        callback(result);
    });
}


/*  예약 전시 저장 */
function IS_RESERVATION_EXHBT_SAVE(user_email, comp_cd, exhbt_cd, state_cd, callback) {
    console.log("서비스 시작 ::: IS_RESERVATION_EXHBT_SAVE");

    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_SAVE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
        callback(result);
    });
}

/*  예약 전시 삭제(=코드값 수정) */
function IS_RESERVATION_EXHBT_DELETE(user_email, comp_cd, exhbt_cd, state_cd, callback) {
    console.log("서비스 시작 ::: IS_RESERVATION_EXHBT_DELETE");

    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_DELETE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
        callback(result);
    });
}

/*  예약 전시 리스트 */
function IS_RESERVATION_EXHBT_SELECT(user_email, comp_cd, state_cd, callback) {
    console.log("서비스 시작 ::: IS_RESERVATION_EXHBT_SELECT");

    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_SELECT(user_email, comp_cd, state_cd, function(result) {
        callback(result);
    });
}

module.exports = {
    IS_LIKE_EXHBT_SAVE : IS_LIKE_EXHBT_SAVE,
    IS_LIKE_EXHBT_DELETE : IS_LIKE_EXHBT_DELETE,
    IS_LIKE_EXHBT_LIST : IS_LIKE_EXHBT_LIST,
    IS_RESERVATION_EXHBT_SAVE : IS_RESERVATION_EXHBT_SAVE,
    IS_RESERVATION_EXHBT_DELETE : IS_RESERVATION_EXHBT_DELETE,
    IS_RESERVATION_EXHBT_SELECT : IS_RESERVATION_EXHBT_SELECT
}