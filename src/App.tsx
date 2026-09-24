import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Home from './pages/Home';
import Carta from './pages/Carta';
import ComprarCafe from './pages/ComprarCafe';
import ComprarMerch from './pages/ComprarMerch';
import ProductDetail from './pages/ProductDetail';
import Pedidos from './pages/Pedidos';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Account from './pages/Account';

function SiteHeader() {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  return <Header />;
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/comprar-cafe" element={<ComprarCafe />} />
          <Route path="/comprar-merch" element={<ComprarMerch />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/cuenta" element={<Account />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
