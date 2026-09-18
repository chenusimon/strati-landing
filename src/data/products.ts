import arandano from '../assets/images/sabor-arandano.jpg';
import frambuesa from '../assets/images/sabor-frambuesa.jpg';
import limon from '../assets/images/sabor-limon.jpg';
import pistacho from '../assets/images/sabor-pistacho.jpg';
import bagArabica from '../assets/images/products/bag-arabica.jpg';
import bagEspresso from '../assets/images/products/bag-espresso.jpg';
import bagEspressoStudio from '../assets/images/products/bag-espresso-studio.jpg';
import bagOriginStudio from '../assets/images/products/bag-origin-studio.jpg';
import cafeteraItaliana from '../assets/images/products/cafetera-italiana.jpg';
import mugs from '../assets/images/products/mugs.jpg';
import spoons from '../assets/images/products/spoons.jpg';
import travelMugs from '../assets/images/products/travel_mugs.jpg';
import filters from '../assets/images/products/filters.jpg';
import apronTote from '../assets/images/products/apron_tote.jpg';

export type ProductCategory = 'tiramisu' | 'cafe' | 'cafetera' | 'merch';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  tag?: string;
  tagline: string;
  characteristics: string;
  colors?: ProductColor[];
  /** Shown in the Home page teaser grid, before the flavor is "featured" */
  featured?: boolean;
}

// To add a new product later: drop its image in src/assets/images (or
// src/assets/images/products) and add an entry here. Everything else —
// cards, grids, the product detail page and the "similares" carousel — is
// generated automatically from this list.
export const products: Product[] = [
  // ---- Tiramisú ----
  {
    id: 'arandano',
    name: 'BlueBerry Tiramisú',
    category: 'tiramisu',
    image: arandano,
    tagline: 'Capas de bizcocho al café con crema mascarpone y arándanos frescos.',
    characteristics: 'Elaborado en el día con arándanos frescos, mascarpone italiano y un toque de café de especialidad.',
    featured: true,
  },
  {
    id: 'limon',
    name: 'Lemon Tiramisú',
    category: 'tiramisu',
    image: limon,
    tagline: 'Un giro cítrico y fresco sobre la receta clásica de tiramisú.',
    characteristics: 'Crema de mascarpone perfumada con limón natural sobre capas de bizcocho húmedo.',
    featured: true,
  },
  {
    id: 'frambuesa',
    name: 'RaspBerry Tiramisú',
    category: 'tiramisu',
    image: frambuesa,
    tagline: 'Frambuesas frescas y crema mascarpone sobre bizcocho al café.',
    characteristics: 'Frambuesas de estación, mascarpone italiano y un corazón de bizcocho embebido en café.',
    featured: true,
  },
  {
    id: 'pistacho',
    name: 'Pistachio Tiramisú',
    category: 'tiramisu',
    image: pistacho,
    tagline: 'Nuestra novedad: crema de pistacho siciliano sobre bizcocho al café.',
    characteristics: 'Pistacho siciliano molido, crema mascarpone y un crocante de pistacho por encima.',
    featured: false,
  },

  // ---- Café ----
  {
    id: 'arabica-select',
    name: 'Café Arabica Select',
    category: 'cafe',
    image: bagArabica,
    tag: 'Nuevo',
    tagline: 'Single origin de Honduras, cosecha limitada 2026.',
    characteristics: 'Granos 100% arábica de origen único, tueste medio y notas a frutos rojos y chocolate.',
  },
  {
    id: 'espresso-blend',
    name: 'Café Espresso Blend',
    category: 'cafe',
    image: bagEspresso,
    tag: 'Nuevo',
    tagline: 'Tueste tradición italiana pensado para espresso.',
    characteristics: 'Mezcla de granos seleccionados con tueste oscuro, cuerpo intenso y final achocolatado.',
  },
  {
    id: 'origin-select',
    name: 'Café Origin Select',
    category: 'cafe',
    image: bagOriginStudio,
    tag: 'Nuevo',
    tagline: 'Equilibrado y suave, ideal para el día a día.',
    characteristics: 'Perfil suave y balanceado, con notas dulces a caramelo y frutos secos.',
  },
  {
    id: 'smooth-vanilla',
    name: 'Cafe Smooth Vanilla',
    category: 'cafe',
    image: bagEspressoStudio,
    tag: 'Nuevo',
    tagline: 'Un café suave con un delicado aroma a vainilla natural.',
    characteristics: 'Tueste claro con infusión natural de vainilla, ideal para tomar con leche.',
  },

  // ---- Cafeteras ----
  {
    id: 'cafetera-italiana',
    name: 'Cafetera Italiana',
    category: 'cafetera',
    image: cafeteraItaliana,
    tag: 'Nuevo',
    tagline: 'La clásica cafetera moka, ahora en edición Strati.',
    characteristics: 'Aluminio de alta resistencia, apta para todo tipo de cocinas. Disponible en 3 colores.',
    colors: [
      { name: 'Café Obsidian', hex: '#3a2417' },
      { name: 'Rojo Strati', hex: '#b3261e' },
      { name: 'Golden Bean', hex: '#cdac79' },
    ],
  },

  // ---- Merch ----
  {
    id: 'mugs-ceramica',
    name: 'Mugs de Cerámica Strati',
    category: 'merch',
    image: mugs,
    tagline: 'Set de mugs y bowl de cata en cerámica esmaltada.',
    characteristics: 'Cerámica esmaltada apta para lavavajillas y microondas, con el logo Strati grabado.',
  },
  {
    id: 'set-cucharas',
    name: 'Set de Cucharas para Catar',
    category: 'merch',
    image: spoons,
    tagline: 'Set de 6 cucharas de cata bañadas en oro.',
    characteristics: 'Acero inoxidable bañado en oro, presentado en estuche de regalo Strati.',
  },
  {
    id: 'mugs-viaje',
    name: 'Mugs de Viaje Reutilizables',
    category: 'merch',
    image: travelMugs,
    tagline: 'Mantienen la temperatura hasta 6 horas.',
    characteristics: 'Doble pared de acero inoxidable, tapa hermética y diseño antideslizante.',
  },
  {
    id: 'filtros-strati',
    name: 'Filtros de Café Strati',
    category: 'merch',
    image: filters,
    tagline: 'Filtros de papel para métodos de goteo.',
    characteristics: 'Papel libre de blanqueadores, pack x40 unidades, compatible con la mayoría de los drippers.',
  },
  {
    id: 'kit-apron-tote',
    name: 'Kit Delantal & Tote Bag',
    category: 'merch',
    image: apronTote,
    tagline: 'Delantal de cuero y algodón, tote bag y libreta a juego.',
    characteristics: 'Delantal de algodón grueso con detalles de cuero, tote de algodón crudo y libreta con tapa de cuero.',
  },
];

export function getProductById(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getSimilarProducts(product: Product, count = 3): Product[] {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  if (sameCategory.length >= count) return sameCategory.slice(0, count);
  const rest = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...rest].slice(0, count);
}
