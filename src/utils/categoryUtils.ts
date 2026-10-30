import { Product } from '../types';

/**
 * Normalizes any category string, slug, or ID into a canonical category slug.
 * Ensures mutual exclusivity: 'rings' and 'earrings' never conflict,
 * and 'chains' and 'neck-chains' never conflict.
 */
export const normalizeCategorySlug = (raw: string): string => {
  if (!raw) return '';
  const s = raw
    .toLowerCase()
    .trim()
    .replace(/^cat-/, '')
    .replace(/^(men-|women-)/, '');

  if (s === 'all' || s === 'all-pieces' || s === 'shop') return 'all';

  // 1. Earrings (earring, stud, hoop, huggie)
  if (s.includes('earring') || s.includes('stud') || s.includes('hoop') || s.includes('huggie')) {
    return 'earrings';
  }

  // 2. Neck Chains (neck-chains, neckchains, neckpieces, collar)
  if (s.includes('neck') || s.includes('collar')) {
    return 'neck-chains';
  }

  // 3. Rings (strictly rings, not earrings)
  if (s === 'rings' || s === 'ring') {
    return 'rings';
  }

  // 4. Chains (strictly chains, not neck-chains)
  if (s === 'chains' || s === 'chain') {
    return 'chains';
  }

  // 5. Bracelets
  if (s.includes('bracelet') || s.includes('cuff')) {
    return 'bracelets';
  }

  // 6. Pendants
  if (s.includes('pendant')) {
    return 'pendants';
  }

  // Curations
  if (s.includes('bestseller')) {
    return 'bestsellers';
  }
  if (s.includes('newarrival') || s.includes('new')) {
    return 'newarrivals';
  }
  if (s.includes('sale') || s.includes('onsale')) {
    return 'onsale';
  }

  return s.replace(/\s+/g, '-');
};

/**
 * Compares an active category against an item category slug.
 * Returns true if and only if they resolve to the exact same canonical category.
 */
export const isCategoryMatch = (
  activeCategory: string | undefined,
  itemCategory: string
): boolean => {
  if (!activeCategory || !itemCategory) return false;
  const a = normalizeCategorySlug(activeCategory);
  const b = normalizeCategorySlug(itemCategory);
  return Boolean(a && b && a === b);
};

/**
 * Determines the single canonical category for a given Product.
 * Categorizes each product into exactly ONE bucket without overlaps.
 */
export const getProductCanonicalCategory = (
  product: Product
): 'chains' | 'neck-chains' | 'bracelets' | 'rings' | 'earrings' | 'pendants' => {
  const cat = (product.category || '').toLowerCase().trim();
  const title = (product.title || '').toLowerCase();
  const subtitle = (product.subtitle || '').toLowerCase();

  // 1. Earrings (must take precedence to ensure earrings with hoops or studs are not misclassified as rings)
  if (
    cat.includes('earring') ||
    /\b(earring|earrings|stud|studs|hoop|hoops|huggie|huggies)\b/i.test(title)
  ) {
    return 'earrings';
  }

  // 2. Rings (must NEVER match earrings)
  if (
    cat === 'rings' ||
    cat === 'ring' ||
    /\b(ring|rings|band|signet)\b/i.test(title)
  ) {
    return 'rings';
  }

  // 3. Bracelets
  if (
    cat.includes('bracelet') ||
    /\b(bracelet|bracelets)\b/i.test(title) ||
    (/\bcuff\b/i.test(title) && !cat.includes('earring'))
  ) {
    return 'bracelets';
  }

  // 4. Pendants (pieces with pendants, talismans, dog tags)
  if (
    cat.includes('pendant') ||
    /\b(pendant|pendants|talisman|dog tag)\b/i.test(title) ||
    /\b(pendant|pendants|talisman)\b/i.test(subtitle)
  ) {
    return 'pendants';
  }

  // 5. Neck Chains (specifically designated Neck Chains / collars)
  if (
    cat.includes('neck') ||
    cat.includes('collar') ||
    /\b(collar|choker)\b/i.test(title)
  ) {
    return 'neck-chains';
  }

  // 6. Chains (pure chains without pendants or neck collar designation)
  return 'chains';
};

/**
 * Strictly filters products by category with zero bleed between categories:
 * - 'chains' shows only pure chains (not neck chains, not pendants)
 * - 'neck-chains' shows only neck chains (not regular chains)
 * - 'rings' shows only rings (never earrings)
 * - 'earrings' shows only earrings (never rings)
 * - 'bracelets' shows only bracelets
 * - 'pendants' shows only pendants
 */
export const filterProductsByCategoryStrict = (
  allProducts: Product[],
  categoryId: string
): Product[] => {
  const norm = normalizeCategorySlug(categoryId);
  if (!norm || norm === 'all' || norm === 'all-pieces' || norm === 'shop') {
    return allProducts;
  }

  if (norm === 'bestsellers') {
    return allProducts.filter((p) => p.badge === 'Best Seller' || p.rating >= 4.8);
  }

  if (norm === 'newarrivals') {
    return allProducts.filter((p) => p.badge === 'New' || p.badge === 'Trending');
  }

  if (norm === 'onsale') {
    return allProducts.filter((p) => Boolean(p.originalPrice && p.originalPrice > p.price));
  }

  const standardCategories = ['chains', 'neck-chains', 'bracelets', 'rings', 'earrings', 'pendants'];
  if (standardCategories.includes(norm)) {
    return allProducts.filter((p) => getProductCanonicalCategory(p) === norm);
  }

  // Fallback for custom category slugs created in admin
  const raw = (categoryId || '').toLowerCase().trim();
  return allProducts.filter((p) => {
    const pCat = (p.category || '').toLowerCase().trim();
    return pCat === raw || pCat.replace(/\s+/g, '-') === raw || pCat.includes(raw);
  });
};
