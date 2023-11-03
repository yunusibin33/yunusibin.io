const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(fileUpload());
mongoose.connect('mongodb://localhost:27017/kisiDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Veritabanı şeması
const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: Buffer
});

// Veritabanı modeli
const Person = mongoose.model('Person', personSchema);

app.use(express.json());
app.use(express.static('public'));

app.post('/addPerson', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Resim bulunamadı.');
  }

  const image = req.files.image;

  // MongoDB'ye kişiyi ekle
  const newPerson = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: image.data,
  });

  try {
    await newPerson.save();
    res.json({ message: 'Kişi başarıyla eklendi.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kişi eklenirken bir hata oluştu.');
  }
});

// Kişileri getirme endpoint'i
app.get('/getPersons', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kişiler getirilirken bir hata oluştu.');
  }
});

async function getPersonsAndPopulateTable() {
  try {
    // Sonra MongoDB'den kişileri çek ve tabloyu güncelle
    const response = await fetch('http://localhost:3000/getPersons');
    const mongoPersons = await response.json();

    // Yerel depolamadan kişileri çek
    const storedPersons = JSON.parse(localStorage.getItem('persons')) || [];

    // MongoDB'den çekilen kişileri yerel depolamadaki kişilere ekle
    const allPersons = [...storedPersons, ...mongoPersons];

    // Kişileri yerel depolamada sakla
    localStorage.setItem('persons', JSON.stringify(allPersons));

    // Tabloyu temizle
    const tableBody = document.getElementById('personTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    // Kişileri tabloya ekle
    allPersons.forEach(person => {
      addPersonToTable(person.firstName, person.lastName, person.image);
    });
  } catch (error) {
    console.error('Hata:', error);
  }
}


// Server'ı dinle
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
