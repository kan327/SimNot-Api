// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// app.use(express.json());

// const HOST = process.env.DB_HOST || 'tramway.proxy.rlwy.net';
// const PORT = process.env.DB_PORT || 57989;
// const USER = process.env.DB_USER || 'root';
// const PASS = process.env.DB_PASS || 'pkTNePlkjblmgkKsSZVojOxUgulITkuR';
// const NAME = process.env.DB_NAME || 'railway';

// // Koneksi database
// const db = mysql.createConnection({
//   host: HOST, // ganti atau pakai .env di lokal
//   user: USER,
//   port: PORT,
//   password: PASS,
//   database: NAME
// });

// function sendResponse(res, { status = true, message = '', data = {}, errorData = {} }, httpStatusCode = 200) {
//   return res.status(httpStatusCode).json({
//     status,
//     message,
//     data,
//     errorData
//   });
// }

// app.get('/api/ping', (req, res) => {
//   res.json({
//     message: 'pong',
//     env: {
//       DB_HOST: process.env.DB_HOST,
//       DB_NAME: process.env.DB_NAME
//     }
//   });
// });


// app.get('/', (req, res) => {
//   sendResponse(res, {
//     message: '🚀 Welcome to My SimNot API!',
//     data: {
//       status: '✅ ON',
//       appName: '📝 SimNot',
//       version: '1.0.0',
//       timestamp: new Date().toISOString(),
//       createdBy: {
//         name: 'Kan327',
//         github: 'https://github.com/kan327',
//         website: 'https://kan327.github.io'
//       },
//       description: 'A simple and powerful API for managing personal notes and users.',
//       endpoints: {
//         users: {
//           path: '/api/users',
//           description: '👤 Manage user registration, login, and profiles'
//         },
//         catatan: {
//           path: '/api/catatan',
//           description: '🗒️ CRUD operations for notes'
//         }
//       },
//       documentation: '📚 Visit https://github.com/kan327/SimNot-Api/tree/main for full API documentation'
//     }
//   });
// });



// // User ===========================================================================================
// app.get('/api/users', (req, res) => {
//   const { email } = req.query;

//   let sql = 'SELECT * FROM user';
//   const values = [];

//   if (email) {
//     sql += ' WHERE email = ?';
//     values.push(email);
//   }

//   db.query(sql, values, (err, results) => {
//     if (err) return sendResponse(res, {
//       status: false,
//       message: 'Database error',
//       errorData: err
//     }, 500);
    
//     sendResponse(res, {
//       message: 'User list retrieved',
//       data: results
//     });
//   });
// });


// app.get('/api/users/:id', (req, res) => {
//   db.query('SELECT * FROM user WHERE user_id = ?', [req.params.id], (err, results) => {
//     if (err) return sendResponse(res, {
//       status: false,
//       message: 'Database error',
//       errorData: err
//     }, 500);

//     if (results.length === 0) return sendResponse(res, {
//       status: false,
//       message: 'User not found'
//     }, 404);

//     sendResponse(res, {
//       message: 'User found',
//       data: results[0]
//     });
//   });
// });

// app.post('/api/users', (req, res) => {
//   const { email, password, user_name } = req.body;
//   db.query(
//     'INSERT INTO user (email, password, user_name) VALUES (?, ?, ?)',
//     [email, password, user_name],
//     (err, result) => {
//       if (err) return sendResponse(res, {
//         status: false,
//         message: 'Failed to create user',
//         errorData: err
//       }, 500);

//       sendResponse(res, {
//         message: 'User created successfully',
//         data: { user_id: result.insertId }
//       }, 201);
//     }
//   );
// });

// app.put('/api/users/:id', (req, res) => {
//   const { email, password, user_name } = req.body;
//   const { id } = req.params;

//   db.query(
//     'UPDATE user SET email = ?, password = ?, user_name = ? WHERE user_id = ?',
//     [email, password, user_name, id],
//     (err, result) => {
//       if (err) return sendResponse(res, {
//         status: false,
//         message: 'Failed to update user',
//         errorData: err
//       }, 500);

