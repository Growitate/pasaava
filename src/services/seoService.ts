import { Product, ProductReview, CategoryItem } from '../types';

export interface SeoMetaConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

class SeoService {
  private defaultTitle = "PASAAVA | Engineered Men's Jewellery | 316L Surgical Steel";
  private defaultDescription =
    'Engineered for the modern icon. Handcrafted luxury men’s jewellery made from 100% waterproof 316L surgical stainless steel. Hypoallergenic, tarnish-proof, lifetime durability.';
  private defaultOgImage = 'https://pasaava.growithcp.live/images/hero-masculine-bold.jpg';
  private baseUrl = 'https://pasaava.growithcp.live';

  /**
   * Apply dynamic meta tags and structured data to document <head>
   */
  public applyMeta(config: SeoMetaConfig): void {
    if (typeof document === 'undefined') return;

    // 1. Title
    const finalTitle = config.title?.trim() || this.defaultTitle;
    document.title = finalTitle;

    // 2. Standard Meta Description
    const finalDesc = config.description?.trim() || this.defaultDescription;
    this.upsertMeta('description', finalDesc);

    // 3. Robots (Index / Noindex)
    if (config.noindex) {
      this.upsertMeta('robots', 'noindex, nofollow');
    } else {
      this.upsertMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    }

    // 4. Canonical Link
    const finalCanonical = config.canonical || window.location.href.split('?')[0];
    this.upsertCanonical(finalCanonical);

    // 5. Open Graph Meta Tags
    this.upsertMeta('og:site_name', "PASAAVA Men's Jewellery", 'property');
    this.upsertMeta('og:title', config.ogTitle || finalTitle, 'property');
    this.upsertMeta('og:description', config.ogDescription || finalDesc, 'property');
    this.upsertMeta('og:type', config.ogType || 'website', 'property');
    this.upsertMeta('og:url', finalCanonical, 'property');
    this.upsertMeta('og:image', config.ogImage || this.defaultOgImage, 'property');

    // 6. Twitter Card Meta Tags
    this.upsertMeta('twitter:card', config.twitterCard || 'summary_large_image');
    this.upsertMeta('twitter:title', config.ogTitle || finalTitle);
    this.upsertMeta('twitter:description', config.ogDescription || finalDesc);
    this.upsertMeta('twitter:image', config.ogImage || this.defaultOgImage);

    // 7. JSON-LD Structured Data
    this.applyJsonLd(config.jsonLd);
  }

  /**
   * Insert or update <meta> tag
   */
  private upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  /**
   * Insert or update <link rel="canonical">
   */
  private upsertCanonical(url: string): void {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  /**
   * Inject JSON-LD Schema
   */
  private applyJsonLd(data?: Record<string, any> | Record<string, any>[]): void {
    const existing = document.getElementById('pasaava-jsonld');
    if (!data) {
      if (existing) existing.remove();
      return;
    }

    let scriptEl = existing as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'pasaava-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    scriptEl.textContent = JSON.stringify(data);
  }

  /**
   * Generate Schema.org Product Structured Data
   */
  public buildProductJsonLd(
    product: Product,
    approvedReviews?: ProductReview[]
  ): Record<string, any> {
    const fullImages = (product.images || []).map((img) =>
      img.startsWith('http') ? img : `${this.baseUrl}${img}`
    );

    const schema: Record<string, any> = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      image: fullImages,
      description: product.description || product.tagline,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'PASAAVA'
      },
      offers: {
        '@type': 'Offer',
        url: `${this.baseUrl}/#/product/${product.slug}`,
        priceCurrency: 'INR',
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability:
          product.inStock && (product.stockQty ?? 1) > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock'
      }
    };

    if (approvedReviews && approvedReviews.length > 0) {
      const avg =
        approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length;
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: avg.toFixed(1),
        reviewCount: approvedReviews.length,
        bestRating: '5',
        worstRating: '1'
      };
    } else if (product.reviewCount && product.reviewCount > 0) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: (product.rating || 5.0).toFixed(1),
        reviewCount: product.reviewCount,
        bestRating: '5',
        worstRating: '1'
      };
    }

    return schema;
  }

  /**
   * Generate Schema.org BreadcrumbList
   */
  public buildBreadcrumbJsonLd(crumbs: { name: string; url: string }[]): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  /**
   * Generate Schema.org Organization
   */
  public buildOrganizationJsonLd(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: "PASAAVA Men's Jewellery",
      url: this.baseUrl,
      logo: `${this.baseUrl}/images/pasaava-logo-solid.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'Customer Service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi']
      },
      sameAs: ['https://instagram.com/pasaava']
    };
  }

  /**
   * Build XML Sitemap String from DB Products & Categories
   */
  public generateSitemapXml(products: Product[], categories: CategoryItem[]): string {
    const today = new Date().toISOString().slice(0, 10);

    const staticRoutes = [
      { path: '', priority: '1.0', changefreq: 'daily' },
      { path: '/shop', priority: '0.9', changefreq: 'daily' },
      { path: '/about', priority: '0.7', changefreq: 'monthly' },
      { path: '/contact', priority: '0.7', changefreq: 'monthly' },
      { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/terms-of-service', priority: '0.4', changefreq: 'yearly' },
      { path: '/shipping-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/returns-exchange-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/refund-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/warranty-policy', priority: '0.4', changefreq: 'yearly' }
    ];

    const categoryRoutes = categories.map((cat) => ({
      path: `/category/${cat.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    }));

    const productRoutes = products
      .filter((p) => p.inStock !== false)
      .map((p) => ({
        path: `/product/${p.slug}`,
        priority: '0.85',
        changefreq: 'weekly'
      }));

    const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

    const urlTags = allRoutes
      .map(
        (r) => `  <url>
    <loc>${this.baseUrl}/#${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;
  }
}

export const seoService = new SeoService();
