const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/kullanicilar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB ile bağlantı sağlandı');
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  photo: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

app.post('/api/newuser', upload.single('photo'), async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    let photo = null;

    if (req.file) {
      photo = req.file.filename;
    }

    const user = new User({ firstName, lastName, photo: photo.replace(/^\//, '') });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Server Error:', error); // Hata konsola yazdırılır
    res.status(500).json({ error: 'Kullanıcı eklenirken bir hata oluştu.' });
  }
});


app.get('/api/allusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcılar getirilirken bir hata oluştu.' });
  }
});

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

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server http://localhost:${port} üzerinde çalışıyor`);
});
