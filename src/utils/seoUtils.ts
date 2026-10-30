/**
 * SEO Optimization Utilities for PASAAVA Men's Jewellery
 * Enforces Google Best Practice Search Snippet Limits:
 * - Meta Title: 45–60 characters
 * - Meta Description: 120–155 characters
 */

export const SEO_LIMITS = {
  TITLE_MIN: 45,
  TITLE_MAX: 60,
  DESC_MIN: 120,
  DESC_MAX: 155
};

export type SeoBadgeStatus = 'empty' | 'short' | 'optimal' | 'long';

export function getSeoTitleStatus(title: string): SeoBadgeStatus {
  const len = (title || '').trim().length;
  if (len === 0) return 'empty';
  if (len > SEO_LIMITS.TITLE_MAX) return 'long';
  if (len >= SEO_LIMITS.TITLE_MIN) return 'optimal';
  return 'short';
}

export function getSeoDescStatus(desc: string): SeoBadgeStatus {
  const len = (desc || '').trim().length;
  if (len === 0) return 'empty';
  if (len > SEO_LIMITS.DESC_MAX) return 'long';
  if (len >= SEO_LIMITS.DESC_MIN) return 'optimal';
  return 'short';
}

export function generateOptimalProductSeo(product: {
  title: string;
  category?: string;
  materials?: string[];
  tagline?: string;
  description?: string;
}): { seoTitle: string; seoDesc: string } {
  const cleanTitle = (product.title || 'Product').trim();
  const cleanCategory = (product.category || 'Chains').trim();

  // 1. Generate SEO Title (Target: 45–60 chars)
  let seoTitle = `${cleanTitle} | ${cleanCategory} | PASAAVA Men's Jewellery`;
  if (seoTitle.length > SEO_LIMITS.TITLE_MAX) {
    seoTitle = `${cleanTitle} | ${cleanCategory} | PASAAVA`;
  }
  if (seoTitle.length > SEO_LIMITS.TITLE_MAX) {
    seoTitle = `${cleanTitle} | PASAAVA Men's Jewellery`;
  }
  if (seoTitle.length > SEO_LIMITS.TITLE_MAX) {
    seoTitle = `${cleanTitle.slice(0, 46).trim()}... | PASAAVA`;
  }
  if (seoTitle.length < SEO_LIMITS.TITLE_MIN) {
    seoTitle = `${cleanTitle} - Luxury ${cleanCategory} | PASAAVA Men's Jewellery`;
    if (seoTitle.length > SEO_LIMITS.TITLE_MAX) {
      seoTitle = `${cleanTitle} | ${cleanCategory} | PASAAVA Men's Jewellery`;
    }
  }

  // 2. Generate SEO Description (Target: 120–155 chars)
  // Standard CTA to ensure brand recognition and click-through
  const cta = "Premium men’s jewellery from PASAAVA. Shop now."; // 47 chars

  // Special match for known hero piece
  if (cleanTitle.toLowerCase().includes('spikeball pearl')) {
    return {
      seoTitle: 'SPIKEBALL PEARL CHAIN | Chains | PASAAVA Men\'s Jewellery',
      seoDesc: 'Bold spikeball pearl chain for men. Combines lustrous pearls with a statement star pendant. Premium men’s jewellery from PASAAVA. Shop now.'
    };
  }

  const primaryMaterial = (product.materials?.[0] || 'waterproof 316L steel')
    .replace(/^(solid|premium|high-grade|high-tensile)\s+/i, '')
    .trim();

  // Try candidate 1: using clean title and material
  let candidate = `Bold ${cleanTitle.toLowerCase()} for men. Engineered in ${primaryMaterial.toLowerCase()} for lasting style. ${cta}`;

  if (candidate.length < SEO_LIMITS.DESC_MIN) {
    candidate = `Modern ${cleanTitle.toLowerCase()} for men in ${primaryMaterial.toLowerCase()}. Waterproof, hypoallergenic luxury design. ${cta}`;
  }

  if (candidate.length > SEO_LIMITS.DESC_MAX) {
    candidate = `${cleanTitle} for men in ${primaryMaterial.toLowerCase()}. ${cta}`;
  }

  // If still out of range, fine-tune dynamically
  if (candidate.length < SEO_LIMITS.DESC_MIN) {
    const pad = `${cleanTitle} - ${primaryMaterial} ${cleanCategory.toLowerCase()} for men. Handcrafted waterproof finish. ${cta}`;
    if (pad.length <= SEO_LIMITS.DESC_MAX) {
      candidate = pad;
    }
  }

  if (candidate.length > SEO_LIMITS.DESC_MAX) {
    const targetLength = 145;
    const truncated = candidate.slice(0, targetLength - cta.length - 2).trim();
    candidate = `${truncated}. ${cta}`;
  }

  return { seoTitle, seoDesc: candidate };
}
