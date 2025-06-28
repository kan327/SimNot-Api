import { connect } from './db';

export default async function handler(req, res) {
  const db = await connect();

  try {
    if (req.method === 'GET') {
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
      }

      const [rows] = await db.execute(
        'SELECT * FROM catatan WHERE user_id = ?',
        [user_id]
      );
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { judul, isi, user_id } = req.body;

      if (!judul || !isi || !user_id) {
        return res.status(400).json({ error: 'judul, isi, and user_id are required' });
      }

      const [result] = await db.execute(
        'INSERT INTO catatan (judul, isi, user_id) VALUES (?, ?, ?)',
        [judul, isi, user_id]
      );
      return res.status(201).json({ catatan_id: result.insertId });
    }

    if (req.method === 'PUT') {
      const { catatan_id, judul, isi } = req.body;

      if (!catatan_id || !judul || !isi) {
        return res.status(400).json({ error: 'catatan_id, judul, and isi are required' });
      }

      await db.execute(
        'UPDATE catatan SET judul = ?, isi = ? WHERE catatan_id = ?',
        [judul, isi, catatan_id]
      );
      return res.status(200).json({ message: 'Updated' });
    }

    if (req.method === 'DELETE') {
      const { catatan_id } = req.query;

      if (!catatan_id) {
        return res.status(400).json({ error: 'catatan_id is required' });
      }

      await db.execute('DELETE FROM catatan WHERE catatan_id = ?', [catatan_id]);
      return res.status(200).json({ message: 'Deleted' });
    }

    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
