const express = require('express');
const upload = require('../configs/multer.config');

const router = express.Router();

router.post('/', upload.array('media', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: '파일이 없습니다.' });
  }

  const urls = req.files.map(file => {
    const relativePath = file.path
      .split('uploads')[1]
      .replace(/\\/g, '/');

    return `${req.protocol}://${req.get('host')}/static${relativePath}`;
  });

  res.json({
    count: urls.length,
    urls
  });
});


module.exports = router;
