////////////////얼리버드 전시/////////////

    //분위기 코드
    const MOOD_V1 = '101';
    const MOOD_V2 = '102';
    const MOOD_V3 = '103';
    const MOOD_V4 = '104';
    const MOOD_V5 = '105';
    const MOOD_V6 = '106';
    const MOOD_V7 = '107';

    //작품 코드
    const ART_V1 = '201';
    const ART_V2 = '202';
    const ART_V3 = '203';
    const ART_V4 = '204';
    const ART_V5 = '205';
    const ART_V6 = '206';

    //지역 코드
    const LOCATION_V1 = '301';
    const LOCATION_V2 = '302';
    const LOCATION_V3 = '303';
    const LOCATION_V4 = '304';
    const LOCATION_V5 = '305';
    const LOCATION_V6 = '306';
    const LOCATION_V7 = '307';
    const LOCATION_V8 = '308';

    //전시상태
    const EXHIBIT_STATE_V1 = '401';
    const EXHIBIT_STATE_V2 = '402';
    const EXHIBIT_STATE_V3 = '403';
    const EXHIBIT_STATE_V4 = '404';
    const EXHIBIT_STATE_V5 = '405';

module.exports = Object.freeze({

    //매체별 사용자 정보 api url
    KAKAO_USER_INFO_URL  : 'https://kapi.kakao.com/v2/user/me',
    //GOOGLE_USER_INFO_URL : 'https://www.googleapis.com/oauth2/v1/tokeninfo',
    //GOOGLE_USER_INFO_URL : 'https://www.googleapis.com/userinfo/v2/me',
    GOOGLE_USER_INFO_URL : 'https://www.googleapis.com/oauth2/v3/userinfo',


    //로그인 코드
    KAKAO  : '01',
    GOOGLE : '02',
    APPLE  : '03',

    //유저 성향
    CUSTOM : [
        {
            CUSTOM_INFO : '1.1.1',
            CUSTOM_LIST : [
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '1.1.2',
            CUSTOM_LIST : [
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '1.1.3',
            CUSTOM_LIST : [
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '1.2.1',
            CUSTOM_LIST : [
                MOOD_V3, MOOD_V6, 
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '1.2.2',
            CUSTOM_LIST : [
                MOOD_V2, MOOD_V5, 
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '1.2.3',
            CUSTOM_LIST : [
                MOOD_V1, MOOD_V7, 
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                EXHIBIT_STATE_V2, EXHIBIT_STATE_V4
            ]
        },
        {
            CUSTOM_INFO : '2.1.1',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5]
        },
        {
            CUSTOM_INFO : '2.1.2',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5
            ]
        },
        {
            CUSTOM_INFO : '2.1.3',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V1, MOOD_V2, MOOD_V3, MOOD_V4, MOOD_V5, MOOD_V6, MOOD_V7, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5
            ]
        },
        {
            CUSTOM_INFO : '2.2.1',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V3, MOOD_V6, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5
            ]
        },
        {
            CUSTOM_INFO : '2.2.2',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V2, MOOD_V5, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5
            ]
        },
        {
            CUSTOM_INFO : '2.2.3',
            CUSTOM_LIST : [
                ART_V1, ART_V2, ART_V3, ART_V4, ART_V5, ART_V6, 
                MOOD_V1, MOOD_V7, 
                EXHIBIT_STATE_V1, EXHIBIT_STATE_V3, EXHIBIT_STATE_V4, EXHIBIT_STATE_V5
            ]
        }
    ]

});


/*
* 카카오 유저정보 형태
* {"id":1961193078,"connected_at":"2021-10-23T09:20:49Z","properties":{"nickname":"."},"kakao_account":{"profile_nickname_needs_agreement":false,"profile":{"nickname":"."},"has_email":true,"email_needs_agreement":false,"is_email_valid":true,"is_email_verified":true,"email":"wldnjs08@gmail.com","has_age_range":true,"age_range_needs_agreement":false,"age_range":"20~29","has_gender":true,"gender_needs_agreement":false,"gender":"female"}}
*/

/* 카카오 Authorization 값 */
//pxTz966TUAiZLoomED93-8x9FeLbSyv4QDmFogorDSAAAAF8vJ5rbg

