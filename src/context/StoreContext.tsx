import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface CartItem {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
}

interface StoreContextValue {
  email: string | null;
  cart: CartItem[];
  orders: Order[];
  login: (val: string) => void;
  logout: () => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  checkout: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadData(mail: string) {
  const raw = localStorage.getItem('strati_data_' + mail);
  if (raw) {
    return JSON.parse(raw);
  }
  return { cart: [], orders: [] };
}

function saveData(mail: string, data: any) {
  localStorage.setItem('strati_data_' + mail, JSON.stringify(data));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [email, set_email] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, SetOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('strati_email');
    if (saved) {
      set_email(saved);
      const d = loadData(saved);
      setCart(d.cart);
      SetOrders(d.orders);
    }
  }, []);

  function login(val: string) {
    set_email(val);
    localStorage.setItem('strati_email', val);
    const d = loadData(val);
    setCart(d.cart);
    SetOrders(d.orders);
  }

  function logout() {
    set_email(null);
    setCart([]);
    SetOrders([]);
    localStorage.removeItem('strati_email');
  }

  function persist(newCart: CartItem[], newOrders: Order[]) {
    if (email == null) return;
    saveData(email, { cart: newCart, orders: newOrders });
  }

  function addToCart(id: string) {
    let found = false;
    let i = 0;
    const newCart = [];
    while (i < cart.length) {
      if (cart[i].productId == id) {
        newCart.push({ productId: cart[i].productId, qty: cart[i].qty + 1 });
        found = true;
      } else {
        newCart.push(cart[i]);
      }
      i = i + 1;
    }
    if (found == false) {
      newCart.push({ productId: id, qty: 1 });
    }
    setCart(newCart);
    persist(newCart, orders);
  }

  function removeFromCart(id: string) {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId != id) newCart.push(cart[i]);
    }
    setCart(newCart);
    persist(newCart, orders);
  }

  function checkout() {
    if (cart.length == 0) return;
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart,
    };
    const newOrders = [order, ...orders];
    SetOrders(newOrders);
    setCart([]);
    persist([], newOrders);
  }

  const value = {
    email: email,
    cart: cart,
    orders: orders,
    login: login,
    logout: logout,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    checkout: checkout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('no context');
  return ctx;
}
