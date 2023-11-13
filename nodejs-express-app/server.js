const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

// CORS middleware
app.use(cors());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/kullanicilar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB ile bağlantı sağlandı');
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });

// Kullanıcı modeli
const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  photo: String,
});

// JSON verileri okumak için middleware
app.use(express.json());

// Resim yükleme için Multer ayarı
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Kullanıcı ekleme endpoint'i
app.post('/api/newuser', upload.single('photo'), async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const user = new User({ firstName, lastName, photo: req.file.filename });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı eklenirken bir hata oluştu.' });
  }
});

// Tüm kullanıcıları listeleme endpoint'i
app.get('/api/allusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcılar getirilirken bir hata oluştu.' });
  }
});

// Kullanıcı silme endpoint'i
app.delete('/api/deleteuser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu.' });
  }
});

// Public dizinindeki dosyaları servis etmek için
app.use(express.static(path.join(__dirname, 'public')));

// Server'ı dinle
app.listen(port, () => {
  console.log(`Server http://localhost:${port} üzerinde çalışıyor`);
});
