const getConnection = require('../conf/database');

/* 찜한 전시 저장 */
function EXHBT_STATUS_LIKE_SAVE(user_email, comp_cd, exhbt_cd, like_yn, callback) {
    console.log("찜한 전시 저장 ::: EXHBT_STATUS_LIKE_SAVE");
    let sql  = 'INSERT INTO exhbt_like VALUES(?, ?, ?, ?)';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, exhbt_cd, like_yn], (err, results) => {
            const msg = 'insertSuccess true';
            callback(msg);
        });
        conn.commit();
        conn.release();
    });
}

/* 찜한 전시 삭제 */
function EXHBT_STATUS_LIKE_DELETE(user_email, comp_cd, exhbt_cd, callback) {
    console.log("찜한 전시 삭제 ::: EXHBT_STATUS_LIKE_DELETE");
    let sql  = 'DELETE FROM exhbt_like WHERE user_email = ? AND comp_cd = ? AND exhbt_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, exhbt_cd], (err, results) => {
            const msg = 'deleteSuccess true';
            callback(msg);
        });
        conn.commit();
        conn.release();
    });
}

/* 찜한 전시 리스트 출력  */
function EXHBT_STATUS_LIKE_LIST(user_email, comp_cd, callback) {
    console.log("찜한 전시 리스트 출력 ::: EXHBT_STATUS_LIKE_LIST");
    let sql  = 'SELECT main.*, sub.like_yn FROM exhbt_info AS main, (SELECT exhbt_cd, like_yn FROM exhbt_like WHERE user_email = ? AND comp_cd = ?) AS sub WHERE main.exhbt_cd = sub.exhbt_cd';

    console.log(user_email, comp_cd);
    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            console.log('---------------- results >> LIKE LIST ----------------');
            console.log(results);
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}


/* 예약 전시 저장 */
function EXHBT_STATUS_RESERVATION_SAVE(user_email, comp_cd, exhbt_cd, state_cd, callback) {
    console.log("예약 전시 저장 ::: EXHBT_STATUS_RESERVATION_SAVE");
    let sql  = 'INSERT INTO user_exhbt_info VALUES(?, ?, ?, ?)';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, exhbt_cd, state_cd], (err, results) => {
            const msg = 'insertSuccess true';
            callback(msg);
        });
        conn.commit();
        conn.release();
    });
}

/* 예약 전시 삭제(=코드값 수정) */
function EXHBT_STATUS_RESERVATION_DELETE(user_email, comp_cd, exhbt_cd, state_cd, callback) {
    console.log("예약 전시 삭제 ::: EXHBT_STATUS_RESERVATION_DELETE");
    let sql  = 'UPDATE user_exhbt_info SET state_cd = 30 WHERE user_email = ? AND comp_cd = ? AND exhbt_cd = ? AND state_cd = ?';
    
    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, exhbt_cd, state_cd], (err, results) => {
            const msg = 'updateSuccess true';
            callback(msg);
        });
        conn.commit();
        conn.release();
    });
}

/* 예약 전시 리스트 */
function EXHBT_STATUS_RESERVATION_SELECT(user_email, comp_cd, state_cd, callback) {
    console.log("예약 전시 리스트 출력 ::: EXHBT_STATUS_RESERVATION_SELECT");
    //let sql = 'SELECT main.* FROM exhbt_info main JOIN user_exhbt_info sub WHERE sub.user_email = ? AND sub.comp_cd = ? AND sub.state_cd = ? AND main.exhbt_cd = sub.exhbt_cd';
    let sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM (SELECT a.* FROM exhbt_info a, user_exhbt_info b WHERE b.user_email = ? AND b.comp_cd = ? AND b.state_cd = ? AND a.exhbt_cd = b.exhbt_cd) AS main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd'
    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, state_cd], (err, results) => {
            console.log('---------------- results >> RESERVATION LIST ----------------');
            console.log(results);
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

module.exports = {
    EXHBT_STATUS_LIKE_SAVE : EXHBT_STATUS_LIKE_SAVE,
    EXHBT_STATUS_LIKE_DELETE : EXHBT_STATUS_LIKE_DELETE,
    EXHBT_STATUS_LIKE_LIST : EXHBT_STATUS_LIKE_LIST,
    EXHBT_STATUS_RESERVATION_SAVE : EXHBT_STATUS_RESERVATION_SAVE,
    EXHBT_STATUS_RESERVATION_DELETE : EXHBT_STATUS_RESERVATION_DELETE,
    EXHBT_STATUS_RESERVATION_SELECT : EXHBT_STATUS_RESERVATION_SELECT
}