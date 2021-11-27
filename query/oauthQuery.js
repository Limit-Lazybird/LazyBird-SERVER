const getConnection = require('../conf/database');

/* 신규 사용자 DB insert*/
function INSERT_NEWUSER(user_email, user_nm, comp_cd, callback) {
    console.log("신규유저 INSERT 시작 ::: INSERT_NEWUSER, (oauthQuery)");
    let sql  = 'INSERT INTO users VALUES(?, ?, ?, DEFAULT, DEFAULT) ON DUPLICATE KEY UPDATE user_email=?';
    let complete = false;

    getConnection((conn) => {
        conn.query(sql, [user_email, user_nm, comp_cd, user_email], (err, results) => {
            complete = true;
            console.log("신규유저 INSERT 완료 ::: " + complete);
            callback(complete)
        });
        conn.commit();
        conn.release();
      });
}

/*  신규 유저, 기존 유저 확인, 1은 기존유저, 0은 신규유저 */
/* SELECT COUNT(*) FROM USERS  WHERE user_id  = {user_id} */
function COUNT_USER(user_id, comp_cd, callback) {
    console.log("유저 (신규, 기존) 여부 확인  ::: COUNT_USER, (oauthQuery)");
    let sql  = 'SELECT COUNT(*) AS usercount FROM users WHERE user_email = ? AND comp_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [user_id, comp_cd], (err, results) => {
            usercount = results[0].usercount;
            console.log("유저 (신규 : 0, 기존 : 1) 여부 확인 완료 ::: " + usercount);
            callback(usercount);
        });
        conn.commit();
        conn.release();
    });
}

/* 신규 유저 유무 체크 */
function USER_USE_YN_CHECK(email, comp_cd, callback) {
    console.log("유저 성향분석 진행여부 확인 ::: USER_USE_YN_CHECK, (oauthQuery)");
    let sql  = 'SELECT use_yn FROM users WHERE user_email = ? AND comp_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [email, comp_cd], (err, results) => {
            let use_yn = results[0].use_yn;
            console.log("유저 (신규 : 0, 기존 : 1) 여부 확인 완료 ::: " + usercount);
            callback(use_yn); //진행 Y, 미진행 N
        });
        conn.commit();
        conn.release();
    });
}

module.exports = {
    COUNT_USER : COUNT_USER,
    INSERT_NEWUSER : INSERT_NEWUSER,
    USER_USE_YN_CHECK :USER_USE_YN_CHECK
}