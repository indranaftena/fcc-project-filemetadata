const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { unlink } = require('node:fs');

const app = express();

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // delete file to prevent storage run out
  unlink(req.file.path, (err) => {
    if (err) throw err;
    console.log(req.file.originalname, 'or', req.file.filename, 'is deleted');
  });
  // response
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
