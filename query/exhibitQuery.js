const getConnection = require('../conf/database');

/* 전시 정보 리스트 조회 */
function EXHIBIT_LIST_SELECT(user_email, comp_cd, callback) {
    console.log("전시 정보 리스트 ::: EXHIBIT_LIST");
    let sql  = 'SELECT main.*, ifnull(like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND user_email = ? AND comp_cd = ? ORDER BY exhbt_cd';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

/* 얼리 전시 정보 문항 리스트 조회 */
function EXHIBIT_EARLY_LIST_SELECT(user_email, comp_cd, callback) {
    console.log("얼리 전시 정보 리스트 ::: EXHIBIT_EARLY_LIST");
    let sql  = 'SELECT main.*, ifnull(like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND user_email = ? AND comp_cd = ? WHERE eb_yn = "Y" ORDER BY exhbt_cd';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

/* 사용자 맞춤 전시 리스트 조회 */
function EXHIBIT_CUSTOM_LIST_SELECT(customList, user_email, comp_cd, callback) {
    console.log("사용자 맞춤 전시 정보 리스트 ::: EXHIBIT_CUSTOM_LIST_SELECT");
    let resultList = [];
    let tmplist = [];

    if(customList != undefined) {

        const count = Object.keys(customList).length - 1;
        for(let customNum = 0; customNum <= count; customNum++) {

            getConnection((conn) => {
                let sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ? WHERE main.exhbt_type_cd_sub LIKE' + conn.escape('%'+customList[customNum]+'%');
                //let sql = 'SELECT * FROM exhbt_info WHERE exhbt_type_cd_sub LIKE' + conn.escape('%'+customList[customNum]+'%');
    
                conn.query(sql, [user_email, comp_cd], (err, results) => {
                    for(let i=0; i<results.length; i++) {
    
                        var listItem = {
                            exhbt_cd : results[i].exhbt_cd,
                            exhbt_nm : results[i].exhbt_nm,
                            exhbt_sub_nm : results[i].exhbt_sub_nm,
                            exhbt_sn : results[i].exhbt_sn,
                            exhbt_lct : results[i].exhbt_lct,
                            exhbt_from_dt : results[i].exhbt_from_dt,
                            exhbt_to_dt : results[i].exhbt_to_dt,
                            exhbt_age : results[i].exhbt_age,
                            exhbt_prc : results[i].exhbt_prc,
                            dc_percent : results[i].dc_percent,
                            dc_prc : results[i].dc_prc,
                            exhbt_expnt : results[i].exhbt_expnt,
                            dt_img : results[i].dt_img,
                            excbt_url : results[i].excbt_url,
                            exhbt_notice : results[i].exhbt_notice,
                            eb_yn : results[i].eb_yn,
                            exhbt_type_cd : results[i].exhbt_type_cd,
                            exhbt_type_cd_sub : results[i].exhbt_type_cd_sub,
                            like_yn : results[i].like_yn
                        }
    
                        if(!tmplist.includes(listItem.exhbt_cd)) {
                            tmplist.push(listItem.exhbt_cd);
                            resultList.push(listItem);
                        }
                    }
                    if(customNum == count) {
                        callback(resultList);
                    }
                });
                conn.commit();
                conn.release();
            });
        }
    } else {
        const msg = '성향분석 먼저 진행해주세요.'
        callback(msg);
    }
}

/* 상세 정보 리스트 조회 */
/*function EXHIBIT_DTL_MONO_LIST_SELECT(searchList, callback) {
    console.log("상세 정보 리스트 ::: EXHIBIT_DETAIL_MONO_LIST_SELECT");
    let resultList = [];
    let sql = 'SELECT * FROM exhbt_info';

    if(searchList != undefined) {
        const SELECTED_ITEM = searchList[0];

        getConnection((conn) => {
            if(SELECTED_ITEM.length > 1) {
                sql = 'SELECT * FROM exhbt_info WHERE exhbt_type_cd_sub LIKE' + conn.escape('%' + SELECTED_ITEM + '%');
            }
            else {
                sql = 'SELECT * FROM exhbt_info WHERE exhbt_type_cd = ' + conn.escape(SELECTED_ITEM);
            }

            conn.query(sql, (err, results) => {
                for(let i = 0; i < results.length; i++) {

                    var listItem = {
                        exhbt_cd : results[i].exhbt_cd,
                        exhbt_nm : results[i].exhbt_nm,
                        exhbt_sub_nm : results[i].exhbt_sub_nm,
                        exhbt_sn : results[i].exhbt_sn,
                        exhbt_lct : results[i].exhbt_lct,
                        exhbt_from_dt : results[i].exhbt_from_dt,
                        exhbt_to_dt : results[i].exhbt_to_dt,
                        exhbt_age : results[i].exhbt_age,
                        exhbt_prc : results[i].exhbt_prc,
                        dc_percent : results[i].dc_percent,
                        dc_prc : results[i].dc_prc,
                        exhbt_expnt : results[i].exhbt_expnt,
                        eb_yn : results[i].eb_yn,
                        exhbt_type_cd : results[i].exhbt_type_cd,
                        exhbt_type_cd_sub : results[i].exhbt_type_cd_sub
                    }
                    resultList.push(listItem);
                }
                console.log(typeof resultList);
                callback(resultList);
            });
            conn.commit();
            conn.release();
        });
    } else {
        const msg = 'searchList undefined';
        callback(msg);
    }
}*/
/* 상세 정보 리스트 조회 */
/*function EXHIBIT_DTL_MULTI_LIST_SELECT(startList, searchList, callback) {
    console.log("상세 정보 리스트 ::: EXHIBIT_DETAIL_MULTI_LIST_SELECT");
    let resultList = [];
    let tmpList1 = [];
    let tmpList2 = [];
    let baseList = startList; // 출력될 수 있는 전체 리스트
    

    if(searchList != undefined) {
        const count = searchList.length - 1; // 선택 개수
        console.log(count);
        for(let searchNum = 1; searchNum <= count; searchNum++) {

            for(var item of baseList){
                tmpList1.push(item.exhbt_cd); // 출력될 수 있는 리스트들의 exhbt_cd
            }

            getConnection((conn) => {
                let SELECTED_ITEM = searchList[searchNum];
                let sql = 'SELECT * FROM exhbt_info';
                if(SELECTED_ITEM.length > 1) { // 선택된 아이템이 무엇인지에 따라 가져오는 리스트가 다름
                    sql = 'SELECT * FROM exhbt_info WHERE exhbt_type_cd_sub LIKE' + conn.escape('%' + SELECTED_ITEM.trim() + '%');
                }
                else {
                    sql = 'SELECT * FROM exhbt_info WHERE exhbt_type_cd = ' + conn.escape(SELECTED_ITEM);
                }
    
                conn.query(sql, (err, results) => {
                    for(let i=0; i<results.length; i++) { // 가져온 리스트 전부 for 문
    
                        let item_exhbt_cd = results[i].exhbt_cd; // 가져온 리스트 exhbt_cd
                        
                        if(tmpList1.includes(item_exhbt_cd)) { // 출력 가능한 리스트에 해당하는 리스트면
                            tmpList2.push(item_exhbt_cd); // templist2 에 임시저장
                        }
                    }
                    tmpList1 = tmpList2; // templist2에 임시저장 된 값들이, 이제부터 출력 가능한 리스트가 됨(중복된 애들만 꺼내야하기 때문)
                    tmpList2 = [];

                    if(searchNum == count) { // 마지막까지 for문 끝나고

                        for(var i=0; i<baseList.length; i++) { // 전체 출력 가능한 애들 중
                            for(var j=0; j<tmpList1.length; j++) { // 최종 출력이 확정된 애들 비교
                                if(baseList[i].exhbt_cd == tmpList1[j]) {  // 해당하는 친구는
                                    resultList.push(baseList[i]); // 결과 리스트에 담기
                                }
                            }
                        }
                        callback(resultList);
                    }
                });
                conn.commit();
                conn.release();
            });
        }
    } else {
        const msg = '공통성향 분석 실패.'
        callback(msg);
    }
}*/
/* 상세정보 조회 리스트 */
function EXHIBIT_DTL_LIST_SELECT(detailList, user_email, comp_cd, callback) {
    console.log("상세 정보 리스트 ::: EXHIBIT_DTL_LIST_SELECT");
    let resultList = [];
    let tmpList = [];
    

    if(detailList != undefined) {
        const count = detailList.length - 1; // 선택 개수
        for(let num = 0; num <= count; num++) {
            getConnection((conn) => {
                let SELECTED_ITEM = detailList[num];
                //let sql = 'SELECT * FROM exhbt_info';
                let sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ?';
                if(SELECTED_ITEM.length > 1) { // 선택된 아이템이 무엇인지에 따라 가져오는 리스트가 다름
                    sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ? WHERE main.exhbt_type_cd_sub LIKE' + conn.escape('%' + SELECTED_ITEM.trim() + '%');
                }
                else {
                    sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ? WHERE main.exhbt_type_cd = ' + conn.escape(SELECTED_ITEM);
                }
                
                conn.query(sql, [user_email, comp_cd], (err, results) => {
                    
                    for(let i=0; i<results.length; i++) { // 가져온 리스트 전부 for 문
                        let item_exhbt_cd = results[i].exhbt_cd; // 가져온 리스트 exhbt_cd
                        
                        if(!tmpList.includes(item_exhbt_cd)) { // 출력 가능한 리스트에 해당하는 리스트면
                            tmpList.push(item_exhbt_cd);
                            resultList.push(results[i]);
                        }
                    }
                    if(num == count) {
                        console.log('3');
                        callback(resultList);
                    }
                });
                conn.commit();
                conn.release();
            });
        }
    } else {
        const msg = '공통성향 분석 실패.'
        callback(msg);
    }
}

/* 검색 전시 리스트 조회 */
function EXHIBIT_SEARCH_LIST_SELECT(words, user_email, comp_cd, callback) {
    console.log("검색 전시 리스트 ::: EXHIBIT_SEARCH_LIST");
    const indexList = ['exhbt_nm', 'exhbt_sub_nm', 'exhbt_lct', 'exhbt_prc', 'exhbt_age', 'exhbt_expnt'];
    const resultList = [];
    let tmplist = [];
    let sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ?';
    const count = indexList.length - 1; //선택 개수

    if(words != undefined) {

        for(let item = 0; item <= count; item++) {
            let columName = indexList[item];
            console.log(item);
            getConnection((conn) => {
                sql = 'SELECT main.*, ifnull(sub.like_yn, "N") AS like_yn FROM exhbt_info main LEFT OUTER JOIN exhbt_like sub ON main.exhbt_cd = sub.exhbt_cd AND sub.user_email = ? AND sub.comp_cd = ? WHERE ' + columName +' LIKE ' + conn.escape('%'+words+'%');
                conn.query(sql, [user_email, comp_cd], (err, results) => {
                    for(let i=0; i<results.length; i++) {
                        var listItem = {
                            exhbt_cd : results[i].exhbt_cd,
                            exhbt_nm : results[i].exhbt_nm,
                            exhbt_sub_nm : results[i].exhbt_sub_nm,
                            exhbt_sn : results[i].exhbt_sn,
                            exhbt_lct : results[i].exhbt_lct,
                            exhbt_from_dt : results[i].exhbt_from_dt,
                            exhbt_to_dt : results[i].exhbt_to_dt,
                            exhbt_age : results[i].exhbt_age,
                            exhbt_prc : results[i].exhbt_prc,
                            dc_percent : results[i].dc_percent,
                            dc_prc : results[i].dc_prc,
                            exhbt_expnt : results[i].exhbt_expnt,
                            dt_img : results[i].dt_img,
                            excbt_url : results[i].excbt_url,
                            exhbt_notice : results[i].exhbt_notice,
                            eb_yn : results[i].eb_yn,
                            exhbt_type_cd : results[i].exhbt_type_cd,
                            exhbt_type_cd_sub : results[i].exhbt_type_cd_sub,
                            like_yn : results[i].like_yn
                        }
                        
                        if(!tmplist.includes(listItem.exhbt_cd)) {
                            tmplist.push(listItem.exhbt_cd);
                            resultList.push(listItem);
                        }
                    }
                    if(item == count) {
                        callback(resultList);
                        console.log("--------------resultList----------------");
                        console.log(resultList);
                    }
                });
            conn.commit();
            conn.release();
            });
        }
    } else {
        const msg = '성향분석 먼저 진행해주세요.'
        callback(msg);
    }
}

/* 최근 검색어 조회 */
function RECENT_USER_WORDS_SELECT(user_email, comp_cd, callback) {
    console.log("최근 검색어 조회 ::: RECENT_USER_WORDS_SELECT");
    let sql  = 'SELECT rct_sc_log FROM recent_search WHERE user_email = ? AND comp_cd = ? ;';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            console.log(results);
            callback(results);
        });
        conn.commit();
        conn.release();
    });
}

