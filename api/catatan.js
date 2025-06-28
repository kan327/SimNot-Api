import { connect } from './db';

export default async function handler(req, res) {
  const db = await connect();

  if (req.method === 'GET') {
    const { user_id } = req.query;
    const [rows] = await db.execute(
      'SELECT * FROM catatan WHERE user_id = ?',
      [user_id]
    );
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const { judul, isi, user_id } = req.body;
    const [result] = await db.execute(
      'INSERT INTO catatan (judul, isi, user_id) VALUES (?, ?, ?)',
      [judul, isi, user_id]
    );
    return res.status(201).json({ catatan_id: result.insertId });
  }

  if (req.method === 'PUT') {
    const { catatan_id, judul, isi } = req.body;
    await db.execute(
      'UPDATE catatan SET judul = ?, isi = ? WHERE catatan_id = ?',
      [judul, isi, catatan_id]
    );
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const { catatan_id } = req.query;
    await db.execute('DELETE FROM catatan WHERE catatan_id = ?', [catatan_id]);
    return res.status(200).json({ message: 'Deleted' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
