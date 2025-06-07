// generateRedirects.js
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const redirectsPath = path.join(publicDir, '_redirects');
const redirectsContent = '/*    /index.html   200\n';

// public 디렉터리가 없으면 생성
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('✅ public/ 폴더 생성됨');
}

// _redirects 파일 생성
fs.writeFileSync(redirectsPath, redirectsContent);
console.log('✅ public/_redirects 파일 생성 완료!');
