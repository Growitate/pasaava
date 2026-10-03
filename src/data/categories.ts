export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  gender: 'men';
  image: string;
  itemCount: number;
  description: string;
}

export const menCategories: CategoryInfo[] = [
  {
    id: 'm-all',
    name: 'All Men\'s Jewelry',
    slug: '/shop',
    gender: 'men',
    image: '/images/hero-masculine-bold.jpg',
    itemCount: 25,
    description: 'Architectural, durable, and refined everyday essentials engineered for men.'
  },
  {
    id: 'm-chains',
    name: 'Neck Chains & Pendants',
    slug: '/men-category/men-chain',
    gender: 'men',
    image: '/images/model-men-chain.jpg',
    itemCount: 8,
    description: 'Diamond-cut Cuban links, classic Figaro, geometric box chains, and heavy statement pendants.'
  },
  {
    id: 'm-bracelets',
    name: 'Bracelets & Cuffs',
    slug: '/men-category/men-bracelet',
    gender: 'men',
    image: '/images/model-men-wrist.jpg',
    itemCount: 7,
    description: 'Solid curb chains, braided Italian calfskin cords, and engineered horology link bracelets.'
  },
  {
    id: 'm-rings',
    name: 'Rings & Signets',
    slug: '/men-category/men-ring',
    gender: 'men',
    image: '/images/model-men-ring.jpg',
    itemCount: 6,
    description: 'Cushion signets, beveled industrial bands, and brushed comfort-fit tungsten rings.'
  },
  {
    id: 'm-earrings',
    name: 'Earrings & Studs',
    slug: '/men-category/men-earring',
    gender: 'men',
    image: '/images/model-men-earring.jpg',
    itemCount: 4,
    description: 'Matte black titanium studs, micro cross charms, and solid heavyweight huggie hoops.'
  },
  {
    id: 'm-bestsellers',
    name: 'Best Sellers',
    slug: '/men-category/men-bestsellers',
    gender: 'men',
    image: '/images/hero-masculine-atelier.jpg',
    itemCount: 8,
    description: 'Our top-rated everyday statement hardware trusted by thousands of men worldwide.'
  },
  {
    id: 'm-newarrivals',
    name: 'New Arrivals',
    slug: '/men-category/men-newarrivals',
    gender: 'men',
    image: '/images/model-men-cuban.jpg',
    itemCount: 6,
    description: 'The latest drops forged from surgical-grade steel, titanium, and 18K solid gold plating.'
  },
  {
    id: 'm-onsale',
    name: 'Archive & Sale',
    slug: '/men-category/men-onsale',
    gender: 'men',
    image: '/images/model-men-tennis.jpg',
    itemCount: 5,
    description: 'Limited seasonal promotions on core men\'s signatures.'
  }
];

// Backwards compatibility alias for routes
export const womenCategories: CategoryInfo[] = menCategories;
export const categories = menCategories;
