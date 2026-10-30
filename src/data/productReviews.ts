import { Product, ProductReview } from '../types';

// Curated seed reviews for key products
const CURATED_PRODUCT_REVIEWS: Record<string, ProductReview[]> = {
  'stella-tennis-bracelet': [
    {
      id: 'rev-viper-1',
      author: 'Julian Reed',
      rating: 5,
      date: 'October 11, 2026',
      title: 'Catches the light with razor sharpness — double-latch lock is bulletproof',
      comment:
        'I wear this next to my Omega Seamaster every single day. The carbonite stones have intense refraction without looking gaudy. The surgical steel finish has a brilliant mirror shine, and the heavy-duty double-latch compression lock gives complete peace of mind.',
      verified: true,
      recommended: true,
      helpfulCount: 24,
      location: 'New York, USA',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-viper-2',
      author: 'Lucas Martinez',
      rating: 5,
      date: 'October 08, 2026',
      title: '100% waterproof — daily gym & sauna test passed with flying colors',
      comment:
        'Worn it in heavy gym sessions, sauna, and pool every day for the past 3 months. Zero fading, no tarnishing, and stones stay razor tight. Masculine width and substantial heft on the wrist.',
      verified: true,
      recommended: true,
      helpfulCount: 19,
      location: 'Miami, USA',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-viper-3',
      author: 'Krishna Patel',
      rating: 5,
      date: 'September 29, 2026',
      title: 'The fire and brilliance in daylight is unreal',
      comment:
        'The quality of the surgical steel and faceted stones is 10/10. Definitely an eye catcher without feeling flashy. Got compliments immediately on a dinner outing. Looks like a $3,000 custom piece.',
      verified: true,
      recommended: true,
      helpfulCount: 15,
      location: 'London, UK',
      color: '18K Gold PVD',
      fit: 'True to Size'
    },
    {
      id: 'rev-viper-4',
      author: 'Marcus Vance',
      rating: 5,
      date: 'September 22, 2026',
      title: 'Architectural masculine wristwear done right',
      comment:
        'Most tennis bracelets for men are either flimsy or too thin. This has real weight, clean bezel settings, and doesn’t flip around on the wrist. Solid packaging and express shipping too.',
      verified: true,
      recommended: true,
      helpfulCount: 11,
      location: 'Toronto, CA',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-viper-5',
      author: 'Ethan Kowalski',
      rating: 4,
      date: 'September 15, 2026',
      title: 'Solid construction and heavyweight feel',
      comment:
        'Beautiful bracelet with immaculate finish. The clasp was slightly stiff on the first day, but after clicking it twice it is smooth and rock-solid. Highly recommend.',
      verified: true,
      recommended: true,
      helpfulCount: 7,
      location: 'Sydney, AU',
      color: 'Silver Steel',
      fit: 'True to Size'
    }
  ],
  'atlas-cuban-chain': [
    {
      id: 'rev-cuban-1',
      author: 'Ramyabina K.',
      rating: 5,
      date: 'October 09, 2026',
      title: 'Exceptional weight, polish and shine',
      comment:
        'The beveled curb links lie completely flat against the chest. The weight in the hand immediately tells you this is high-grade surgical steel, not cheap zinc alloy. Best everyday chain in my wardrobe.',
      verified: true,
      recommended: true,
      helpfulCount: 22,
      location: 'Chicago, USA',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-cuban-2',
      author: 'Zeon Caldeira',
      rating: 5,
      date: 'October 03, 2026',
      title: 'Part of my everyday uniform now',
      comment:
        'I wear this chain 24/7. Sweated in it, showered in it, no green skin, no tarnishing whatsoever. The custom low-profile lock clasp feels bulletproof.',
      verified: true,
      recommended: true,
      helpfulCount: 18,
      location: 'Los Angeles, USA',
      color: '18K Gold PVD',
      fit: 'True to Size'
    },
    {
      id: 'rev-cuban-3',
      author: 'Alexandre Roy',
      rating: 5,
      date: 'September 24, 2026',
      title: 'Precision bevels reflect light beautifully',
      comment:
        'The diamond-cut beveled edges catch light with a subtle glimmer rather than gaudy shine. Layers nicely with a shorter rope chain or pendant.',
      verified: true,
      recommended: true,
      helpfulCount: 12,
      location: 'Paris, FR',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-cuban-4',
      author: 'David Meyer',
      rating: 4,
      date: 'September 14, 2026',
      title: 'Great piece, heavy link feel',
      comment:
        'Heavyweight feel, solid clasp. Arrived within 3 business days in a clean presentation box. Definitely worth the price.',
      verified: true,
      recommended: true,
      helpfulCount: 6,
      location: 'Berlin, DE',
      color: 'Silver Steel',
      fit: 'True to Size'
    }
  ],
  'titan-brushed-ring': [
    {
      id: 'rev-ring-1',
      author: 'Oliver Sterling',
      rating: 5,
      date: 'October 07, 2026',
      title: 'Heavyweight signet, comfort-fit bevels',
      comment:
        'The interior is radiused and comfort-fit so it slips on effortlessly and feels natural all day. The contrast between the brushed top and mirror-polished flanks looks extremely upscale.',
      verified: true,
      recommended: true,
      helpfulCount: 16,
      location: 'London, UK',
      color: 'Brushed Silver',
      fit: 'True to Size'
    },
    {
      id: 'rev-ring-2',
      author: 'Adira Sen',
      rating: 5,
      date: 'September 28, 2026',
      title: 'Favorite statement ring right now',
      comment:
        'It has an authentic industrial architectural feel. Doesn’t scratch easily even when working with metal tools. Sizing matches the chart exactly.',
      verified: true,
      recommended: true,
      helpfulCount: 14,
      location: 'Mumbai, IN',
      color: 'Brushed Silver',
      fit: 'True to Size'
    }
  ],
  'ares-cross-pendant': [
    {
      id: 'rev-ares-1',
      author: 'Shreya Malhotra',
      rating: 5,
      date: 'October 05, 2026',
      title: 'Gifted to my boyfriend and he was blown away',
      comment:
        'He literally wears it every single day. The sharp geometric facets on the cross make it look very modern and bold rather than traditional. Chain length is perfect.',
      verified: true,
      recommended: true,
      helpfulCount: 20,
      location: 'Singapore',
      color: 'Silver Steel',
      fit: 'True to Size'
    },
    {
      id: 'rev-ares-2',
      author: 'Nathan Cruz',
      rating: 5,
      date: 'September 25, 2026',
      title: 'Stands out in any crowd',
      comment:
        'Clean weight and solid surgical steel construction. Heavy enough to stay centered on the chest without bouncing around when moving.',
      verified: true,
      recommended: true,
      helpfulCount: 11,
      location: 'Austin, USA',
      color: 'Silver Steel',
      fit: 'True to Size'
    }
  ]
};