/* 카카오 정보
class Kakao {
    constructor(code) {
        this.url = 'https://kauth.kakao.com/oauth/token';
        this.clientID = '8b4c1c2b5af1d291c9268ce1bc634957';
        this.clientSecret = '';
        this.redirectUri = 'http://localhost:3000/login/oauth/kakao';
        this.code = code;

        // userInfo
        this.userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        console.log("카카오 클래스 생성");
    }
}
*/



/**
 * 구글 토큰 형태
 * {"access_token":"ya29.a0ARrdaM8-6JXTMiBf_ZTjWR3qzfLsrFd1R19BmL7wkuAoQNlh52LG0oo_nH0ip4ksrYssVSBlJMETfE8GDZ43VZUNMpd3cpDVYK8NAi3ubAsjRhmlNrcoWCBIh_njiIZBOFHck-yhHkSmZJY22GSawO71Zy_J",
 * "expires_in":3599,"scope":"https://www.googleapis.com/auth/userinfo.profile",
 * "token_type":"Bearer",
 * "id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJiZDJhYzdjNGM1ZWI4YWRjOGVlZmZiYzhmNWEyZGQ2Y2Y3NTQ1ZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxODQ4NzMyNzg2NzUtaTlqbXJjcWwzM2o0MG1uMnJjYXE4c2Y1amwydHZqZTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxODQ4NzMyNzg2NzUtaTlqbXJjcWwzM2o0MG1uMnJjYXE4c2Y1amwydHZqZTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ3MjIyMDIzMTk4MDE2MDkzMzYiLCJhdF9oYXNoIjoicXlzMjJFbHBfUWtvUXJKZDhiSzJvUSIsIm5hbWUiOiJKaXdvbiBKZW9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpTOFVVY2Y2eVZrOUEyQnEzWGNuTS01QzBtN3AwVDREWTNCM19NeUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiSml3b24iLCJmYW1pbHlfbmFtZSI6Ikplb24iLCJsb2NhbGUiOiJrbyIsImlhdCI6MTYzNTE2NDY4NywiZXhwIjoxNjM1MTY4Mjg3fQ.P-JHn4kFfcwdlVaskMACAQXGfMu5O8gfnXrnFfPqG-5MVZrAquyGVFVY8kJN2DhWpzZx8ej1MLbX2xTbi2tDTHmIfkb5V4CtzD-YJ-Kr6TYrKOPo4cXHtk7hm3dPi3_Hl5bE3E5BDG2QlKlFpoejjSig9zJEyjM87m2IInqHrzZmnexy0X-TskExjrYiXOTdyWPm6Je45tQLRjvf0H4RPLkK4L-MIvnAcLEfLypYPp9fV35aQdxxgF7LU1gVjbucKhK-VOO8Sxu_-WlpeeCMxRyH3X3AAkLzShLwxyp8OariokXr40ZzcCuoBCWrj9rsaVTVuoCX_bYVPnKOMz01sg"}
 */

/** 
 * 구글 유저정보 형태
 * {"issued_to":"184873278675-i9jmrcql33j40mn2rcaq8sf5jl2tvje2.apps.googleusercontent.com","audience":"184873278675-i9jmrcql33j40mn2rcaq8sf5jl2tvje2.apps.googleusercontent.com","user_id":"114722202319801609336","scope":"https://www.googleapis.com/auth/userinfo.profile","expires_in":3598,"access_type":"online"}
 */

/* 구글 정보 
 class Google {
    constructor(code){
        https://www.googleapis.com/oauth2/v1/tokeninfo
        this.url = 'https://www.googleapis.com/oauth2/v4/token';
        this.clientID = '184873278675-i9jmrcql33j40mn2rcaq8sf5jl2tvje2.apps.googleusercontent.com';
        this.redirectUri = 'http://localhost:3000/login/oauth/google';
        this.clientSecret = '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';
        this.code = code;

        this.userInfoUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo';
    }
}
*/

/*
class Apple{
    constructor(code){
        "client_id" = "com.****";
        "team_id"  = "AB1234CDE3";
        "key_id" = "AB12CD123E";
        "redirect_uri" = "http://localhost:3000/login/oauth/apple"
        "private_key_path" = "AuthKey_AB12CD123E.p8"
    }
}*/