import { connect } from './db';

export default async function handler(req, res) {
  const db = await connect();

  if (req.method === 'GET') {
    const [rows] = await db.execute('SELECT user_id, email, user_name, date_time FROM user');
    return res.status(200).json(rows);
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

  res.status(405).json({ message: 'Method Not Allowed' });
}