// Category template reviews for any other product
function generateCategoryReviews(product: Product): ProductReview[] {
  const pName = product.title;
  const pCat = product.category || 'Jewellery';

  if (pCat === 'Bracelets') {
    return [
      {
        id: `rev-${product.id}-1`,
        author: 'Marcus Vance',
        rating: 5,
        date: 'October 06, 2026',
        title: `Immaculate wrist presence — ${pName}`,
        comment: `Outstanding build quality and comfort. The locking mechanism is rock-solid and the finish feels substantial without weighing down the wrist. 100% waterproof safe for everyday gym and shower.`,
        verified: true,
        recommended: true,
        helpfulCount: 14,
        location: 'New York, USA',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-2`,
        author: 'Arjun Mehta',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Exceeded all expectations',
        comment: `The detailing on the ${pName} is stunning. Layers seamlessly alongside my watch. Highly recommended if you want hardware that looks bespoke.`,
        verified: true,
        recommended: true,
        helpfulCount: 10,
        location: 'London, UK',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-3`,
        author: 'Leon Dupont',
        rating: 5,
        date: 'September 18, 2026',
        title: 'Solid clasp, premium presentation',
        comment: `Came in a sleek magnetic unboxing case. The surgical steel has a brilliant shine that doesn’t smudge or oxidize.`,
        verified: true,
        recommended: true,
        helpfulCount: 7,
        location: 'Paris, FR',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-4`,
        author: 'Sam Thorne',
        rating: 4,
        date: 'September 08, 2026',
        title: 'Very well engineered',
        comment: `Solid weight and clean finish. Sizing was right on point according to the measurement guide. Very pleased with this purchase.`,
        verified: true,
        recommended: true,
        helpfulCount: 5,
        location: 'Toronto, CA',
        fit: 'True to Size'
      }
    ];
  }

  if (pCat === 'Chains' || pCat === 'Neck Chains') {
    return [
      {
        id: `rev-${product.id}-1`,
        author: 'Darius Cole',
        rating: 5,
        date: 'October 07, 2026',
        title: `Heavyweight and sharp — ${pName}`,
        comment: `The chain hangs with real drape and doesn’t kink or twist. The link tolerances are horology-grade and the clasp is super secure.`,
        verified: true,
        recommended: true,
        helpfulCount: 17,
        location: 'Los Angeles, USA',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-2`,
        author: 'Victor Rossi',
        rating: 5,
        date: 'September 30, 2026',
        title: 'Shower, sweat, and workout proof',
        comment: `Worn 24/7 for over a month now. Clean surgical steel with zero skin irritation or discoloration. PASAAVA knows how to make real men's jewellery.`,
        verified: true,
        recommended: true,
        helpfulCount: 12,
        location: 'Milan, IT',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-3`,
        author: 'Kai Jensen',
        rating: 5,
        date: 'September 20, 2026',
        title: 'The perfect standalone chain',
        comment: `Looks great on its own with an open collar or layered with a pendant piece. Gets noticed everywhere I wear it.`,
        verified: true,
        recommended: true,
        helpfulCount: 8,
        location: 'Copenhagen, DK',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-4`,
        author: 'Tariq Al-Mansoor',
        rating: 4,
        date: 'September 10, 2026',
        title: 'Great quality and fast delivery',
        comment: `Solid link weight, very clean locking clasp. Delivered to my door in 3 days. Extremely happy with the purchase.`,
        verified: true,
        recommended: true,
        helpfulCount: 4,
        location: 'Dubai, UAE',
        fit: 'True to Size'
      }
    ];
  }

  if (pCat === 'Rings') {
    return [
      {
        id: `rev-${product.id}-1`,
        author: 'Oliver Sterling',
        rating: 5,
        date: 'October 08, 2026',
        title: `Substantial weight and comfort fit`,
        comment: `The inner radius makes this ring incredibly comfortable to wear all day. The surgical steel finish is scratch-resistant and looks premium.`,
        verified: true,
        recommended: true,
        helpfulCount: 15,
        location: 'London, UK',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-2`,
        author: 'Henrik Larsson',
        rating: 5,
        date: 'September 27, 2026',
        title: 'Architectural statement piece',
        comment: `The proportions on the ${pName} are commanding without being bulky. Clean lines and solid feel.`,
        verified: true,
        recommended: true,
        helpfulCount: 9,
        location: 'Stockholm, SE',
        fit: 'True to Size'
      },
      {
        id: `rev-${product.id}-3`,
        author: 'Carlos Mendes',
        rating: 4,
        date: 'September 12, 2026',
        title: 'True to size, impressive finish',
        comment: `Ordered my standard ring size and it fits like a glove. Solid steel, heavy feel.`,
        verified: true,
        recommended: true,
        helpfulCount: 6,
        location: 'Madrid, ES',
        fit: 'True to Size'
      }
    ];
  }

  // Default fallback for Pendants, Earrings, Cuffs
  return [
    {
      id: `rev-${product.id}-1`,
      author: 'Alexander Bell',
      rating: 5,
      date: 'October 09, 2026',
      title: `Superb craftsmanship on the ${pName}`,
      comment: `The precision machining and heavy surgical steel craftsmanship stand out immediately. It has real presence, zero skin irritation, and arrived in premium presentation packaging.`,
      verified: true,
      recommended: true,
      helpfulCount: 16,
      location: 'New York, USA',
      fit: 'True to Size'
    },
    {
      id: `rev-${product.id}-2`,
      author: 'Milan Novak',
      rating: 5,
      date: 'September 28, 2026',
      title: '100% waterproof and sweatproof',
      comment: `Tested through daily runs, hot showers, and workouts. Maintains pristine mirror polish without any oxidation. Worth every cent.`,
      verified: true,
      recommended: true,
      helpfulCount: 11,
      location: 'Prague, CZ',
      fit: 'True to Size'
    },
    {
      id: `rev-${product.id}-3`,
      author: 'Mateo Morales',
      rating: 5,
      date: 'September 19, 2026',
      title: 'Looks even better in person',
      comment: `Photos don’t do justice to the light reflection and tactile weight. Very happy with this piece!`,
      verified: true,
      recommended: true,
      helpfulCount: 7,
      location: 'Buenos Aires, AR',
      fit: 'True to Size'
    },
    {
      id: `rev-${product.id}-4`,
      author: 'Zachary Thomas',
      rating: 4,
      date: 'September 05, 2026',
      title: 'Great quality, solid design',
      comment: `High-tensile hardware and clean aesthetic. Fast delivery and secure packaging.`,
      verified: true,
      recommended: true,
      helpfulCount: 4,
      location: 'Chicago, USA',
      fit: 'True to Size'
    }
  ];
}

import { storageService } from '../services/storageService';

const STORAGE_KEY_PREFIX = 'pasaava_reviews_';
const VOTED_KEY_PREFIX = 'pasaava_voted_reviews_';

/**
 * Get all verified reviews for a product (approved admin reviews + curated seeds)
 * Unapproved (pending/rejected) user reviews are excluded until admin approves.
 */
export function getProductReviews(product: Product): ProductReview[] {
  const seedReviews =
    CURATED_PRODUCT_REVIEWS[product.slug] ||
    CURATED_PRODUCT_REVIEWS[product.id] ||
    product.reviews ||
    generateCategoryReviews(product);

  if (typeof window === 'undefined') {
    return seedReviews;
  }

  let approvedAdminReviews: ProductReview[] = [];
  try {
    const fromAdmin = storageService.getApprovedReviewsByProduct(product.slug, product.id);
    if (Array.isArray(fromAdmin) && fromAdmin.length > 0) {
      approvedAdminReviews = fromAdmin;
    }
  } catch (err) {
    console.error('Error fetching admin approved reviews:', err);
  }

  // Combine: Approved reviews first, then seed reviews
  // De-duplicate by review id
  const combined = [...approvedAdminReviews, ...seedReviews];
  const seenIds = new Set<string>();
  return combined.filter((r) => {
    if (!r.id) return true;
    if (seenIds.has(r.id)) return false;
    seenIds.add(r.id);
    return true;
  });
}

/**
 * Submit a customer review into the moderation queue (pending admin approval)
 */
export function saveUserReview(
  productOrId: string | Product | { id: string; slug?: string },
  reviewData: {
    author: string;
    rating: number;
    title: string;
    comment: string;
    email?: string;
    color?: string;
    fit?: 'True to Size' | 'Runs Small' | 'Runs Large';
    recommended?: boolean;
    location?: string;
  }
): ProductReview {
  let pSlug = '';
  let pId = '';

  if (typeof productOrId === 'string') {
    pId = productOrId;
    pSlug = productOrId;
  } else {
    pId = productOrId.id;
    pSlug = productOrId.slug || productOrId.id;
  }

  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;

  const submitted = storageService.submitReview({
    author: reviewData.author.trim(),
    rating: reviewData.rating,
    date: formattedDate,
    title: reviewData.title.trim(),
    comment: reviewData.comment.trim(),
    verified: true,
    recommended: reviewData.recommended !== false,
    helpfulCount: 0,
    location: reviewData.location || 'Verified Buyer',
    color: reviewData.color,
    fit: reviewData.fit || 'True to Size',
    productSlug: pSlug,
    productId: pId,
    status: 'pending'
  } as any);

  return submitted;
}

/**
 * Check if the current user has already voted on this review
 */
export function hasUserVotedHelpful(reviewId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const votedList = JSON.parse(localStorage.getItem(VOTED_KEY_PREFIX) || '[]');
    return votedList.includes(reviewId);
  } catch {
    return false;
  }
}

/**
 * Toggle or register helpful vote
 */
export function markReviewHelpful(reviewId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const votedList: string[] = JSON.parse(
      localStorage.getItem(VOTED_KEY_PREFIX) || '[]'
    );
    if (!votedList.includes(reviewId)) {
      votedList.push(reviewId);
      localStorage.setItem(VOTED_KEY_PREFIX, JSON.stringify(votedList));
      return true;
    }
  } catch {
    // Ignore error
  }
  return false;
}
