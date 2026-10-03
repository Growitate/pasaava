import { JournalArticle } from '../types';

export const journals: JournalArticle[] = [
  {
    slug: 'the-art-of-everyday-elegance',
    title: "The Modern Man's Guide to Wearing Chains: Lengths, Widths & Layering",
    date: 'July 19, 2026',
    readTime: '4 min read',
    category: 'Men\'s Style Guide',
    image: '/images/model-men-chain.jpg',
    excerpt: 'Master the fundamentals of neckwear proportions: how to choose between 20", 22", and 24" lengths and layer Cuban links with pendants.',
    author: 'Marcus Vance',
    content: [
      'Neck chains are the cornerstone of modern men’s jewelry. Understanding proportion is essential: a 20-inch chain sits comfortably just below the collarbone—ideal for open-collar shirts—while a 22-inch chain rests lower on the chest, making it the universal foundation for solo wear or statement pendants.',
      'When building a multi-chain stack, contrast is key. Pair a heavier 6mm Cuban link chain with a finer 3.5mm box chain or rope chain. Stagger your chain lengths by at least 2 inches to allow each piece to drape freely without tangling.',
      'Pay attention to metal finish. Monochromatic stainless steel and raw silver project an understated industrial strength, whereas 18K gold PVD brings warm luxury that elevates dark knitwear and tailored suiting.'
    ]
  },
  {
    slug: 'building-a-timeless-jewelry-collection',
    title: 'The Definitive Men\'s Ring Guide: Signets, Bands & Pinky Styling',
    date: 'July 15, 2026',
    readTime: '5 min read',
    category: 'Men\'s Hardware',
    image: '/images/model-men-signet.jpg',
    excerpt: 'From weighted cushion signets to industrial brushed bands, here is how to curate rings that communicate quiet confidence.',
    author: 'David Wright',
    content: [
      'A man’s rings are personal markers of identity, heritage, and aesthetic taste. Unlike fleeting accessories, a well-engineered signet ring or beveled band becomes an extension of your hands.',
      'Start with a foundational ring: the cushion-face signet ring (like the Atlas Signet) worn on the pinky or ring finger provides a timeless anchor. For index or thumb wear, a broader 8mm brushed band (like the Titan Band) offers a grounded, modern weight.',
      'All PASAAVA rings feature ergonomic comfort-fit curved inner shanks, eliminating finger pinch and ensuring 24/7 wearability through heavy gym workouts and typing at your desk.'
    ]
  },
  {
    slug: 'why-timeless-design-never-fades',
    title: 'Pairing Bracelets & Watches: The Modern Gentleman\'s Wrist Rulebook',
    date: 'July 10, 2026',
    readTime: '3 min read',
    category: 'Style & Horology',
    image: '/images/hero-masculine-atelier.jpg',
    excerpt: 'How to stack solid curb chains, horology links, and braided leather alongside steel sports watches and leather dress timepieces.',
    author: 'Julian Reed',
    content: [
      'The wrist is one of the most expressive points in men’s styling. When pairing jewelry with a timepiece, balance is everything. If you wear a substantial steel diver or chronograph on your left wrist, balance your right wrist with a solid curb link or engineered horology bracelet.',
      'For same-wrist stacking, pair contrasting textures: a supple braided Italian calfskin cord nestled next to a steel watch case prevents metal-on-metal scratching while introducing organic richness.',
      'At PASAAVA, every clasp is engineered with tactile magnetic clicks or fold-over safety locks, ensuring your wristwear stays secure throughout all activities.'
    ]
  },
  {
    slug: 'caring-for-jewelry-that-lasts',
    title: 'The Science of Sweatproof Jewelry: Surgical Steel & PVD Engineering',
    date: 'July 05, 2026',
    readTime: '4 min read',
    category: 'Craftsmanship & Science',
    image: '/images/model-men-wrist.jpg',
    excerpt: 'Why 316L surgical-grade stainless steel and vacuum PVD coating never tarnish, rust, or stain skin green during intense physical activity.',
    author: 'Alexander Cole',
    content: [
      'Traditional jewelry often corrodes when exposed to sweat, humidity, chlorine, and saltwater. PASAAVA resolves this with grade 316L surgical stainless steel—an alloy fortified with molybdenum for superior corrosion resistance.',
      'Our 18K gold and matte black finishes are applied through Physical Vapor Deposition (PVD) in a high-vacuum chamber. This creates a molecular bond ten times thicker and more durable than conventional electroplating.',
      'Wear your PASAAVA hardware in the ocean, sauna, gym, and shower. A simple rinse with lukewarm water is all it takes to maintain showroom luster forever.'
    ]
  }
];

export const getJournalBySlug = (slug: string): JournalArticle | undefined => {
  return journals.find(j => j.slug === slug);
};
