// POST /api/checkout   body: { email }
//
// Toma lo que haya en el carrito del usuario, lo guarda como un pedido
// nuevo dentro de "orders" (con fecha), y vacía el carrito.
// Devuelve el carrito (vacío) y el historial de pedidos actualizado.

import { getOrCreateUser, saveUser } from './_lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Falta el email' });

  const user = await getOrCreateUser(email);

  if (user.cart.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  const newOrder = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    items: user.cart,
  };

  user.orders = [newOrder, ...user.orders];
  user.cart = [];
  await saveUser(email, user);

  return res.status(200).json({ cart: user.cart, orders: user.orders });
}
