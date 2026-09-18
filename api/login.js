// POST /api/login   body: { email: string }
//
// Esto es un login MUY simplificado, pensado para un proyecto chico:
// no hay contraseña ni verificación de mail. Si el email no existe todavía,
// se crea un usuario nuevo vacío. Si ya existe, devolvemos sus datos
// (carrito + historial de compras). En una app real acá iría una
// contraseña, un link mágico por mail, etc.

import { getOrCreateUser } from './_lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Falta el email' });
  }

  const user = await getOrCreateUser(email);
  return res.status(200).json(user);
}
