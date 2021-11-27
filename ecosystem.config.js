module.exports = {
  
  /** 앱 설정 */
  /** - apps 사용되는 옵션
      1. name : 실행 모드 이름
      2. script : 실행되는 파일
      3. instances : 프로세스 수
      4. autorestart : 재시작 on/off
      5. watch : watch on/off
      6. env: Node.js 환경변수
  */
  apps : [{
    name: 'lazybird',
    script: 'app.js',       // 실행할 스크립트 파일
    instances: 1,
    watch: false,
    exec_mode: 'cluster'    // 실행 모드 지정
  }]

  /** 배포설정 */
  /* deploy : {
    production : {
      user : 'SSH_USERNAME',      // 접속할 계정 SSH 사용하여  서버 접속
      host : 'SSH_HOSTMACHINE',   // 서버 도메인 or IP
      ref  : 'origin/master',     // 서버에서 clone할 브랜치
      repo : 'GIT_REPOSITORY',    // git 저장소 url
      path : 'DESTINATION_PATH',  // SSH 접속 옵션
      'pre-deploy-local': '',
      'post-deploy' :             // PM2가 배포(git clone)한 후 실행할 명령어
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  } */
};
