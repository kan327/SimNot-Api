const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());


// Koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // ganti atau pakai .env di lokal
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

function sendResponse(res, { status = true, message = '', data = {}, errorData = {} }, httpStatusCode = 200) {
  return res.status(httpStatusCode).json({
    status,
    message,
    data,
    errorData
  });
}

app.get('/', (req, res) => {
  sendResponse(res, {
    message: '🚀 Welcome to My SimNot API!',
    data: {
      status: '✅ ON',
      appName: '📝 SimNot',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      createdBy: {
        name: 'Kan327',
        github: 'https://github.com/kan327',
        website: 'https://kan327.github.io'
      },
      description: 'A simple and powerful API for managing personal notes and users.',
      endpoints: {
        users: {
          path: '/api/users',
          description: '👤 Manage user registration, login, and profiles'
        },
        catatan: {
          path: '/api/catatan',
          description: '🗒️ CRUD operations for notes'
        }
      },
      documentation: '📚 Visit https://github.com/kan327/SimNot-Api/tree/main for full API documentation'
    }
  });
});



// User ===========================================================================================
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return sendResponse(res, {
      status: false,
      message: 'Database error',
      errorData: err
    }, 500);

    sendResponse(res, {
      message: 'User list retrieved',
      data: results
    });
  });
});

app.get('/api/users/:id', (req, res) => {
  db.query('SELECT * FROM user WHERE user_id = ?', [req.params.id], (err, results) => {
    if (err) return sendResponse(res, {
      status: false,
      message: 'Database error',
      errorData: err
    }, 500);

    if (results.length === 0) return sendResponse(res, {
      status: false,
      message: 'User not found'
    }, 404);

    sendResponse(res, {
      message: 'User found',
      data: results[0]
    });
  });
});

// Contoh POST
app.post('/api/users', (req, res) => {
  const { email, password, user_name } = req.body;
  db.query(
    'INSERT INTO user (email, password, user_name) VALUES (?, ?, ?)',
    [email, password, user_name],
    (err, result) => {
      if (err) return sendResponse(res, {
        status: false,
        message: 'Failed to create user',
        errorData: err
      }, 500);

      sendResponse(res, {
        message: 'User created successfully',
        data: { user_id: result.insertId }
      }, 201);
    }
  );
});

// Lanjutkan pola yang sama untuk PUT, DELETE, dan endpoint catatan


module.exports = app;