//       if (result.affectedRows === 0) return sendResponse(res, {
//         status: false,
//         message: 'User not found'
//       }, 404);

//       sendResponse(res, {
//         message: 'User updated successfully'
//       });
//     }
//   );
// });
// // ================================================================================================

// // Catatan ========================================================================================
// app.get('/api/catatan', (req, res) => {
//   const { user_id, title } = req.query;

//   let sql = 'SELECT * FROM catatan';
//   const conditions = [];
//   const values = [];

//   if (user_id) {
//     conditions.push('user_id = ?');
//     values.push(user_id);
//   }

//   if (title) {
//     conditions.push('title LIKE ?');
//     values.push(`%${title}%`);
//   }

//   if (conditions.length > 0) {
//     sql += ' WHERE ' + conditions.join(' AND ');
//   }

//   db.query(sql, values, (err, results) => {
//     if (err) return sendResponse(res, {
//       status: false,
//       message: 'Gagal mengambil data catatan',
//       errorData: err
//     }, 500);

//     sendResponse(res, {
//       message: 'Berhasil mengambil data catatan',
//       data: results
//     });
//   });
// });


// app.get('/api/catatan/:id', (req, res) => {
//   db.query('SELECT * FROM catatan WHERE catatan_id = ?', [req.params.id], (err, results) => {
//     if (err) return sendResponse(res, {
//       status: false,
//       message: 'Gagal mengambil catatan',
//       errorData: err
//     }, 500);

//     if (results.length === 0) {
//       return sendResponse(res, {
//         status: false,
//         message: 'Catatan tidak ditemukan'
//       }, 404);
//     }

//     sendResponse(res, {
//       message: 'Berhasil mengambil catatan',
//       data: results[0]
//     });
//   });
// });

// app.post('/api/catatan', (req, res) => {
//   const { isi, judul, user_id } = req.body;

//   db.query(
//     'INSERT INTO catatan (isi, judul, user_id) VALUES (?, ?, ?)',
//     [isi, judul, user_id],
//     (err, result) => {
//       if (err) return sendResponse(res, {
//         status: false,
//         message: 'Gagal membuat catatan',
//         errorData: err
//       }, 500);

//       sendResponse(res, {
//         message: 'Catatan berhasil dibuat',
//         data: { catatan_id: result.insertId }
//       }, 201);
//     }
//   );
// });

// app.put('/api/catatan/:id', (req, res) => {
//   const { isi, judul } = req.body;

//   db.query(
//     'UPDATE catatan SET isi = ?, judul = ? WHERE catatan_id = ?',
//     [isi, judul, req.params.id],
//     (err, result) => {
//       if (err) return sendResponse(res, {
//         status: false,
//         message: 'Gagal memperbarui catatan',
//         errorData: err
//       }, 500);

//       sendResponse(res, {
//         message: 'Catatan berhasil diperbarui'
//       });
//     }
//   );
// });

// app.delete('/api/catatan/:id', (req, res) => {
//   db.query('DELETE FROM catatan WHERE catatan_id = ?', [req.params.id], (err, result) => {
//     if (err) return sendResponse(res, {
//       status: false,
//       message: 'Gagal menghapus catatan',
//       errorData: err
//     }, 500);

//     sendResponse(res, {
//       message: 'Catatan berhasil dihapus'
//     });
//   });
// });

// module.exports = app;

// pool db dah
const express = require('express');
const mysql = require('mysql2/promise'); // PENTING: pakai mysql2/promise
const app = express();
app.use(express.json());

// Load ENV atau fallback default
const HOST = process.env.DB_HOST || 'tramway.proxy.rlwy.net';
const PORT = Number(process.env.DB_PORT) || 57989;
const USER = process.env.DB_USER || 'root';
const PASS = process.env.DB_PASS || 'pkTNePlkjblmgkKsSZVojOxUgulITkuR';
const NAME = process.env.DB_NAME || 'railway';

// Gunakan createPool (bukan createConnection)
const pool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASS,
  database: NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Fungsi bantu response
