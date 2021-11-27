const constants = require('../constants');
const err = require("../err");

const exhibitQuery = require('../query/exhibitQuery');

function IS_EXHIBIT_LIST(user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_LIST");

    exhibitQuery.EXHIBIT_LIST_SELECT(user_email, comp_cd, function(result) {
        callback(result);
    });
}

function IS_EXHIBIT_EARLY_LIST(customList, user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_EARLY_LIST");

    exhibitQuery.EXHIBIT_EARLY_LIST_SELECT(customList, user_email, comp_cd, function(result) {
        callback(result);
    });
}

function IS_EXHIBIT_CUSTOM_LIST(customList, user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_CUSTOM_LIST");

    exhibitQuery.EXHIBIT_CUSTOM_LIST_SELECT(customList, user_email, comp_cd, function(result) {
        callback(result);
    });
}

//선택 리스트가 한개면 해당하는 것만 보여줌
//선택 개수가 여러개면 겹치는 것만 보여줌
/*function IS_EXHIBIT_DETAIL_LIST(searchList, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_DETAIL_LIST");
    const listLength = searchList.length;

    if(listLength == 1) {
        exhibitQuery.EXHIBIT_DTL_MONO_LIST_SELECT(searchList, function(result) {
            callback(result);
        });
    }
    else {
        exhibitQuery.EXHIBIT_DTL_MONO_LIST_SELECT(searchList, function(result) {
            let firstList = result;
            exhibitQuery.EXHIBIT_DTL_MULTI_LIST_SELECT(firstList, searchList, function(result) {
                callback(result);
            });
        });
    }
}*/
function IS_EXHIBIT_DETAIL_LIST(detailList, user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_DETAIL_LIST");

    exhibitQuery.EXHIBIT_DTL_LIST_SELECT(detailList, user_email, comp_cd, function(result) {
        console.log(result);
        callback(result);
    })

}

function IS_EXHIBIT_SEARCH_LIST(words, user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_SEARCH_LIST");

    exhibitQuery.EXHIBIT_SEARCH_LIST_SELECT(words, user_email, comp_cd, function(result) {
        callback(result);
    });
}

/*  최근검색어 조회* */
function IS_EXHIBIT_RECENT_SELCET(user_email, comp_cd, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_RECENT_SELCET");

    exhibitQuery.RECENT_USER_WORDS_SELECT(user_email, comp_cd, function(result) {
        callback(result);
    });
}

/*  최근검색어 삭제* */
function IS_EXHIBIT_RECENT_DELETE(user_email, comp_cd, selectWord,callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_RECENT_DELETE");

    exhibitQuery.RECENT_USER_WORDS_DELETE(user_email, comp_cd, selectWord,function(result) {
        let deleteSuccess = false;

        if(result) {
            deleteSuccess = true;   
        }
        callback(deleteSuccess);
    });
}
/* 최근검색어 추가 */
function IS_EXHIBIT_RECENT_INSERT(user_email, comp_cd, newWords, callback) {
    console.log("서비스 시작 ::: IS_EXHIBIT_RECENT_INSERT");

    exhibitQuery.RECENT_USER_WORDS_LENGTH(user_email, comp_cd, function(result) {
        let wordLength = result;
        if(wordLength < 10) {
            exhibitQuery.RECENT_USER_WORDS_INSERT(user_email, comp_cd, newWords, function(result) {
                callback(result);
            });
        }
        else {
            exhibitQuery.RECENT_USER_WORDS_SELECT(user_email, comp_cd, function(result) {
                const recentArr = result;
                const deleteWord = recentArr[recentArr.length-1].rct_sc_log;
                
                exhibitQuery.RECENT_USER_WORDS_DELETE(user_email, comp_cd, deleteWord, function(result) {

                    if(result) {
                        exhibitQuery.RECENT_USER_WORDS_INSERT(user_email, comp_cd, newWords, function(result) {
                            callback(result);
                        });
                    }
                });
            });
        }
    });
}

module.exports = {
    IS_EXHIBIT_LIST : IS_EXHIBIT_LIST,
    IS_EXHIBIT_EARLY_LIST : IS_EXHIBIT_EARLY_LIST,
    IS_EXHIBIT_CUSTOM_LIST : IS_EXHIBIT_CUSTOM_LIST,
    IS_EXHIBIT_DETAIL_LIST : IS_EXHIBIT_DETAIL_LIST,
    IS_EXHIBIT_SEARCH_LIST : IS_EXHIBIT_SEARCH_LIST,
    IS_EXHIBIT_RECENT_SELCET : IS_EXHIBIT_RECENT_SELCET,
    IS_EXHIBIT_RECENT_DELETE : IS_EXHIBIT_RECENT_DELETE,
    IS_EXHIBIT_RECENT_INSERT : IS_EXHIBIT_RECENT_INSERT
}