const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const { db } = require('./model/connection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//read
app.get('/api/kucing', (req, res) => {
  const sqlQuery = "SELECT * FROM kucing";
  db.query(sqlQuery, (err, result) => {

    if (err) {
      console.log("error");
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get('/api/kucing/:id', (req, res) => {
  const Id = req.params.id;

  const sqlQuery = "SELECT * FROM kucing WHERE id = ?";
  db.query(sqlQuery, Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// create
app.post('/api/addKucing', (req, res) => {
  const id = req.body.id;
  const namaKucing = req.body.nama;
  const jenisKucing = req.body.jenis;
  const deskripsi = req.body.desk;
  const gambarKucing = req.body.gambar;

  const sqlQuery = "INSERT INTO kucing (nama, jenis, desk, gambar) VALUE (?, ?, ?, ?)";
  db.query(sqlQuery, [namaKucing, jenisKucing, deskripsi, gambarKucing], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

//tambahkucing
app.post('/api/tambahKucing', (req, res) => {
  const gambar = req.body.gambar;
  const nama = req.body.nama;
  const jenis = req.body.jenis;
  const deskripsi = req.body.desk;
  
  const sqlQuery = "INSERT INTO kucing (gambar, nama, jenis, desk) VALUES (?, ?, ?, ?)";
  db.query(sqlQuery, [gambar, nama, jenis, deskripsi], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal menambahkan data kucing.");
    } else {
      console.log(result);
      res.send("Data kucing berhasil ditambahkan.");
    }
  });
});

// update
app.put('/api/updateKucing/:id', (req, res) => {
  const id = req.params.id;
  const namaKucing = req.body.nama;
  const jenisKucing = req.body.jenis;
  const deskripsi = req.body.desk;
  const gambarKucing = req.body.gambar;

  const sqlQuery = "UPDATE kucing SET nama = ?, jenis = ?, desk = ?, gambar = ? WHERE id = ?";
  db.query(sqlQuery, [namaKucing, jenisKucing, deskripsi, gambarKucing, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Gagal update data kucing' });
    } else {
      res.status(200).json({ message: 'Berhasil update data kucing' });
    }
  });
});


// delete
app.delete('/api/deleteKucing/:id', (req, res) => {
  const Id = req.params.id;

  const sqlQuery = "DELETE FROM kucing WHERE id = ?";
  db.query(sqlQuery, [Id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal menghapus");
    } else {
      console.log(result);
      res.send("Berhasil dihapus.");
    }
  });
});

app.get('/api/user', (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  db.query(sqlQuery, (err, result) => {

    if (err) {
      console.log("error");
    } else {
      res.send(result);
      console.log(result);
    }
  });
});


// Get User By Id
app.get('/api/userId/:id', (req, res) => {
  const userId = req.params.id;

  const sqlQuery = "SELECT * FROM user WHERE id = ?";
  db.query(sqlQuery, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mendapatkan pengguna berdasarkan ID.");
    } else {
      console.log(result);
      if (result.length === 0) {
        res.status(404).send("Pengguna tidak ditemukan.");
      } else {
        res.send(result);
      }
    }
  });
});

//login
app.post('/api/login', (req, res) => {
  const userName = req.body.username;
  const userPassword = req.body.password;

  const sqlQuery = "SELECT * FROM user WHERE username = ?";
  db.query(sqlQuery, [userName], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Terjadi kesalahan saat login.");
    } else {
      if (result.length > 0) {
        // Verifikasi kata sandi
        const storedPassword = result[0].password;
        if (userPassword === storedPassword) {
          // Login berhasil
          res.send("Login berhasil.");
        } else {
          // Kata sandi salah
          res.status(401).send("Kata sandi salah.");
        }
      } else {
        // Pengguna tidak ditemukan
        res.status(404).send("Pengguna tidak ditemukan.");
      }
    }
  });
});

// add User 
  app.post('/api/addUser', (req, res) => {
    const userId = req.body.id
    const userName = req.body.username;
    const userPassword = req.body.password;
  
    const sqlQuery = "INSERT INTO user (username, password) VALUES (?, ?)";
    db.query(sqlQuery, [userName, userPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal menambahkan pengguna.");
      } else {
        console.log(result);
        res.send("Pengguna berhasil ditambahkan.");
      }
    });
  });

  //checkuser
  app.post('/api/checkUsername', (req, res) => {
    const userName = req.body.username;
    const sqlQuery = "SELECT * FROM user WHERE username = ?";
    db.query(sqlQuery, [userName], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Terjadi kesalahan dalam memeriksa username.");
      } else {
        if (result.length > 0) {
          // Username telah ada dalam database
          res.json({ exists: true });
        } else {
          // Username belum ada dalam database
          res.json({ exists: false });
        }
      }
    });
  });
  

  // Update Users
  app.put('/api/updateUser', (req, res) => {
    const id = req.body.id;
    const userName = req.body.username;
    const userPassword = req.body.password;
  
    const sqlQuery = "UPDATE user SET username = ?, password = ? WHERE id = ?";
    db.query(sqlQuery, [userName, userPassword, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  //delete Users
  app.delete('/api/deleteUser/:id', (req, res) => {
    const id = req.params.id;
  
    const sqlQuery = "DELETE FROM user WHERE id = ?";
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal menghapus user.");
      } else {
        console.log(result);
        res.send("User berhasil dihapus.");
      }
    });
  });

app.listen(3000, () => {
  console.log('server berhasil pada port 3000');
});