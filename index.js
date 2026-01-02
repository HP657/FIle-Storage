const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

function getUploadFolder(type) {
  const dir = path.join(__dirname, 'uploads', type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mime = file.mimetype;
    let type = '';

    if (mime.startsWith('image/')) {
      type = 'img';
    } else if (mime.startsWith('video/')) {
      type = 'video';
    } else {
      return cb(new Error('지원하지 않는 파일 형식입니다.'));
    }

    const dir = getUploadFolder(type);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const date = now.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, ''); // HHmmss
    const random = Math.floor(Math.random() * 1e5);
    const ext = path.extname(file.originalname);
    cb(null, `${date}_${time}_${random}${ext}`);
  }
});

const upload = multer({ storage });

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('media'), (req, res) => {
  if (!req.file) return res.status(400).send('파일이 없습니다.');

  const relativePath = req.file.path.split('uploads')[1].replace(/\\/g, '/');
  const fileUrl = `${req.protocol}://${req.get('host')}/static${relativePath}`;

  res.json({ url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행!`);
});
