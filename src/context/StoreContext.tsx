import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// ---- Tipos de datos ----
// Guardamos qué producto y cuántas unidades hay en el carrito.
export interface CartItem {
  productId: string;
  qty: number;
}

// Un pedido ya confirmado (lo que antes era el carrito, con fecha).
export interface Order {
  id: string;
  date: string;
  items: CartItem[];
}

interface StoreContextValue {
  email: string | null;
  cart: CartItem[];
  orders: Order[];
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  checkout: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

// Clave que usamos en localStorage solo para recordar "quién está
// logueado" entre recargas de página. El carrito y los pedidos en sí
// viven en el servidor (Vercel KV), no acá.
const SESSION_KEY = 'strati_email';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Al cargar la página, si ya había una sesión guardada, la restauramos
  // pidiéndole los datos al servidor de nuevo (login es "crear o buscar",
  // así que llamarlo de nuevo acá es seguro).
  useEffect(() => {
    const savedEmail = localStorage.getItem(SESSION_KEY);
    if (savedEmail) {
      login(savedEmail).catch(() => {
        /* si falla (por ejemplo sin conexión al backend), seguimos deslogueados */
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(newEmail: string) {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail }),
      });
      if (!res.ok) throw new Error('No se pudo iniciar sesión');
      const data = await res.json();
      setEmail(data.email);
      setCart(data.cart || []);
      setOrders(data.orders || []);
      localStorage.setItem(SESSION_KEY, data.email);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setEmail(null);
    setCart([]);
    setOrders([]);
    localStorage.removeItem(SESSION_KEY);
  }

  // Guarda el carrito actualizado en el servidor.
  async function saveCart(newCart: CartItem[]) {
    setCart(newCart); // actualizamos la pantalla al toque
    if (!email) return;
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cart: newCart }),
    });
  }

  async function addToCart(productId: string) {
    const existing = cart.find((item) => item.productId === productId);
    const newCart = existing
      ? cart.map((item) => (item.productId === productId ? { ...item, qty: item.qty + 1 } : item))
      : [...cart, { productId, qty: 1 }];
    await saveCart(newCart);
  }

  async function removeFromCart(productId: string) {
    const newCart = cart.filter((item) => item.productId !== productId);
    await saveCart(newCart);
  }

  async function checkout() {
    if (!email) return;
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('No se pudo confirmar la compra');
    const data = await res.json();
    setCart(data.cart || []);
    setOrders(data.orders || []);
  }

  const value: StoreContextValue = {
    email,
    cart,
    orders,
    loading,
    login,
    logout,
    addToCart,
    removeFromCart,
    checkout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// Hook para usar el contexto desde cualquier componente:
//   const { email, cart, addToCart } = useStore();
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return ctx;
}