function sendResponse(res, { status = true, message = '', data = {}, errorData = {} }, httpStatusCode = 200) {
  return res.status(httpStatusCode).json({ status, message, data, errorData });
}

// Ping
app.get('/api/ping', (req, res) => {
  res.json({
    message: 'pong',
    env: {
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME
    }
  });
});

// Root endpoint
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

// ======================= USER ===========================
app.get('/api/users', async (req, res) => {
  try {
    const { email } = req.query;
    let sql = 'SELECT * FROM user';
    const values = [];

    if (email) {
      sql += ' WHERE email = ?';
      values.push(email);
    }

    const [results] = await pool.query(sql, values);
    sendResponse(res, { message: 'User list retrieved', data: results });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Database error', errorData: err }, 500);
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM user WHERE user_id = ?', [req.params.id]);
    if (results.length === 0) {
      return sendResponse(res, { status: false, message: 'User not found' }, 404);
    }
    sendResponse(res, { message: 'User found', data: results[0] });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Database error', errorData: err }, 500);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, password, user_name } = req.body;
    const [result] = await pool.query(
      'INSERT INTO user (email, password, user_name) VALUES (?, ?, ?)',
      [email, password, user_name]
    );
    sendResponse(res, {
      message: 'User created successfully',
      data: { user_id: result.insertId }
    }, 201);
  } catch (err) {
    sendResponse(res, { status: false, message: 'Failed to create user', errorData: err }, 500);
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { email, password, user_name } = req.body;
    const { id } = req.params;
    const [result] = await pool.query(
      'UPDATE user SET email = ?, password = ?, user_name = ? WHERE user_id = ?',
      [email, password, user_name, id]
    );

    if (result.affectedRows === 0) {
      return sendResponse(res, { status: false, message: 'User not found' }, 404);
    }

    sendResponse(res, { message: 'User updated successfully' });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Failed to update user', errorData: err }, 500);
  }
});

// ==================== CATATAN ===========================
app.get('/api/catatan', async (req, res) => {
  try {
    const { user_id, title } = req.query;
    let sql = 'SELECT * FROM catatan';
    const conditions = [];
    const values = [];

    if (user_id) {
      conditions.push('user_id = ?');
      values.push(user_id);
    }

    if (title) {
      conditions.push('judul LIKE ?');
      values.push(`%${title}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [results] = await pool.query(sql, values);
    sendResponse(res, { message: 'Berhasil mengambil data catatan', data: results });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Gagal mengambil data catatan', errorData: err }, 500);
  }
});

app.get('/api/catatan/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM catatan WHERE catatan_id = ?', [req.params.id]);
    if (results.length === 0) {
      return sendResponse(res, { status: false, message: 'Catatan tidak ditemukan' }, 404);
    }
    sendResponse(res, { message: 'Berhasil mengambil catatan', data: results[0] });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Gagal mengambil catatan', errorData: err }, 500);
  }
});

app.post('/api/catatan', async (req, res) => {
  try {
    const { isi, judul, user_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO catatan (isi, judul, user_id) VALUES (?, ?, ?)',
      [isi, judul, user_id]
    );
    sendResponse(res, {
      message: 'Catatan berhasil dibuat',
      data: { catatan_id: result.insertId }
    }, 201);
  } catch (err) {
    sendResponse(res, { status: false, message: 'Gagal membuat catatan', errorData: err }, 500);
  }
});

app.put('/api/catatan/:id', async (req, res) => {
  try {
    const { isi, judul } = req.body;
    const [result] = await pool.query(
      'UPDATE catatan SET isi = ?, judul = ? WHERE catatan_id = ?',
      [isi, judul, req.params.id]
    );
    sendResponse(res, { message: 'Catatan berhasil diperbarui' });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Gagal memperbarui catatan', errorData: err }, 500);
  }
});

app.delete('/api/catatan/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM catatan WHERE catatan_id = ?', [req.params.id]);
    sendResponse(res, { message: 'Catatan berhasil dihapus' });
  } catch (err) {
    sendResponse(res, { status: false, message: 'Gagal menghapus catatan', errorData: err }, 500);
  }
});

module.exports = app;
