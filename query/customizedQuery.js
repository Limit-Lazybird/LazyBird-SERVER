const getConnection = require('../conf/database');

/* 성향분석 문항 리스트 조회 */
function CUSTOMIZED_QUESTION_SELECT(callback) {
    console.log("문항 리스트 ::: CUSTOMIZED_QUESTION");
    let sql  = 'SELECT cq.cq_index, cq.cq_head, cs.cs_index, cs.cs_head FROM customized_qusetion cq, customized_score cs WHERE  cq.cq_index = cs.cq_index ORDER BY cq.cq_index, cs.cs_index';

    getConnection((conn) => {
        conn.query(sql, (err, results) => {
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

/* USE_YN 업데이트(N -> Y) */
function CUSTOMIZED_USE_UPDATE(user_email, comp_cd, callback) {
    console.log("문항 리스트 ::: CUSTOMIZED_USE_UPDATE");
    let sql  = 'UPDATE users SET use_yn = "Y" WHERE user_email = ? AND comp_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd]);
        conn.commit();
        conn.release();
    });
}

/* 성향분석 문항 저장 */
function CUSTOMIZED_QUESTION_SAVE(user_email, comp_cd, answer_idx, callback) {
    console.log("문항 저장 ::: QUESTION SAVE");
    let sql  = 'INSERT INTO customized_answer VALUES(?, ?, ?)';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, answer_idx], (err, results) => {
            console.log(err);
            const insertSuccess = true;
            callback(insertSuccess);
        });
        conn.commit();
        conn.release();
    });
}

/* 성향분석 문항 삭제 */
function CUSTOMIZED_QUESTION_DELETE(user_email, comp_cd, callback) {
    console.log("문항 삭제 ::: QUESTION DELETE");
    let sql  = 'DELETE FROM customized_answer WHERE user_email = ? AND comp_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            const deleteSuccess = true;
            callback(deleteSuccess);
        });
        conn.commit();
        conn.release();
    });
}

/* 성향 확인 후 코드값 출력 */
function CUSTOMIZED_USER_ANSWER_INFO(user_email, comp_cd, callback) {
    console.log("사용자 성향 확인 후 코드값 출력 ::: CUSTOMIZED_USER_ANSWER_INFO");
    let sql  = 'SELECT ehb.cs_cd FROM customized_exhbt ehb JOIN customized_answer asw WHERE asw.user_email = ? AND asw.comp_cd = ? AND ehb.answer_idx = asw.answer_idx ;';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            console.log(results);
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

module.exports = {
    CUSTOMIZED_QUESTION_SELECT : CUSTOMIZED_QUESTION_SELECT,
    CUSTOMIZED_QUESTION_SAVE : CUSTOMIZED_QUESTION_SAVE,
    CUSTOMIZED_QUESTION_DELETE : CUSTOMIZED_QUESTION_DELETE,
    CUSTOMIZED_USE_UPDATE : CUSTOMIZED_USE_UPDATE,
    CUSTOMIZED_USER_ANSWER_INFO : CUSTOMIZED_USER_ANSWER_INFO
}