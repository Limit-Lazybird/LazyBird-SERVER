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

    // 상태 코드 값이 20으로 존재하면 기존 예약 있다고 메시지 날리기
    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_FIND2(user_email, comp_cd, exhbt_cd, function(result) {
        const count2 = result[0].count;

        if(count2 == 1) {
            callback({find : 'overlap'});

        } else {
            // 상태 코드 값이 30으로 존재하면 삭제 후 전시 예약
            exhbtStatusQuery.EXHBT_STATUS_RESERVATION_FIND(user_email, comp_cd, exhbt_cd, function(result) {
                const count = result[0].count;

                if(count == 0) {
                    // 예약 전시 저장
                    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_SAVE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
                        callback({find : 'success'});
                    });
                } else if(count == 1) {
                    exhbtStatusQuery.EXHBT_STATUS_RESERVATION_REAL_DEL(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
                        console.log('---------jiwon-----------');
                        console.log(result);
                        if(result) {
                            exhbtStatusQuery.EXHBT_STATUS_RESERVATION_SAVE(user_email, comp_cd, exhbt_cd, state_cd, function(result) {
                                callback({find : 'delAndSc'});
                            });
                        }
                    });
                }
            });
        }
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