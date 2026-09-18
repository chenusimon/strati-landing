// GET  /api/cart?email=...              -> devuelve el carrito del usuario
// POST /api/cart   body: { email, cart } -> reemplaza el carrito guardado

import { getOrCreateUser, saveUser } from './_lib/store.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Falta el email' });
    const user = await getOrCreateUser(email);
    return res.status(200).json({ cart: user.cart });
  }

  if (req.method === 'POST') {
    const { email, cart } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Falta el email' });

    const user = await getOrCreateUser(email);
    user.cart = cart || [];
    await saveUser(email, user);
    return res.status(200).json({ cart: user.cart });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
