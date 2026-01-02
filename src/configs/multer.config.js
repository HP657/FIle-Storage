const multer = require('multer');
const path = require('path');
const fs = require('fs');

function getUploadFolder(type) {
  const dir = path.join(__dirname, '..', 'uploads', type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const mime = file.mimetype;

    if (mime.startsWith('image/')) {
      cb(null, getUploadFolder('img'));
    } else if (mime.startsWith('video/')) {
      cb(null, getUploadFolder('video'));
    } else {
      cb(new Error('지원하지 않는 파일 형식입니다.'));
    }
  },

  filename(req, file, cb) {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const ext = path.extname(file.originalname);
    const random = Math.floor(Math.random() * 1e5);

    cb(null, `${date}_${time}_${random}${ext}`);
  }
});

module.exports = multer({ storage });
