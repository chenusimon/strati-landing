// Este archivo es el único lugar que habla con la base de datos (Vercel KV).
// Vercel KV es como un "localStorage" pero en el servidor: guarda pares
// clave -> valor. Guardamos un objeto por usuario bajo la clave "user:<email>".
//
// Forma del objeto que guardamos para cada usuario:
//   { cart: [{ productId, qty }], orders: [{ id, date, items }] }

import { kv } from '@vercel/kv';

function keyFor(email) {
  return `user:${email.toLowerCase().trim()}`;
}

// Devuelve los datos del usuario. Si no existe todavía, lo crea vacío.
export async function getOrCreateUser(email) {
  const key = keyFor(email);
  let user = await kv.get(key);
  if (!user) {
    user = { email, cart: [], orders: [] };
    await kv.set(key, user);
  }
  return user;
}

export async function saveUser(email, user) {
  await kv.set(keyFor(email), user);
}
