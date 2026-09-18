# Strati Café — Landing + tienda

Sitio de una sola página (con scroll) más un mini-catálogo de productos, login
simple y carrito/historial de compras. React + TypeScript + Vite en el
frontend, funciones serverless de Vercel + Vercel KV como backend.

## Cómo correrlo

```bash
npm install
npm run dev
```

Esto levanta **solo el frontend** (http://localhost:5173). Las páginas se ven
bien, pero el login/carrito no van a funcionar todavía porque no hay backend
corriendo — ver la sección "Backend" más abajo.

## Estructura del proyecto

```
api/                      -> el backend (funciones serverless de Vercel)
  _lib/store.js              lee/escribe en la base de datos (Vercel KV)
  login.js                   POST /api/login
  cart.js                    GET/POST /api/cart
  checkout.js                POST /api/checkout

src/
  data/products.ts          -> catálogo de productos (tiramisús, cafés, cafeteras, merch)
  context/StoreContext.tsx  -> maneja sesión + carrito + pedidos, habla con /api
  components/
    Header.tsx                 barra fija (logo, nav, carrito, cuenta)
    HeroCarousel.tsx           carrusel 100vh de la home
    SaboresSection.tsx         vidriera de 3 sabores en la home
    CafeSection.tsx            panel de café en la home (con video)
    ProductCard.tsx / ProductGrid.tsx   tarjeta y grilla de producto reutilizables
    SimilarProducts.tsx        carrusel "productos similares"
    Footer.tsx                 logo, redes y mapa
    PlaceholderPage.tsx        página vacía genérica (Pedidos)
  pages/
    Home.tsx                   "/"
    Carta.tsx                  "/carta" — todos los sabores de tiramisú
    ComprarCafe.tsx             "/comprar-cafe" — categoría café
    ComprarMerch.tsx            "/comprar-merch" — categoría merch
    ProductDetail.tsx           "/producto/:id" — ficha de cualquier producto
    Login.tsx                   "/login"
    Cart.tsx                    "/carrito"
    Account.tsx                  "/cuenta" — historial de pedidos
    Pedidos.tsx                  "/pedidos" (vacía)
```

## Cómo funciona el login + carrito (explicado simple)

No hay contraseñas. Es un login bien básico pensado para un proyecto chico:

1. Escribís tu email y tocás "Siguiente" (o "Crear cuenta", hacen lo mismo).
2. El frontend llama a `POST /api/login` con tu email.
3. Esa función mira en la base de datos si ya existe un usuario con ese
   email. Si no existe, lo crea vacío (`{ cart: [], orders: [] }`). Si ya
   existe, devuelve sus datos.
4. El frontend guarda tu email en `localStorage` (para saber quién sos la
   próxima vez que abrís la página) y guarda tu carrito/pedidos en memoria
   (React state), en `StoreContext.tsx`.

Cuando tocás "Comprar ahora" en un producto:
- Si no iniciaste sesión, te manda a `/login` primero.
- Si ya iniciaste sesión, se agrega el producto a tu carrito (`POST
  /api/cart` lo guarda en el servidor) y te lleva a `/carrito`.

Cuando tocás "Confirmar compra" en el carrito:
- Se llama a `POST /api/checkout`. Esa función toma lo que hay en tu
  carrito, lo guarda como un pedido nuevo (con fecha) dentro de tu
  historial, y vacía el carrito.

Todo el "hablar con la base de datos" vive en un solo archivo:
`api/_lib/store.js`. Si querés entender el backend, empezá por ahí.

## Backend: configurar Vercel KV (una sola vez)

El backend necesita una base de datos para poder recordar los usuarios entre
visitas (las funciones serverless no tienen memoria propia). Usamos **Vercel
KV**, que es básicamente un `localStorage` pero en el servidor: guarda pares
clave → valor.

### Pasos para activarlo:

1. Subí este proyecto a Vercel (conectando el repo de GitHub, o con
   `vercel deploy` desde la terminal).
2. En el dashboard de tu proyecto en Vercel, andá a la pestaña **Storage**.
3. Tocá **Create Database** → elegí **KV** (Redis) → seguí los pasos.
4. Cuando la crees, Vercel te va a preguntar a qué proyecto conectarla —
   elegí este proyecto. Con eso alcanza: Vercel agrega automáticamente las
   variables de entorno que necesita el código (`KV_REST_API_URL`,
   `KV_REST_API_TOKEN`, etc.), no hay que copiar ni pegar nada a mano.
5. Volvé a desplegar el proyecto (un nuevo deploy, o simplemente hacé un
   nuevo commit) para que tome las variables nuevas.

Con eso el login y el carrito ya funcionan en producción.

### Probarlo en tu computadora (opcional)

Para probar el login/carrito en tu compu (no solo en Vercel), necesitás la
CLI de Vercel:

```bash
npm install -g vercel
vercel login
vercel link          # conecta esta carpeta con tu proyecto de Vercel
vercel env pull       # descarga las variables de entorno (incluida la de KV)
vercel dev            # levanta frontend + backend juntos, con las funciones /api andando
```

`npm run dev` (sin `vercel dev`) solo levanta el frontend — anda perfecto
para ver el diseño, pero las llamadas a `/api/...` van a fallar porque no
hay ninguna función escuchando ahí.

## Video de la sección Café

Poné el archivo del video acá, con ese nombre exacto:

```
public/videos/cafe.mp4
```

Se usa tanto en la Home (sección Café) como en `/comprar-cafe`. Mientras no
esté el archivo, se ve la foto con un botón de play que, al tocarlo, intenta
reproducir el video (va a mostrar un error de video hasta que subas el
archivo real).

## Logo

`src/assets/images/logo.svg` y `public/favicon.svg` son el mismo archivo
(el logo que nos pasaste). Si lo cambian, hay que reemplazar esos dos.

## Mapa de Google (Footer)

Usa el embed gratuito de Google Maps (no necesita API key). Busca
"Cafetería Strati" como placeholder — para poner la dirección real, editá
`MAP_QUERY` en `src/components/Footer.tsx`. Instrucciones para usar la API
real de Google Maps (con key) están comentadas ahí mismo.

## Catálogo de productos

Todo el catálogo (tiramisús, cafés, cafeteras, merch) vive en un solo
archivo: `src/data/products.ts`. Para agregar un producto nuevo: poné la
imagen en `src/assets/images/` (o `src/assets/images/products/`) y agregá
una entrada al array `products`. Las grillas, la ficha de producto y el
carrusel de "productos similares" se arman solos a partir de esa lista — no
hay que tocar nada más.

Los textos de "Características" de cada producto son placeholders
razonables (no el texto de relleno tipo "akjdfajdhfk..." que tenía el
diseño original) — reemplazalos por la descripción real de cada producto
cuando la tengan.

## Pendiente / próximos pasos

- Crear la base de datos KV en Vercel (ver arriba) para que el login y el
  carrito funcionen en producción.
- Poner el video real en `public/videos/cafe.mp4`.
- Completar la página `/pedidos` (por ahora vacía).
- Reemplazar los textos de "Características" placeholder por los reales.
