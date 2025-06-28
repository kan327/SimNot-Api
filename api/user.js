import { connect } from './db';

export default async function handler(req, res) {
  const db = await connect();

  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT user_id, email, user_name, date_time FROM user');
      return res.status(200).json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    const { email, password, user_name } = req.body;
    try {
      const [result] = await db.execute(
        'INSERT INTO user (email, password, user_name) VALUES (?, ?, ?)',
        [email, password, user_name]
      );
      return res.status(201).json({ user_id: result.insertId });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'PUT') {
    const { user_id, email, password, user_name } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required for update' });
    }
    try {
      await db.execute(
        'UPDATE user SET email = ?, password = ?, user_name = ? WHERE user_id = ?',
        [email, password, user_name, user_id]
      );
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required for deletion' });
    }
    try {
      await db.execute('DELETE FROM user WHERE user_id = ?', [user_id]);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
