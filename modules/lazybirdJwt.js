//npm install rand-token --save
//const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const key = require('../conf/secretKey');
//const redis = require('./redis');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    // 카카오, 구글, 애플 사용자 정보 유효성 확인 후 토근 생성
    sign: async (user) => {
        console.log("----- access token sign -----");
        console.log(user);
        let result;
        
        try {
            if(user.name != undefined && user.email != undefined && user.comp_cd != undefined) {
                result = {
                    code: 200,
                    msg: 'accessToken 발급되었습니다.',
                    //sign메소드를 통해 access token 발급!
                    token: jwt.sign(user, key.secretKey, key.access)
                    // refreshToken: randToken.uid(256)
                };
            } else {
                result = {
                    code: 404,
                    message: '사용자 정보를 찾을 수 없습니다.'
                }
            }

        } catch(err) {
            result = {
                code: 500,
                message: '서버에 문의하세요.',
            }
        }
        console.log(result);
        return result;
    },
    // 클라이언트로 보낸 토큰 값 request 받은 후 재확인
    verify: async (req) => {
        console.log("----- access token verify -----");
        console.log(req);

        const reqToken =  String(req);
        let decoder;
        try {
            // verify를 통해 값 decode!
            decoder = jwt.verify(reqToken, key.secretKey);

        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                decoder = TOKEN_EXPIRED;
                
            } else {
                console.log(err.message);
                decoder = TOKEN_INVALID;
            }
        }
        
        return decoder;
    },

/*  후순위
    // refresh token 발급
    refreshSign: () => {
        console.log("----- refresh token verify -----");

        return jwt.sign({}, key.secretKey, key.refresh);
    },
    // refresh token 검증
    refreshVerify: async (token, user_email) => {
        console.log("----- refresh token verify -----");

        // redis 모듈은 기본적으로 promise를 반환하지않아 promisify를 이용하여 반환하게 해줌
        const getAsync = promisify(redis.get).bind(redis);
        
        try {
            const refreshToken = await getAsync(user_email); // refresh token 가져오기

            if (token === refreshToken) {
                try {
                    jwt.verify(token, key.secretKey);
                    return true;

                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
*/
}