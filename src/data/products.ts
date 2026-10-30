import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'drop-1',
    slug: 'spikeball-pearl-chain',
    title: 'SPIKEBALL PEARL CHAIN',
    subtitle: 'Cultured Freshwater Pearls & Star Charm',
    category: 'Chains',
    gender: 'men',
    price: 750,
    originalPrice: 950,
    rating: 5.0,
    reviewCount: 34,
    images: ['/images/drop-spikeball-pearl.jpg'],
    tagline: 'Modern luxury statement combining organic luster with bold masculine star pendant.',
    description: 'Crafted with hand-selected cultured freshwater pearls and anchored by a solid surgical steel 3D star charm. Designed to bridge timeless organic luster with razor-sharp streetwear architecture. Finished with an industrial lobster clasp for all-day security.',
    materials: ['Grade AAA+ Cultured Freshwater Pearls', 'Solid 316L Surgical Stainless Steel Charm', 'High-Tensile Steel Wire Core'],
    dimensions: 'Pearl Diameter: 6mm | Length: 19 Inch + 2 Inch Micro-Adjuster',
    care: ['Wipe clean with soft polishing cloth', '100% Sweat and water resistant'],
    whyItHits: [
      'Hand-selected organic luster freshwater pearls',
      'Sculpted 3D celestial star hardware',
      'Pairs effortlessly with black tees and tailored shirts',
      '100% Waterproof & Sweatproof',
      'Anti-tarnish surgical steel clasp'
    ],
    matchWithSlugs: ['spikeball-pendant-chain', 'rogue-chain'],
    seoTitle: "SPIKEBALL PEARL CHAIN | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Bold spikeball pearl chain for men. Combines lustrous pearls with a statement star pendant. Premium men’s jewellery from PASAAVA. Shop now.",
    inStock: true
  },
  {
    id: 'drop-2',
    slug: 'spikeball-pendant-chain',
    title: 'SPIKEBALL PENDANT CHAIN',
    subtitle: 'Precision Box Link & 3D Star Pendant',
    category: 'Pendants',
    gender: 'men',
    price: 600,
    rating: 4.9,
    reviewCount: 29,
    images: ['/images/drop-spikeball-pendant.jpg'],
    tagline: 'A sharp, iconic everyday staple engineered from high-grade surgical steel.',
    description: 'A sharp everyday staple forged from solid 316L surgical steel. Features a diamond-cut box link chain suspending an angular 3D celestial star pendant with high-mirror polish finish. Light enough for effortless daily wear, distinctive enough to elevate any fit.',
    materials: ['Solid 316L Surgical Stainless Steel', 'Vacuum PVD Coated', 'Hypoallergenic & Nickel-Free'],
    dimensions: 'Pendant: 22mm x 18mm | Chain Length: 22 Inch (55 cm) Box Link',
    care: ['100% waterproof safe for everyday workouts'],
    whyItHits: [
      'Angular 3D celestial star pendant',
      'Precision diamond-cut box links',
      'The perfect balance—not too minimal, not too bold',
      '100% Waterproof & Gym-Proof',
      'Zero fading, zero skin greening'
    ],
    matchWithSlugs: ['spikeball-pearl-chain', 'wave-chain'],
    seoTitle: "SPIKEBALL PENDANT CHAIN | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Sleek spikeball star pendant chain for men. Precision-cut box links forged in waterproof 316L steel. Premium jewellery from PASAAVA. Shop now.",
    inStock: true
  },
  {
    id: 'drop-3',
    slug: 'rogue-chain',
    title: 'ROGUE CHAIN',
    subtitle: 'Heavy Beaded Cuban Link Collar',
    category: 'Chains',
    gender: 'men',
    price: 500,
    rating: 4.9,
    reviewCount: 42,
    images: ['/images/drop-rogue-chain.jpg'],
    tagline: 'Chunky textured Cuban links interlocking with precision beaded spheres.',
    description: 'Engineered for confident presence, the Rogue Chain combines chunky bevel-cut Cuban links with precision-turned spherical beads. Heavyweight architecture that sits perfectly flat against the collarbone without rolling. Designed for bold solo wear or stacked streetwear layering.',
    materials: ['High-Tensile 316L Surgical Steel', 'Hand-Polished Mirror Bevels', 'Anti-Tarnish Vacuum Bond'],
    dimensions: 'Width: 8mm | Length: 20 Inch (50 cm) Heavy Collar',
    care: ['Shower and workout safe', '100% Waterproof & Sweatproof'],
    whyItHits: [
      'Heavyweight textured Cuban & bead construction',
      'Sits flush against the chest without twisting',
      'Commanding presence for streetwear tailoring',
      '100% Shower, Gym & Ocean safe',
      'Anti-tarnish & Hypoallergenic'
    ],
    matchWithSlugs: ['wave-chain', 'bar-pendant'],
    seoTitle: "ROGUE CHAIN | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Heavyweight Rogue beaded Cuban chain for men. Textured surgical steel links built for bold streetwear. Premium jewellery from PASAAVA. Shop now.",
    inStock: true
  },
  {
    id: 'drop-4',
    slug: 'wave-chain',
    title: 'WAVE CHAIN',
    subtitle: 'Sculpted Organic Fluid Geometry',
    category: 'Chains',
    gender: 'men',
    price: 799,
    rating: 5.0,
    reviewCount: 38,
    images: ['/images/drop-wave-chain.jpg'],
    tagline: 'The Wave Chain finds the balance between understated and bold.',
    description: 'The Wave Chain finds the balance between understated and bold. Its flowing silhouette and sculpted bead details create a design that fits every style. Light enough for everyday wear, distinctive enough to elevate any outfit—it\'s the one chain you\'ll keep reaching for.',
    materials: ['Stainless Steel'],
    dimensions: '19 Inch + 2 Inch Extension',
    care: [
      '100% Waterproof, sweatproof, and heatproof safe for 24/7 wear',
      'Wipe clean with a soft microfiber cloth'
    ],
    whyItHits: [
      'A unique wave-inspired design',
      'Pairs effortlessly with every outfit',
      'The perfect balance—not too minimal, not too bold',
      'Waterproof',
      'Anti-tarnish'
    ],
    matchWithSlugs: ['rogue-chain', 'bar-pendant'],
    seoTitle: "WAVE CHAIN | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Sculpted wave link chain for men in mirror-finish surgical steel. Organic fluid movement for modern icon style. PASAAVA luxury hardware. Shop now.",
    inStock: true
  },
  {
    id: 'drop-5',
    slug: 'bar-pendant',
    title: 'BAR PENDANT',
    subtitle: 'Minimalist Architectural Cylinder Pendant',
    category: 'Pendants',
    gender: 'men',
    price: 500,
    rating: 4.8,
    reviewCount: 51,
    images: ['/images/drop-bar-pendant.jpg'],
    tagline: 'Sleek monolithic column suspended on a fine diamond-cut link chain.',
    description: 'A monolithic, clean-cut architectural cylinder pendant suspended on an ultra-fine diamond-cut link chain. Delivering understated authority with quiet confidence, the Bar Pendant is engineered from solid surgical steel to withstand ocean water, gym sweat, and daily showers without fading.',
    materials: ['Solid 316L Surgical Stainless Steel', 'Anti-Tarnish Vacuum Bond', 'Sweat & Heat Resistant'],
    dimensions: 'Pendant: 35mm x 5mm | Chain: 22 Inch (55 cm) Diamond-Cut Chain',
    care: ['Safe for 24/7 continuous wear', '100% Waterproof & Sweatproof'],
    whyItHits: [
      'Minimalist monolithic architectural column',
      'Ultra-durable solid surgical steel',
      'Pairs effortlessly with every outfit',
      '100% Waterproof & Sweatproof',
      'Anti-tarnish vacuum bond'
    ],
    matchWithSlugs: ['spikeball-pendant-chain', 'wave-chain'],
    seoTitle: "BAR PENDANT | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Minimalist cylindrical bar pendant necklace for men. Anti-tarnish waterproof stainless steel on fine chain. PASAAVA men’s jewellery. Shop now.",
    inStock: true
  },
  {
    id: 'prod-1',
    slug: 'aurora-bar-necklace',
    title: 'Vanguard Linear Bar Pendant',
    subtitle: 'Architectural Beveled Column',
    category: 'Pendants',
    gender: 'men',
    price: 85,
    originalPrice: 105,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://framerusercontent.com/images/Ba21yBPGHRUsrn4i18ocfiDYx4.png',
      '/images/model-men-chain.jpg',
      'https://framerusercontent.com/images/jQiXYz9z73L26VWiQbz5KpOYlMc.png'
    ],
    tagline: 'Absolutely stunning masculine craftsmanship. The minimalist bar silhouette anchors any look with quiet authority.',
    description: 'A solid, diamond-beveled bar pendant suspended from a precision cable chain. Vanguard delivers understated architectural presence, engineered from waterproof surgical steel to withstand daily gym sessions and ocean dips.',
    materials: ['316L Surgical-Grade Stainless Steel', 'Vacuum PVD 18K Gold Coating', 'Hypoallergenic & Sweatproof'],
    dimensions: 'Bar Length: 35mm x 4mm | Chain: 22" (55 cm) heavy 2.5mm chain',
    care: ['100% waterproof: safely wear in the shower, pool, and gym', 'Wipe clean with a microfiber polishing cloth'],
    matchWithSlugs: ['atlas-cuban-chain', 'atlas-signet-ring', 'atlas-curb-bracelet', 'titan-link-bracelet'],
    reviewQuote: {
      text: 'The weight and polish are exceptional. Hangs perfectly on the chest and has not tarnished after 8 months.',
      author: 'Marcus Vance'
    },
    seoTitle: "Vanguard Bar Pendant | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Vanguard architectural bar pendant necklace for men. Engineered in 18K gold PVD and 316L surgical steel. PASAAVA premium jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Polished Silver', hex: '#e0e0e0' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-2',
    slug: 'stella-tennis-bracelet',
    title: 'Viper Diamond-Cut Tennis Bracelet',
    subtitle: 'High-Refraction Precision Wristwear',
    category: 'Bracelets',
    gender: 'men',
    price: 110,
    originalPrice: 140,
    badge: 'Best Seller',
    rating: 5.0,
    reviewCount: 64,
    images: [
      'https://framerusercontent.com/images/U5UBbloNax0IEOEJ7hNVMuyjoo.png',
      '/images/model-men-tennis.jpg',
      'https://framerusercontent.com/images/zkg02oyXOqdNAHojKzwH1TFwUoE.png'
    ],
    tagline: 'The ideal modern wrist statement. Delivers an elite iced finish that layers seamlessly alongside luxury timepieces.',
    description: 'Featuring bezel-reinforced brilliant crystals set in surgical steel, the Viper Tennis Bracelet brings masculine confidence to red-carpet tailoring and casual streetwear alike. Finished with a heavy-duty double-latch lock.',
    materials: ['Grade AAA+ Brilliant Carbonite Stones', 'Solid 316L Stainless Steel / Rhodium Plated', 'Double-latch compression safety lock'],
    dimensions: 'Stone Width: 4mm | Length: 7.8 inches (20 cm) / 8.5 inches (21.5 cm)',
    care: ['Rinse with warm water after workouts', 'Safe for 24/7 continuous wear'],
    whyItHits: [
      'Bezel-reinforced brilliant crystals that never fall out',
      'Sits perfectly flush next to luxury timepieces',
      'The perfect balance—not too minimal, not too bold',
      'Double-latch compression safety lock',
      '100% Waterproof, sweatproof & anti-tarnish'
    ],
    matchWithSlugs: ['titan-brushed-ring', 'atlas-cuban-chain', 'titan-figaro-chain'],
    reviewQuote: {
      text: 'Catches the light with razor sharpness without looking gaudy. Pairs seamlessly next to my diver watch.',
      author: 'Julian Reed'
    },
    seoTitle: "Viper Tennis Bracelet | Bracelets | PASAAVA Jewellery",
    seoDesc: "Viper diamond-cut tennis wristwear for men. Features ultra-refractive cubic zirconia in waterproof steel. PASAAVA luxury jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#d9d9d9' },
      { name: '18K Gold PVD', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-3',
    slug: 'atlas-cuban-chain',
    title: 'Atlas Cuban Chain',
    subtitle: 'Classic Beveled Curb Links',
    category: 'Neck Chains',
    gender: 'men',
    price: 95,
    originalPrice: 120,
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 39,
    images: [
      'https://framerusercontent.com/images/PxO9IZNMXjwyyilMupP56c2RJac.png',
      '/images/model-men-cuban.jpg',
      'https://framerusercontent.com/images/Ba21yBPGHRUsrn4i18ocfiDYx4.png'
    ],
    tagline: 'Heavy, authoritative weight that sits perfectly flat against the chest. Never twists or catches hair.',
    description: 'A bold, diamond-cut Cuban chain that balances masculine strength with refined luxury. Precision engineered with tight interlocking links and custom engraved PASAAVA clasp.',
    materials: ['316L Surgical-Grade Stainless Steel', 'Vacuum PVD 18K Gold Coating', 'Waterproof, sweatproof & tarnish-proof'],
    dimensions: 'Width: 6mm | Length: 20" / 22" / 24"',
    care: ['Water-safe for showers, ocean dips, and workouts', 'Clean with lukewarm water and soft cloth'],
    matchWithSlugs: ['atlas-curb-bracelet', 'atlas-signet-ring', 'titan-link-bracelet'],
    reviewQuote: {
      text: 'The weight and polish are incredible. I wear it daily in the gym and shower without any discoloration.',
      author: 'Marcus Vance'
    },
    seoTitle: "Atlas Cuban Chain | Neck Chains | PASAAVA Men's Jewellery",
    seoDesc: "Commanding Atlas Cuban link chain for men. Crafted from solid 316L steel with mirror-polished beveled edges. Premium PASAAVA jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Polished Silver', hex: '#c0c0c0' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-4',
    slug: 'atlas-curb-bracelet',
    title: 'Atlas Curb Bracelet',
    subtitle: 'Refined Solid Metal Wristwear',
    category: 'Bracelets',
    gender: 'men',
    price: 75,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://framerusercontent.com/images/84jlvuJ8udhrjbQhFhQmW7O1Gk.png',
      '/images/model-men-wrist.jpg',
      'https://framerusercontent.com/images/wmAm0qY52ZwN6P5nfRp9w6ua4k.png'
    ],
    tagline: 'The essential wrist hardware. Understated yet adds an unmistakable edge to casual tees or tailored blazers.',
    description: 'Matching our signature Atlas chain, this curb link bracelet delivers clean architecture for modern wrists. Finished with a discreet fold-over magnetic lock.',
    materials: ['Solid 316L Stainless Steel', 'Mirror Polished Beveled Edges', 'Hypoallergenic'],
    dimensions: 'Width: 7mm | Sizes: Medium (7.5"), Large (8.25")',
    care: ['Tarnish-free: safely wear in water and during high-intensity training'],
    matchWithSlugs: ['atlas-cuban-chain', 'atlas-signet-ring', 'titan-brushed-ring'],
    reviewQuote: {
      text: 'Super comfortable fit and the clasp mechanism is rock solid. Definitely my favorite everyday piece.',
      author: 'David Wright'
    },
    seoTitle: "Atlas Curb Bracelet | Bracelets | PASAAVA Men's Jewellery",
    seoDesc: "Substantial Atlas curb chain bracelet for men. Cast in heavy 316L surgical steel with secure custom clasp. PASAAVA luxury wristwear. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver', hex: '#d0d0d0' },
      { name: 'Gold', hex: '#c5a059' },
      { name: 'Matte Black', hex: '#1c1c1a' }
    ]
  },
  {
    id: 'prod-5',
    slug: 'elara-crystal-necklace',
    title: 'Apex Solitaire Pendant Chain',
    subtitle: 'Bezel-Framed Geometric Mineral Stone',
    category: 'Pendants',
    gender: 'men',
    price: 70,
    originalPrice: 90,
    badge: 'New',
    rating: 5.0,
    reviewCount: 22,
    images: [
      'https://framerusercontent.com/images/nODJZxMqQ7zEhNvgipPzKuxV8kw.png',
      '/images/model-men-chain.jpg',
      'https://framerusercontent.com/images/Ba21yBPGHRUsrn4i18ocfiDYx4.png'
    ],
    tagline: 'Sharp geometric setting with deep refraction. Subtle yet undeniably commanding.',
    description: 'The Apex Solitaire features a dark-tinted faceted stone encased within an angular surgical steel bezel. Paired with a heavy box link chain designed for active gentlemen.',
    materials: ['Lab-Treated High Refraction Stone', '316L Stainless Steel / Rhodium finish', 'Nickel & Lead-free'],
    dimensions: 'Pendant: 9mm x 9mm | Chain: 22" (55 cm) box chain',
    care: ['100% tarnish resistant and sweatproof'],
    matchWithSlugs: ['ryder-black-stud', 'atlas-cuban-chain', 'titan-brushed-ring'],
    reviewQuote: {
      text: 'Striking without being over the top. Looks awesome over black tees.',
      author: 'Ethan Parker'
    },
    seoTitle: "Apex Solitaire Pendant | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Apex solitaire crystal pendant necklace for men. Precision-cut stone bezel set in waterproof surgical steel. Luxury PASAAVA jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#d6d6d6' },
      { name: 'Matte Black', hex: '#1c1c1a' }
    ]
  },
  {
    id: 'prod-6',
    slug: 'knox-rope-bracelet',
    title: 'Knox Rope Bracelet',
    subtitle: 'Twisted Nautical Spiral Weave',
    category: 'Bracelets',
    gender: 'men',
    price: 65,
    badge: 'New',
    rating: 4.7,
    reviewCount: 19,
    images: [
      'https://framerusercontent.com/images/IFBb2WLUnvXt0zQrmSWblT5xs.png',
      '/images/model-men-wrist.jpg',
      'https://framerusercontent.com/images/84jlvuJ8udhrjbQhFhQmW7O1Gk.png'
    ],
    tagline: 'Rugged yet remarkably sophisticated. Layers naturally alongside any chronograph.',
    description: 'A densely woven spiral rope chain bracelet engineered for durability. Features high-reflection diamond facets and a sturdy lobster claw fastener.',
    materials: ['Polished 316L Stainless Steel', 'Ultra-dense 4mm spiral weave'],
    dimensions: 'Width: 4mm | Length: 7.8 inches (20 cm)',
    care: ['100% waterproof and sweat resistant'],
    matchWithSlugs: ['harper-rope-chain', 'atlas-signet-ring', 'orion-leather-bracelet'],
    reviewQuote: {
      text: 'Great shine and texture. Doesn’t pull arm hairs and fits smoothly with my chronograph.',
      author: 'Liam Evans'
    },
    seoTitle: "Knox Rope Bracelet | Bracelets | PASAAVA Men's Jewellery",
    seoDesc: "Knox nautical twisted rope bracelet for men. Diamond-cut interlocking links in waterproof stainless steel. PASAAVA men’s jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver', hex: '#cccccc' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-7',
    slug: 'ivy-twist-ring',
    title: 'Vector Sculpted Twist Band',
    subtitle: 'Industrial Contoured Steel Band',
    category: 'Rings',
    gender: 'men',
    price: 55,
    originalPrice: 70,
    badge: 'New',
    rating: 4.9,
    reviewCount: 37,
    images: [
      'https://framerusercontent.com/images/5pjiTDl3CcUK2par7nFqeCS015A.png',
      '/images/model-men-ring.jpg',
      '/images/model-men-signet.jpg'
    ],
    tagline: 'The angular twist profile gives it an unmistakable architectural character.',
    description: 'Forged from high-tensile stainless steel, the Vector Twist Band wraps around the finger with machined precision. A modern statement piece engineered for thumb, index, or middle finger wear.',
    materials: ['Solid 316L Stainless Steel', 'Vacuum PVD 18K Gold Coating', 'Comfort-fit curved interior'],
    dimensions: 'Band Width: 6.5mm | Sizes: US 8, 9, 10, 11, 12, 13',
    care: ['Scratch-resistant PVD coating; workout and water safe'],
    matchWithSlugs: ['atlas-signet-ring', 'titan-brushed-ring', 'knox-rope-bracelet'],
    reviewQuote: {
      text: 'The twisted silhouette looks rugged and masculine. Fits comfortably on my index finger.',
      author: 'Cole Reynolds'
    },
    seoTitle: "Vector Sculpted Band | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Vector twisted sculptural statement band ring for men. Hypoallergenic solid steel contour with satin finish. PASAAVA luxury hardware. Shop now.",
    inStock: true,
    colors: [
      { name: 'Gold', hex: '#d4af37' },
      { name: 'Silver Steel', hex: '#e0e0e0' }
    ]
  },
  {
    id: 'prod-8',
    slug: 'ryder-black-stud',
    title: 'Ryder Black Stud',
    subtitle: 'Minimalist Matte Onyx Inlay',
    category: 'Earrings',
    gender: 'men',
    price: 45,
    badge: 'New',
    rating: 4.8,
    reviewCount: 28,
    images: [
      'https://framerusercontent.com/images/r9H4vtBaPgRhmiligsRaTdMG3SY.png',
      '/images/model-men-earring.jpg',
      'https://framerusercontent.com/images/XbnVJs2Dp5llWiEXWZhgIRl6k2U.png'
    ],
    tagline: 'These studs are sleek, modern, and incredibly comfortable. Perfect for everyday wear.',
    description: 'A sleek matte black stud designed for effortless everyday wear. Lightweight and versatile, the Ryder Black Stud is a modern essential that complements any look.',
    materials: ['Matte Black PVD Titanium', 'Natural Black Onyx Stone', 'Screw-back secure post'],
    dimensions: 'Diameter: 7mm | Post Gauge: 20G (0.8mm standard)',
    care: ['Safe for 24/7 wear and sensitive ears'],
    matchWithSlugs: ['ryder-cross-hoop', 'titan-brushed-ring', 'atlas-cuban-chain'],
    reviewQuote: {
      text: 'Super comfortable to sleep in and never irritates my sensitive piercings. Best men\'s studs on the market.',
      author: 'Alexander Cole'
    },
    seoTitle: "Ryder Black Studs | Earrings | PASAAVA Men's Jewellery",
    seoDesc: "Minimalist Ryder matte black onyx stud earrings for men. Built from hypoallergenic surgical steel for daily wear. PASAAVA men's jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Gunmetal', hex: '#444444' }
    ]
  },
  {
    id: 'prod-9',
    slug: 'harper-rope-chain',
    title: 'Knox Spiral Rope Chain',
    subtitle: 'Diamond-Cut Heavyweight Rope',
    category: 'Neck Chains',
    gender: 'men',
    price: 68,
    originalPrice: 85,
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 53,
    images: [
      'https://framerusercontent.com/images/MPEa3idQMA3k9ZZqe4n9NTrlcnk.png',
      '/images/model-men-cuban.jpg',
      'https://framerusercontent.com/images/PxO9IZNMXjwyyilMupP56c2RJac.png'
    ],
    tagline: 'Heavy, diamond-cut rope links that catch light with high-intensity gleam.',
    description: 'A 4mm diamond-cut twisted rope chain built for standout masculinity. Engineered with reinforced weld joints to safely hold heavy pendants or stand strong on its own.',
    materials: ['316L Surgical Steel', '18K Gold Vacuum Bonded', 'Anti-tarnish barrier'],
    dimensions: 'Width: 4mm | Length: 20" / 22" / 24"',
    care: ['100% waterproof and sweatproof'],
    matchWithSlugs: ['atlas-cuban-chain', 'knox-rope-bracelet', 'atlas-signet-ring'],
    reviewQuote: {
      text: 'The 4mm width is the sweet spot. Looks thick and solid without being too flashy.',
      author: 'Travis Hayes'
    },
    seoTitle: "Knox Spiral Rope Chain | Neck Chains | PASAAVA Jewellery",
    seoDesc: "Heavyweight Knox diamond-cut spiral rope chain for men. Rich textured links forged in waterproof 316L steel. Luxury PASAAVA jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: '18K Gold', hex: '#d4af37' },
      { name: 'Raw Silver', hex: '#e2e2e2' }
    ]
  },
  {
    id: 'prod-10',
    slug: 'nova-open-ring',
    title: 'Nexus Geometric Open Band',
    subtitle: 'Architectural Dual-Finial Open Band',
    category: 'Rings',
    gender: 'men',
    price: 52,
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 35,
    images: [
      'https://framerusercontent.com/images/5pjiTDl3CcUK2par7nFqeCS015A.png',
      '/images/model-men-ring.jpg',
      '/images/model-men-signet.jpg'
    ],
    tagline: 'Bold, brutalist, and engineered with calibrated spring tension for multi-finger versatility.',
    description: 'An architectural open ring terminating in solid polished sphere nodes. High-memory surgical steel ensures custom tension fit across US sizes 8 through 12.',
    materials: ['Solid 316L Stainless Steel', 'Thick 18K Gold PVD Coating'],
    dimensions: 'Band Thickness: 4.5mm | Adjustable Sizes US 8-12',
    care: ['Adjust gently with even pressure from both sides'],
    matchWithSlugs: ['titan-brushed-ring', 'atlas-signet-ring', 'knox-rope-bracelet'],
    reviewQuote: {
      text: 'I can shift this ring between my index and thumb easily. Solid weight and clean lines.',
      author: 'Mason Ward'
    },
    seoTitle: "Nexus Open Band Ring | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Architectural Nexus dual-finial open band ring for men. Precision-engineered in waterproof surgical steel. PASAAVA designer jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Gold', hex: '#d4af37' },
      { name: 'Silver Steel', hex: '#dcdcdc' }
    ]
  },
  {
    id: 'prod-11',
    slug: 'luna-charm-bracelet',
    title: 'Monolith Carabiner Link Bracelet',
    subtitle: 'Heavy Industrial Marine Hardware',
    category: 'Bracelets',
    gender: 'men',
    price: 78,
    originalPrice: 95,
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://framerusercontent.com/images/84jlvuJ8udhrjbQhFhQmW7O1Gk.png',
      '/images/model-men-wrist.jpg',
      'https://framerusercontent.com/images/H5MRLsKWNTVStfe2CFAw5e3eI.png'
    ],
    tagline: 'Bold elongated links anchored by a functional screw-lock carabiner clasp.',
    description: 'Industrial elongated link geometry inspired by modern architecture. Features a precision threaded carabiner shackle for unbreakable security on active wrists.',
    materials: ['Solid 316L Stainless Steel', 'Threaded Carabiner Screw Clasp', 'Hypoallergenic'],
    dimensions: 'Link Width: 8mm | Length: 8.2 inches (21 cm)',
    care: ['Shower, ocean, and sweatproof'],
    matchWithSlugs: ['atlas-cuban-chain', 'titan-figaro-chain', 'titan-link-bracelet'],
    reviewQuote: {
      text: 'The carabiner closure is badass. Heavy, substantial, and definitely turns heads.',
      author: 'Lucas Vance'
    },
    seoTitle: "Monolith Link Bracelet | Bracelets | PASAAVA Jewellery",
    seoDesc: "Monolith carabiner chain bracelet for men. Heavy industrial marine hardware cast in 316L stainless steel. Luxury PASAAVA men's wristwear. Shop now.",
    inStock: true,
    colors: [
      { name: '18K Gold PVD', hex: '#d4af37' },
      { name: 'Stainless Silver', hex: '#dedede' }
    ]
  },
  {
    id: 'prod-12',
    slug: 'titan-figaro-chain',
    title: 'Titan Figaro Chain',
    subtitle: 'Classic 3+1 Italian Rhythm',
    category: 'Neck Chains',
    gender: 'men',
    price: 88,
    originalPrice: 110,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 47,
    images: [
      'https://framerusercontent.com/images/05bc6wmpeS7TUCStiA1Iieq0.png',
      'https://framerusercontent.com/images/NtvXPUNXeZMbTd4IHqODCNwpZQQ.jpg',
      'https://framerusercontent.com/images/AoUWlh0YMIRRwExNJEP5E8ZBA.png'
    ],
    tagline: 'An iconic Italian chain pattern engineered with heavyweight surgical steel.',
    description: 'Alternating three circular links with an elongated oval link in the timeless Figaro pattern. Diamond-ground flats reflect ambient light sharply.',
    materials: ['Grade 316L Stainless Steel', 'Electro-plated 18K Yellow Gold', 'Sweat & Water-proof'],
    dimensions: 'Width: 5.5mm | Length: 22" (55 cm)',
    care: ['No special maintenance needed; shower & workout proof'],
    matchWithSlugs: ['titan-link-bracelet', 'titan-brushed-ring', 'atlas-cuban-chain'],
    reviewQuote: {
      text: 'Timeless styling. Looks amazing paired with an open collar shirt or crew neck sweater.',
      author: 'Ethan Parker'
    },
    seoTitle: "Titan Figaro Chain | Neck Chains | PASAAVA Men's Jewellery",
    seoDesc: "Classic Titan 3+1 Figaro chain for men. Italian inspired high-polish rhythm forged in waterproof surgical steel. PASAAVA luxury chains. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#bfbfbf' },
      { name: 'Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-13',
    slug: 'ryder-cross-hoop',
    title: 'Ryder Cross Hoop',
    subtitle: 'Versatile 2-in-1 Huggie Hoop',
    category: 'Earrings',
    gender: 'men',
    price: 48,
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 33,
    images: [
      'https://framerusercontent.com/images/79YSJy67zZWyKgSHnWkgTr4uZg.png',
      '/images/model-men-earring.jpg',
      'https://framerusercontent.com/images/XbnVJs2Dp5llWiEXWZhgIRl6k2U.png'
    ],
    tagline: 'The cross detail is subtle yet stylish. They are lightweight enough for everyday wear.',
    description: 'A contemporary hoop featuring a removable cross charm, designed for versatile everyday styling. The Ryder Cross Hoop lets you wear it two ways — bold with the charm, clean without it.',
    materials: ['316L Solid Stainless Steel', 'Removable Beveled Charm', 'Snap-bar click closure'],
    dimensions: 'Hoop Outer Diameter: 14mm | Cross Height: 12mm',
    care: ['Hypoallergenic post; safe for 24/7 wear'],
    matchWithSlugs: ['ryder-black-stud', 'atlas-cuban-chain', 'atlas-signet-ring'],
    reviewQuote: {
      text: 'The cross detail is subtle yet stylish. Lightweight enough for everyday wear and the clasp is super tight.',
      author: 'Zack Thorne'
    },
    seoTitle: "Ryder Cross Hoops | Earrings | PASAAVA Men's Jewellery",
    seoDesc: "Versatile Ryder cross pendant huggie hoop earrings for men. Detachable charm in hypoallergenic surgical steel. PASAAVA men’s jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver', hex: '#cccccc' },
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-14',
    slug: 'atlas-signet-ring',
    title: 'Atlas Signet Ring',
    subtitle: 'Geometric Cushion Face Signet',
    category: 'Rings',
    gender: 'men',
    price: 65,
    originalPrice: 80,
    badge: 'Popular',
    rating: 5.0,
    reviewCount: 56,
    images: [
      'https://framerusercontent.com/images/jQiXYz9z73L26VWiQbz5KpOYlMc.png',
      '/images/model-men-signet.jpg',
      '/images/model-men-ring.jpg'
    ],
    tagline: 'Solid, weighted feel with a smooth brushed top and mirror-polished sides.',
    description: 'A contemporary reinterpretation of the traditional family signet. Features a brushed cushion-shaped top surface framed by mirror-polished beveled shoulders.',
    materials: ['316L Surgical Steel', 'Comfort-fit curved inner shank'],
    dimensions: 'Top Width: 14mm x 14mm | Sizes: US 8, 9, 10, 11, 12, 13',
    care: ['100% waterproof and scratch resistant'],
    matchWithSlugs: ['atlas-cuban-chain', 'atlas-curb-bracelet', 'titan-brushed-ring'],
    reviewQuote: {
      text: 'A clean, handsome ring with just the right amount of presence without being gaudy.',
      author: 'Noah Bennett'
    },
    seoTitle: "Atlas Signet Ring | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Bold Atlas cushion face signet ring for men. Substantial solid 316L steel with clean brushed geometric top. PASAAVA luxury hardware. Shop now.",
    inStock: true,
    colors: [
      { name: 'Polished Silver', hex: '#c8c8c8' },
      { name: 'Gold Vermeil', hex: '#c5a059' }
    ]
  },
  {
    id: 'prod-15',
    slug: 'titan-link-bracelet',
    title: 'Titan Link Bracelet',
    subtitle: 'Industrial Architectural Links',
    category: 'Bracelets',
    gender: 'men',
    price: 92,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://framerusercontent.com/images/H5MRLsKWNTVStfe2CFAw5e3eI.png',
      '/images/model-men-wrist.jpg',
      'https://framerusercontent.com/images/84jlvuJ8udhrjbQhFhQmW7O1Gk.png'
    ],
    tagline: 'Exceptional heavy build quality. Looks like high-end luxury horology hardware.',
    description: 'Precision machined links connected by articulated stainless pins. Delivers an authoritative wrist presence with an engineered deployment buckle.',
    materials: ['Stainless Steel 316L with brushed finish', 'Push-button butterfly clasp'],
    dimensions: 'Width: 10mm | Length: 8.5" (removable links for custom sizing)',
    care: ['Includes link removal tool for custom sizing'],
    matchWithSlugs: ['titan-figaro-chain', 'titan-brushed-ring', 'atlas-cuban-chain'],
    reviewQuote: {
      text: 'Feels like high-end watch craftsmanship on the wrist. Solid, heavy, and very masculine.',
      author: 'Alexander Cole'
    },
    seoTitle: "Titan Link Bracelet | Bracelets | PASAAVA Men's Jewellery",
    seoDesc: "Titan architectural block link bracelet for men. Precision faceted links in sweatproof 316L stainless steel. PASAAVA luxury wristwear. Shop now.",
    inStock: true,
    colors: [
      { name: 'Brushed Silver', hex: '#cccccc' },
      { name: 'All Black', hex: '#1c1c1a' }
    ]
  },
  {
    id: 'prod-16',
    slug: 'titan-brushed-ring',
    title: 'Titan Brushed Ring',
    subtitle: 'Beveled Edge Industrial Band',
    category: 'Rings',
    gender: 'men',
    price: 50,
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 41,
    images: [
      'https://framerusercontent.com/images/AoUWlh0YMIRRwExNJEP5E8ZBA.png',
      '/images/model-men-ring.jpg',
      '/images/model-men-signet.jpg'
    ],
    tagline: 'Sleek, minimalist, and sits completely comfortable with rounded comfort-fit inside.',
    description: 'A modern 8mm band featuring a satin center finish bordered by stepped polished edges. Crafted for supreme durability and ergonomic all-day comfort.',
    materials: ['Tungsten Carbide / 316L Steel Composite', 'Scratch-resistant satin finish'],
    dimensions: 'Band Width: 8mm | Sizes: US 8, 9, 10, 11, 12, 13',
    care: ['Extremely scratch resistant; wash with soap and water'],
    matchWithSlugs: ['titan-link-bracelet', 'atlas-signet-ring', 'orion-box-chain'],
    reviewQuote: {
      text: 'The contrast between the brushed center and mirror edges looks incredible.',
      author: 'Daniel Craig'
    },
    seoTitle: "Titan Brushed Ring | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Substantial Titan beveled industrial band ring for men. Dual-tone brushed center in waterproof surgical steel. PASAAVA men’s jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Gunmetal Silver', hex: '#b0b0b0' },
      { name: 'Midnight Black', hex: '#161616' }
    ]
  },
  {
    id: 'prod-17',
    slug: 'orion-leather-bracelet',
    title: 'Orion Leather Bracelet',
    subtitle: 'Braided Italian Calfskin & Steel',
    category: 'Bracelets',
    gender: 'men',
    price: 58,
    originalPrice: 75,
    badge: 'Sale',
    rating: 4.7,
    reviewCount: 26,
    images: [
      '/images/model-men-wrist.jpg',
      'https://framerusercontent.com/images/TFVDvAZcL3avp1jT8ze2kOppLc.png',
      'https://framerusercontent.com/images/IFBb2WLUnvXt0zQrmSWblT5xs.png'
    ],
    tagline: 'Genuine full-grain leather braided with precision and secured by magnetic steel.',
    description: 'Supple Italian leather intricately woven into a double-strand cord. Finished with an engraved stainless steel magnetic lock.',
    materials: ['Full-Grain Italian Calfskin', '316L Magnetic Locking Clasp'],
    dimensions: 'Cord Diameter: 6mm | Length: 8 inches (20.5 cm)',
    care: ['Condition with leather balm once a year; avoid submerging in water'],
    matchWithSlugs: ['orion-box-chain', 'titan-brushed-ring', 'knox-rope-bracelet'],
    reviewQuote: {
      text: 'Rich leather scent, soft on the wrist and the magnetic lock is snappy and secure.',
      author: 'James Wilson'
    },
    seoTitle: "Orion Leather Bracelet | Bracelets | PASAAVA Jewellery",
    seoDesc: "Orion braided Italian calfskin leather bracelet for men. Finished with a magnetic surgical steel clasp. Premium PASAAVA men's wristwear. Shop now.",
    inStock: true,
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Cognac Brown', hex: '#704214' }
    ]
  },
  {
    id: 'prod-18',
    slug: 'orion-box-chain',
    title: 'Orion Box Chain',
    subtitle: 'Geometric Squared Links',
    category: 'Neck Chains',
    gender: 'men',
    price: 72,
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 30,
    images: [
      'https://framerusercontent.com/images/AoUWlh0YMIRRwExNJEP5E8ZBA.png',
      'https://framerusercontent.com/images/oRY0c6Vv8NlU0NS0Fqjj4XHctg.png',
      '/images/model-men-cuban.jpg'
    ],
    tagline: 'Sleek geometric square links that lay straight and catch light cleanly.',
    description: 'A 3.5mm square box chain with tight structural tolerance and polished geometric planes. An understated classic that pairs seamlessly with any pendant or standalone.',
    materials: ['316L Stainless Steel', 'High-polish vacuum vapor coating'],
    dimensions: 'Width: 3.5mm | Length: 20" / 22" / 24"',
    care: ['Tarnish-proof: safe for swimming and showering'],
    matchWithSlugs: ['orion-leather-bracelet', 'atlas-signet-ring', 'titan-figaro-chain'],
    reviewQuote: {
      text: 'Simple, sharp, and very clean look. Exactly what I was searching for.',
      author: 'Julian Reed'
    },
    seoTitle: "Orion Box Chain | Neck Chains | PASAAVA Men's Jewellery",
    seoDesc: "Orion geometric squared box link chain for men. Clean architectural symmetry in waterproof 316L surgical steel. PASAAVA luxury chains. Shop now.",
    inStock: true,
    colors: [
      { name: 'Polished Silver', hex: '#d0d0d0' },
      { name: 'Warm Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-19',
    slug: 'celeste-drop-earrings',
    title: 'Apex Kinetic Spike Huggie',
    subtitle: 'Tapered Geometric Drop Huggie',
    category: 'Earrings',
    gender: 'men',
    price: 58,
    originalPrice: 75,
    badge: 'Popular',
    rating: 5.0,
    reviewCount: 39,
    images: [
      'https://framerusercontent.com/images/r9H4vtBaPgRhmiligsRaTdMG3SY.png',
      '/images/model-men-earring.jpg',
      'https://framerusercontent.com/images/XbnVJs2Dp5llWiEXWZhgIRl6k2U.png'
    ],
    tagline: 'Precision-machined geometric spike drop with secure click-lock closure.',
    description: 'Solid surgical steel huggie hoop featuring an articulated tapered spike pendant. Adds an edgy architectural sharpness to casual and smart attire.',
    materials: ['316L Solid Stainless Steel', 'Vacuum PVD Coated', 'Precision Click Mechanism'],
    dimensions: 'Hoop Diameter: 13mm | Spike Length: 16mm',
    care: ['Safe for workouts, showering, and active wear'],
    matchWithSlugs: ['ryder-black-stud', 'atlas-cuban-chain', 'titan-link-bracelet'],
    reviewQuote: {
      text: 'The movement of the spike is subtle and the click closure is solid. Definitely my favorite earring.',
      author: 'Dominic Cross'
    },
    seoTitle: "Apex Spike Huggie | Earrings | PASAAVA Men's Jewellery",
    seoDesc: "Apex kinetic geometric spike huggie earring for men. Edgy drop silhouette in hypoallergenic 316L surgical steel. PASAAVA men’s jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#e2e2e2' },
      { name: 'Matte Black', hex: '#161616' }
    ]
  },
  {
    id: 'prod-20',
    slug: 'aurora-hoop-earrings',
    title: 'Chronos Solid Huggie Hoops',
    subtitle: 'Heavyweight Beveled Edge Huggies',
    category: 'Earrings',
    gender: 'men',
    price: 54,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 61,
    images: [
      'https://framerusercontent.com/images/r9H4vtBaPgRhmiligsRaTdMG3SY.png',
      '/images/model-men-earring.jpg',
      'https://framerusercontent.com/images/79YSJy67zZWyKgSHnWkgTr4uZg.png'
    ],
    tagline: 'Solid thick steel profile with rounded interior for non-stop comfort.',
    description: 'Substantial 4mm wide huggie hoops engineered from solid stainless steel. Sits close to the lobe with a satisfying snap closure that will never accidentally loosen.',
    materials: ['Solid 316L Stainless Steel', '18K Gold Plated / Raw Silver'],
    dimensions: 'Diameter: 14mm | Width: 4mm',
    care: ['Hypoallergenic and shower proof'],
    matchWithSlugs: ['atlas-cuban-chain', 'titan-brushed-ring', 'knox-rope-bracelet'],
    reviewQuote: {
      text: 'Clean, thick, and doesn’t look flimsy like normal hoops. Snaps shut tightly.',
      author: 'Leo Sterling'
    },
    seoTitle: "Chronos Huggie Hoops | Earrings | PASAAVA Men's Jewellery",
    seoDesc: "Heavyweight Chronos beveled huggie hoop earrings for men. Snug clicker fit in hypoallergenic surgical steel. PASAAVA luxury ear jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#d6d6d6' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-21',
    slug: 'celeste-diamond-band',
    title: 'Vanguard Pavé Eternity Band',
    subtitle: 'Channel-Set Midnight Carbonite Band',
    category: 'Rings',
    gender: 'men',
    price: 74,
    originalPrice: 95,
    badge: 'Sale',
    rating: 4.9,
    reviewCount: 45,
    images: [
      'https://framerusercontent.com/images/5pjiTDl3CcUK2par7nFqeCS015A.png',
      '/images/model-men-ring.jpg',
      '/images/model-men-signet.jpg'
    ],
    tagline: 'A masculine 6mm channel-set band featuring deep-faceted stones that catch the light effortlessly.',
    description: 'Engineered from solid steel with a recessed channel of stones that sit flush against the metal, eliminating catching or snagging.',
    materials: ['316L Surgical Steel', 'Hand-set Carbonite Crystals', 'Smooth mirror interior'],
    dimensions: 'Band Width: 6mm | Sizes: US 8, 9, 10, 11, 12, 13',
    care: ['Clean with a soft brush and warm soapy water'],
    matchWithSlugs: ['atlas-cuban-chain', 'stella-tennis-bracelet', 'atlas-signet-ring'],
    reviewQuote: {
      text: 'The flush channel setting is brilliant. Doesn\'t catch on pockets or weight gym grips.',
      author: 'Brandon Ross'
    },
    seoTitle: "Vanguard Eternity Band | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Vanguard channel-set black carbonite eternity band ring for men. Stealth modern luxury in waterproof surgical steel. PASAAVA men's rings. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver Steel', hex: '#e4e4e4' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-22',
    slug: 'luna-signet-ring',
    title: 'Centurion Starburst Signet',
    subtitle: 'Chiseled Compass Starburst Inlay',
    category: 'Rings',
    gender: 'men',
    price: 60,
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 32,
    images: [
      'https://framerusercontent.com/images/jQiXYz9z73L26VWiQbz5KpOYlMc.png',
      '/images/model-men-signet.jpg',
      '/images/model-men-ring.jpg'
    ],
    tagline: 'An engraved octagonal signet featuring a central compass starburst talisman.',
    description: 'Forged with chiseled geometric contours, the Centurion Signet symbolizes navigation and inner resolve. Features a tapered band that feels light and ergonomic all day.',
    materials: ['316L Solid Steel', 'Deep-engraved starburst center', 'Antiqued patina shadow'],
    dimensions: 'Face Width: 12mm x 14mm | Sizes: US 8, 9, 10, 11, 12, 13',
    care: ['100% waterproof and scratch resistant'],
    matchWithSlugs: ['atlas-signet-ring', 'titan-figaro-chain', 'orion-box-chain'],
    reviewQuote: {
      text: 'The starburst compass engraving has great depth and texture. Fits great on the pinky or ring finger.',
      author: 'Nico Vance'
    },
    seoTitle: "Centurion Signet Ring | Rings | PASAAVA Men's Jewellery",
    seoDesc: "Centurion starburst compass signet ring for men. Chiseled face motif cast in durable 316L surgical steel. Luxury PASAAVA men's jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Silver', hex: '#d8d8d8' },
      { name: 'Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-23',
    slug: 'luna-pearl-pendant',
    title: 'Komorebi Baroque Pearl Talisman',
    subtitle: 'Organic Baroque Pearl on Heavy Curb Chain',
    category: 'Pendants',
    gender: 'men',
    price: 79,
    originalPrice: 98,
    badge: 'Best Seller',
    rating: 5.0,
    reviewCount: 51,
    images: [
      'https://framerusercontent.com/images/iRXpKAABEnQbRfM6xKFuJS7Y4.png',
      '/images/model-men-pendant.jpg',
      'https://framerusercontent.com/images/Ba21yBPGHRUsrn4i18ocfiDYx4.png'
    ],
    tagline: 'Raw organic texture meets heavy industrial steel hardware. The modern statement piece.',
    description: 'Bridging avant-garde runway style with raw coastal texture, this pendant features a substantial organic baroque pearl secured by a heavy stainless steel bail on a 22" curb chain.',
    materials: ['Grade AAA Cultured Baroque Pearl', '316L Stainless Steel Curb Chain & Bail', '100% Natural Organic Origin'],
    dimensions: 'Pearl: ~12-14mm organic shape | Chain: 22" heavy 3mm curb chain',
    care: ['Wipe clean after wear; safe for daily lifestyle'],
    matchWithSlugs: ['atlas-cuban-chain', 'titan-figaro-chain', 'atlas-curb-bracelet'],
    reviewQuote: {
      text: 'Pearls for men done right. The heavy chain balances the pearl so well. Gets tons of compliments.',
      author: 'Elijah Stone'
    },
    seoTitle: "Komorebi Pearl Talisman | Chains | PASAAVA Jewellery",
    seoDesc: "Komorebi natural baroque pearl pendant on heavy curb chain. Organic ocean luster meets masculine steel hardware. PASAAVA men's jewellery. Shop now.",
    inStock: true,
    colors: [
      { name: 'Organic Pearl / Silver', hex: '#e8e8e8' },
      { name: 'Organic Pearl / Gold', hex: '#fdfbf7' }
    ]
  },
  {
    id: 'prod-24',
    slug: 'nova-heart-necklace',
    title: 'Ares Shield Dog Tag Chain',
    subtitle: 'Beveled Military Shield Silhouette',
    category: 'Pendants',
    gender: 'men',
    price: 64,
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 36,
    images: [
      'https://framerusercontent.com/images/viZH732p2iPYhrL1y1AWHEsCuZE.png',
      '/images/model-men-chain.jpg',
      '/images/model-men-pendant.jpg'
    ],
    tagline: 'Heavy contoured military silhouette with beveled chamfered edge borders.',
    description: 'A modern evolution of the classic military dog tag. The Ares Shield features clean chamfers and a substantial solid core, suspended from a 22" micro-curb chain.',
    materials: ['316L Solid Stainless Steel', 'Mirror & Satin Dual-Finish'],
    dimensions: 'Tag: 24mm x 15mm | Chain: 22" (55 cm) chain',
    care: ['100% waterproof and scratch resistant'],
    matchWithSlugs: ['atlas-cuban-chain', 'orion-box-chain', 'atlas-signet-ring'],
    reviewQuote: {
      text: 'Clean geometry and solid weight. Layers perfectly with my Cuban chain.',
      author: 'Marcus Vance'
    },
    seoTitle: "Ares Shield Tag Chain | Chains | PASAAVA Men's Jewellery",
    seoDesc: "Ares beveled military shield dog tag chain for men. Industrial tactical finish in waterproof 316L surgical steel. PASAAVA luxury chains. Shop now.",
    inStock: true,
    colors: [
      { name: 'Polished Silver', hex: '#d4d4d4' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'prod-25',
    slug: 'siena-gold-chain',
    title: 'Siena Herringbone Snake Chain',
    subtitle: 'High-Luster Flat Liquid Chain',
    category: 'Neck Chains',
    gender: 'men',
    price: 72,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://framerusercontent.com/images/PxO9IZNMXjwyyilMupP56c2RJac.png',
      '/images/model-men-cuban.jpg',
      'https://framerusercontent.com/images/Ba21yBPGHRUsrn4i18ocfiDYx4.png'
    ],
    tagline: 'Liquid chrome shine that rests flat against the collarbone with fluid drape.',
    description: 'A liquid-metal herringbone flat snake chain engineered to contour naturally around the neckline. Finished with high-luster diamond polishing.',
    materials: ['Solid 316L Surgical Steel', 'Vacuum PVD 18K Gold Plated', 'Anti-tarnish barrier'],
    dimensions: 'Width: 4.5mm | Length: 20" / 22" / 24"',
    care: ['Store flat in box to prevent twisting the herringbone links'],
    matchWithSlugs: ['atlas-cuban-chain', 'atlas-curb-bracelet', 'titan-figaro-chain'],
    reviewQuote: {
      text: 'Lays completely flat like a ribbon of pure liquid metal. Super sleek under an open collar shirt.',
      author: 'Liam Vance'
    },
    seoTitle: "Siena Snake Chain | Neck Chains | PASAAVA Men's Jewellery",
    seoDesc: "Liquid Siena flat herringbone snake chain for men. Contours the collarbone in high-luster waterproof surgical steel. PASAAVA luxury chains. Shop now.",
    inStock: true,
    colors: [
      { name: 'Stainless Silver', hex: '#dcdcdc' },
      { name: '18K Gold', hex: '#d4af37' }
    ]
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  if (!slug) return undefined;
  const cleanSlug = slug
    .trim()
    .replace(/^(\/)?(product|products|p)\/+/i, '')
    .replace(/^(\/)?(product|products|p)\/+/i, '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();

  return products.find(
    (p) =>
      p.slug.toLowerCase() === cleanSlug ||
      p.id.toLowerCase() === cleanSlug
  );
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.badge === 'Best Seller').slice(0, 8);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.badge === 'New' || p.badge === 'Trending' || p.badge === 'Popular').slice(0, 8);
};

export const getProductsByGender = (gender: 'women' | 'men' | 'all' = 'all'): Product[] => {
  return products;
};

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category.toLowerCase() === 'all') return products;
  const target = category.toLowerCase().trim();
  if (target === 'rings' || target === 'ring') {
    return products.filter(p => p.category === 'Rings');
  }
  if (target === 'earrings' || target === 'earring') {
    return products.filter(p => p.category === 'Earrings');
  }
  if (target === 'chains' || target === 'chain') {
    return products.filter(p => p.category === 'Chains');
  }
  if (target.includes('neck') || target === 'neck-chains') {
    return products.filter(p => p.category === 'Neck Chains');
  }
  if (target.includes('bracelet')) {
    return products.filter(p => p.category === 'Bracelets');
  }
  if (target.includes('pendant')) {
    return products.filter(p => p.category === 'Pendants' || /\b(pendant|pendants|talisman|dog tag)\b/i.test(p.title));
  }
  return products.filter(p => p.category.toLowerCase() === target);
};

