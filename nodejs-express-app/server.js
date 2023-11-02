// server.js dosyan
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/kisiDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Veritabanı şeması
const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: Buffer  // Resmi bir Buffer olarak saklıyoruz
});

// Veritabanı modeli
const Person = mongoose.model('Person', personSchema);

// Express middleware'leri
app.use(express.json());



// Kişi ekleme endpoint'i
app.post('/addPerson', async (req, res) => {
  const { firstName, lastName, image } = req.body;

  // MongoDB'ye kişiyi ekle
  const newPerson = new Person({
    firstName,
    lastName,
    image
  });

  try {
    await newPerson.save();
    res.send('Kişi başarıyla eklendi.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kişi eklenirken bir hata oluştu.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
