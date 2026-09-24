# Strati Café

Sitio de una sola página (con scroll) más un catálogo de productos, login
de mentira y carrito/historial de compras. React + TypeScript + Vite,
sin backend: todo se guarda en el localStorage del navegador.

## Cómo correrlo

```bash
npm install
npm run dev
```

## Estructura

```
src/
  data/products.ts          catálogo de productos
  context/StoreContext.tsx  login falso + carrito + pedidos (todo en localStorage)
  components/
    Header.tsx
    HeroCarousel.tsx
    SaboresSection.tsx
    CafeSection.tsx
    ProductCard.tsx / ProductGrid.tsx
    SimilarProducts.tsx
    Footer.tsx
    PlaceholderPage.tsx
  pages/
    Home.tsx
    Carta.tsx
    ComprarCafe.tsx
    ComprarMerch.tsx
    ProductDetail.tsx
    Login.tsx
    Cart.tsx
    Account.tsx
    Pedidos.tsx
```

## Login

No hay backend ni contraseña. Poner cualquier email y tocar "Siguiente" o
"Crear cuenta" (hacen lo mismo) guarda el email en localStorage bajo la
clave `strati_email`, y el carrito/pedidos de ese email en otra clave
(`strati_data_<email>`). Toda esta lógica está en
`src/context/StoreContext.tsx`.

## Video de la sección Café

Poner el archivo en:

```
public/videos/cafe.mp4
```

## Logo

`src/assets/images/logo.svg` y `public/favicon.svg`.

## Mapa (Footer)

Embed gratuito de Google Maps, sin API key. Para cambiar la dirección,
editar `MAP_QUERY` en `src/components/Footer.tsx`.

## Catálogo de productos

Todo vive en `src/data/products.ts`. Para agregar un producto: poner la
imagen en `src/assets/images/` y agregar una entrada al array `products`.
