const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Eklenen satır

const app = express();
const port = 3000;

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
});

// JSON verileri okumak için middleware
app.use(express.json());

// Kullanıcı ekleme endpoint'i
app.post('/api/newuser', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const user = new User({ firstName, lastName });
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

// Public dizinindeki dosyaları servis etmek için
app.use(express.static(path.join(__dirname, 'public')));

// Server'ı dinle
app.listen(port, () => {
  console.log(`Server http://localhost:${port} üzerinde çalışıyor`);
});
