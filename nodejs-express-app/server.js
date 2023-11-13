const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/kullaniciDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  photo: String,
});

// Create a model
const User = mongoose.model('User', userSchema);

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, 'photo-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Define routes
app.post('/api/newuser', upload.single('photo'), (req, res) => {
  const { firstName, lastName } = req.body;
  const photo = req.file.filename;

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    photo: photo,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send('Kullanıcı eklenirken bir hata oluştu!');
    } else {
      res.status(200).json(user);
    }
  });
});

app.get('/api/allusers', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(500).send('Kullanıcılar getirilirken bir hata oluştu!');
    } else {
      res.status(200).json(foundUsers);
    }
  });
});

app.delete('/api/deleteuser/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndRemove(userId, (err) => {
    if (err) {
      res.status(500).send('Kullanıcı silinirken bir hata oluştu!');
    } else {
      res.status(200).json({ message: 'Kullanıcı başarıyla silindi!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} üzerinde çalışıyor`);
});