/* 최근 검색어 추가 */
function RECENT_USER_WORDS_INSERT(user_email, comp_cd, newWord,callback) {
    console.log("최근 검색어 추가 ::: RECENT_USER_WORDS_INSERT");
    let sql  = 'INSERT INTO recent_search VALUES(?, ?, ?);';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, newWord], (err, results) => {
            const insertSuccess = true;
            callback(insertSuccess);
        });
        conn.commit();
        conn.release();
    });
}

/* 최근 검색어 전체 길이 */
function RECENT_USER_WORDS_LENGTH(user_email, comp_cd, callback) {
    console.log("최근 검색어 길이 ::: RECENT_USER_WORDS_LENGTH");
    let sql  = 'SELECT COUNT(*) AS wordLength FROM recent_search WHERE user_email = ? AND comp_cd = ?';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd], (err, results) => {
            wordLength = results[0].wordLength;
            callback(wordLength);
        });
        conn.commit();
        conn.release();
    });
}

/* 최근 검색어 삭제 */
function RECENT_USER_WORDS_DELETE(user_email, comp_cd, selectWord, callback) {
    console.log("최근 검색어 추가 ::: RECENT_USER_WORDS_DELETE");
    let sql  = 'DELETE FROM recent_search WHERE user_email = ? AND comp_cd = ? AND rct_sc_log = ?';

    getConnection((conn) => {
        conn.query(sql, [user_email, comp_cd, selectWord], (err, results) => {
            console.log('삭제 성공');
            const deleteSuccess = true;
            callback(deleteSuccess);
        });
        conn.commit();
        conn.release();
    });
}

module.exports = {
    EXHIBIT_LIST_SELECT : EXHIBIT_LIST_SELECT,
    EXHIBIT_EARLY_LIST_SELECT : EXHIBIT_EARLY_LIST_SELECT,
    EXHIBIT_CUSTOM_LIST_SELECT : EXHIBIT_CUSTOM_LIST_SELECT,
    /*EXHIBIT_DTL_MONO_LIST_SELECT : EXHIBIT_DTL_MONO_LIST_SELECT,
    EXHIBIT_DTL_MULTI_LIST_SELECT : EXHIBIT_DTL_MULTI_LIST_SELECT,*/
    EXHIBIT_DTL_LIST_SELECT : EXHIBIT_DTL_LIST_SELECT,
    EXHIBIT_SEARCH_LIST_SELECT : EXHIBIT_SEARCH_LIST_SELECT,
    RECENT_USER_WORDS_SELECT : RECENT_USER_WORDS_SELECT,
    RECENT_USER_WORDS_INSERT : RECENT_USER_WORDS_INSERT,
    RECENT_USER_WORDS_LENGTH : RECENT_USER_WORDS_LENGTH,
    RECENT_USER_WORDS_DELETE : RECENT_USER_WORDS_DELETE
}