const express = require('express');
const path = require('path');

const uploadRouter = require('./routes/upload.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({
    message: err.message || '서버 오류'
  });
});

module.exports = app;
