/* ─── Types ─────────────────────────────────────────────────────────────────── */
export type Category = 'craft' | 'story' | 'tutorial' | 'culture' | 'care';

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'list' | 'tip';
  text?: string;
  attribution?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  views: number;
  image: string;
  featured?: boolean;
  tags: string[];
  content: ContentBlock[];
}

/* ─── Category meta ─────────────────────────────────────────────────────────── */
export const CAT_META: Record<
  Category,
  { label: string; color: string; bg: string; dot: string; border: string }
> = {
  craft: {
    label: 'Craft',
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
    dot: 'bg-terracotta',
    border: 'border-terracotta/20',
  },
  story: {
    label: 'Story',
    color: 'text-mocha',
    bg: 'bg-mocha/10',
    dot: 'bg-mocha',
    border: 'border-mocha/20',
  },
  tutorial: {
    label: 'Tutorial',
    color: 'text-sage',
    bg: 'bg-sage/15',
    dot: 'bg-sage',
    border: 'border-sage/25',
  },
  culture: {
    label: 'Culture',
    color: 'text-amber',
    bg: 'bg-amber/10',
    dot: 'bg-amber',
    border: 'border-amber/20',
  },
  care: {
    label: 'Care',
    color: 'text-rose',
    bg: 'bg-rose/10',
    dot: 'bg-rose',
    border: 'border-rose/20',
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NP', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

/* ─── Posts ──────────────────────────────────────────────────────────────────── */
export const POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'art-of-himalayan-crochet',
    title: 'The Art of Himalayan Crochet: Traditions Woven Through Generations',
    excerpt:
      'Discover how centuries-old crochet techniques from the mountain villages of Nepal have shaped every stitch in our collection, passed down through generations of skilled artisans.',
    category: 'story',
    author: 'Anita Sharma',
    authorRole: 'Founder & Lead Artisan',
    date: '2026-04-28',
    readTime: 7,
    views: 2840,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    tags: ['tradition', 'himalaya', 'heritage'],
    content: [
      {
        type: 'paragraph',
        text: 'High in the Annapurna foothills, where the air is thin and the winters long, women have been crocheting for generations — not as a hobby, but as a necessity. Warm garments, bedding, baskets, and carrying cloths were all born from the hook and yarn. When we founded Stitchery, we made a promise: every stitch would carry that history forward.',
      },
      {
        type: 'heading',
        text: 'A Craft Older Than the Label',
      },
      {
        type: 'paragraph',
        text: 'Most histories of crochet trace the craft to 19th-century Europe, but textile scholars increasingly point to much older origins in the Middle East and Asia. In Nepal, the techniques we use — tight single crochets for structure, loose chain lace for decoration, and the distinctive Himalayan join — predate the colonial-era naming of the craft by centuries.',
      },
      {
        type: 'paragraph',
        text: 'Our lead artisan, Devi Thapa, learned from her grandmother who learned from hers. The pattern she calls the "mountain petal" — used in our bestselling Himalayan Blossom keyring — has never been written down. It exists only in memory and muscle.',
      },
      {
        type: 'blockquote',
        text: 'My grandmother crocheted through two monsoons when there was no other income. Every flower she made fed the family for a week. When I crochet, I remember that.',
        attribution: '— Devi Thapa, Senior Artisan, Stitchery',
      },
      {
        type: 'heading',
        text: 'How We Preserve the Techniques',
      },
      {
        type: 'paragraph',
        text: 'At Stitchery, we have documented over forty distinct regional stitches with written patterns, video references, and hand-drawn diagrams. Each is cross-referenced to the village or district of origin. This archive lives in our Kathmandu workshop and is shared freely with any artisan who asks.',
      },
      {
        type: 'list',
        items: [
          'Mustang Chain Lace — an open, airy stitch used in decorative borders',
          'Dolpa Filled Oval — dense, warm stitch for winter garments',
          'Sindhupalchok Loop — a texture stitch mimicking yak fleece',
          'Kathmandu Valley Motif — stylised floral pattern from the Newar tradition',
        ],
      },
      {
        type: 'tip',
        text: 'If you want to learn these regional stitches, our workshop runs free monthly sessions in Thamel, Kathmandu. Drop us a message through the contact page to reserve a spot.',
      },
      {
        type: 'heading',
        text: 'Craft as Community',
      },
      {
        type: 'paragraph',
        text: 'For the 34 artisans who work with Stitchery, crochet is more than income — it is community. Many of our pieces are made cooperatively: one artisan crochets the body, another adds colour-work embellishment, and a third handles finishing. The final piece is never the work of one pair of hands.',
      },
      {
        type: 'paragraph',
        text: 'This is the tradition we want you to hold when you pick up a Stitchery piece. Not a product, but a conversation across centuries and hands.',
      },
    ],
  },
  {
    id: 'b2',
    slug: 'beginners-guide-to-crochet-flowers',
    title: "Beginner's Guide: Crocheting Your First Himalayan Flower",
    excerpt:
      'A step-by-step walkthrough for creating the iconic Himalayan Blossom — the same flower pattern that started Stitchery. Perfect for beginners with any yarn weight.',
    category: 'tutorial',
    author: 'Priya Thapa',
    authorRole: 'Senior Artisan',
    date: '2026-04-22',
    readTime: 12,
    views: 4120,
    image:
      'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    tags: ['tutorial', 'beginner', 'flowers'],
    content: [
      {
        type: 'paragraph',
        text: 'The Himalayan Blossom is the flower that started everything. When Anita made the first one from leftover wool in 2018 and posted a photo, the response was overwhelming. Eight years later it is still our most requested pattern. This guide will walk you through it from a standing start.',
      },
      {
        type: 'heading',
        text: 'What You Will Need',
      },
      {
        type: 'list',
        items: [
          'Worsted weight yarn in two colours (main petal colour + centre contrast)',
          '4.0 mm crochet hook (adjust for your tension)',
          'Yarn needle for weaving in ends',
          'Scissors',
          'Optional: keyring hardware or brooch pin',
        ],
      },
      {
        type: 'tip',
        text: 'Acrylic yarn works perfectly for beginners — it is forgiving, easy to see your stitches, and comes in hundreds of colours. For a more authentic Himalayan feel, try a merino-acrylic blend.',
      },
      {
        type: 'heading',
        text: 'Step 1: Magic Ring and Centre',
      },
      {
        type: 'paragraph',
        text: 'Start with a magic ring (also called a magic circle). If you are new to this, wrap the yarn twice around two fingers, insert your hook through the loop, pull up a loop, chain 1. This is your starting point — all the petals radiate from here.',
      },
      {
        type: 'paragraph',
        text: 'Round 1: Work 6 single crochets into the ring. Pull the magic ring tail to close the centre. Slip stitch to join. (6 sts). This tight centre is what gives the Himalayan Blossom its characteristic firm core.',
      },
      {
        type: 'heading',
        text: 'Step 2: Petal Rounds',
      },
      {
        type: 'paragraph',
        text: 'Round 2: Chain 4. Work 2 treble crochets into the same stitch. Chain 4. Slip stitch to next stitch. Repeat 5 more times. (6 petals). This is the defining round — the chain-4 bridge creates the pointed petal tip, and the trebles give it body.',
      },
      {
        type: 'blockquote',
        text: 'Keep your tension consistent through Round 2. Tight chains make small, elegant petals. Loose chains make large, theatrical ones. Neither is wrong — they are just different flowers.',
        attribution: '— Priya Thapa, Senior Artisan',
      },
      {
        type: 'heading',
        text: 'Finishing and Assembly',
      },
      {
        type: 'paragraph',
        text: 'Change to your contrast colour, work a single crochet through the centre of each petal to create a border ring, then slip stitch and fasten off. Weave in all ends. If making a keyring, attach hardware through the centre back with a jump ring.',
      },
    ],
  },
  {
    id: 'b3',
    slug: 'yak-wool-vs-merino',
    title: 'Yak Wool vs Merino: Which Yarn Is Right for Your Project?',
    excerpt:
      'We break down the warmth, softness, and durability of yak wool and merino — two fibres we source directly from Mustang and Dolpa districts — so you can choose with confidence.',
    category: 'craft',
    author: 'Rohan Gurung',
    authorRole: 'Materials Specialist',
    date: '2026-04-15',
    readTime: 6,
    views: 1980,
    image:
      'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&w=1200&q=85',
    tags: ['yarn', 'materials', 'wool'],
    content: [
      {
        type: 'paragraph',
        text: "Every fibre has a personality. Merino is smooth, reliable, and consistent. Yak wool is wild, incredibly warm, and deeply tied to the landscape of Nepal's high altitude districts. Understanding the difference helps you choose the right yarn for every project — and appreciate the cost difference.",
      },
      {
        type: 'heading',
        text: 'Yak Wool: The High-Altitude Fibre',
      },
      {
        type: 'paragraph',
        text: 'Yak wool (technically the downy undercoat combed from yaks in spring) comes primarily from Mustang and Dolpa in Nepal. It is naturally hollow, making it exceptionally warm for its weight. A yak-wool garment at 150g will outperform a sheep-wool garment at 250g in raw warmth.',
      },
      {
        type: 'list',
        items: [
          'Warmth-to-weight ratio: superior to merino',
          'Softness: comparable to cashmere, no lanolin so hypoallergenic',
          'Moisture management: wicks well, dries slowly',
          'Durability: very strong fibres, pill-resistant with care',
          'Colour range: naturally brown/grey; limited dyeable range',
        ],
      },
      {
        type: 'heading',
        text: 'Merino Wool: The Versatile Standard',
      },
      {
        type: 'paragraph',
        text: 'Our merino comes from small farms in the Gandaki Province. It is finer than standard wool (under 24 microns), meaning it lays against skin without itching. This makes it the default choice for any garment that touches bare skin — hats, scarves, and lightweight wraps.',
      },
      {
        type: 'blockquote',
        text: 'When a customer asks me which yarn to choose, my first question is always: what does the finished piece need to do? If it is decorative, choose merino for colour range. If it needs to keep someone genuinely warm, yak wins every time.',
        attribution: '— Rohan Gurung, Materials Specialist',
      },
      {
        type: 'tip',
        text: 'For flowers and keyrings, both work beautifully. Yak wool produces a slightly more textured, rustic look; merino gives a cleaner, more polished finish.',
      },
    ],
  },
  {
    id: 'b4',
    slug: 'caring-for-crochet-items',
    title: 'How to Wash and Store Your Crochet Pieces the Right Way',
    excerpt:
      'Handmade crochet needs a little extra love. Learn the exact washing, drying, and storage methods our artisans use to ensure your pieces last for years without losing their shape.',
    category: 'care',
    author: 'Anita Sharma',
    authorRole: 'Founder & Lead Artisan',
    date: '2026-04-10',
    readTime: 5,
    views: 3360,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    tags: ['care', 'maintenance', 'tips'],
    content: [
      {
        type: 'paragraph',
        text: 'The most common question we receive after a purchase is: "How do I wash this?" The short answer is: carefully, by hand, and never in a dryer. The long answer is below.',
      },
      {
        type: 'heading',
        text: 'Hand Washing — The Only Method We Recommend',
      },
      {
        type: 'list',
        items: [
          'Fill a basin with cool (not cold, not warm) water',
          'Add a small amount of wool wash or gentle shampoo — no regular detergent',
          'Submerge the piece and gently squeeze — never wring or twist',
          'Let soak for 10 minutes, then gently press out the water',
          'Roll in a clean towel to remove excess moisture',
          'Lay flat on a dry towel to air dry — never hang',
        ],
      },
      {
        type: 'tip',
        text: 'For pieces with wooden or metal embellishments, spot clean only. Water can cause wood to swell and metal to tarnish.',
      },
      {
        type: 'heading',
        text: 'Storing Your Pieces',
      },
      {
        type: 'paragraph',
        text: 'Wool is a protein fibre and attracts moths. Store woollen crochet pieces in sealed cotton or muslin bags with cedar balls or lavender sachets. Avoid plastic bags — they trap moisture and cause mildew.',
      },
      {
        type: 'blockquote',
        text: 'I have crochet pieces from my grandmother that are forty years old. They survived because she stored them wrapped in newspaper inside a cedar chest. Simple, but effective.',
        attribution: '— Anita Sharma, Founder',
      },
    ],
  },
  {
    id: 'b5',
    slug: 'tihar-festival-crochet-decorations',
    title: 'Tihar Special: Crochet Marigold Garlands for Your Home',
    excerpt:
      'Celebrate the Festival of Lights with our traditional crochet marigold garland pattern. These vibrant decorations are reusable year after year and look stunning around doorways.',
    category: 'culture',
    author: 'Sita Rai',
    authorRole: 'Cultural Designer',
    date: '2026-04-04',
    readTime: 9,
    views: 5200,
    image:
      'https://images.unsplash.com/photo-1605513524006-063ed6ed31e7?auto=format&fit=crop&w=1200&q=85',
    tags: ['tihar', 'festival', 'decor'],
    content: [
      {
        type: 'paragraph',
        text: 'Tihar — the Festival of Lights — fills Nepal with marigold garlands, oil lamps, and vibrant colour for five days every autumn. Fresh marigolds are beautiful but last only a day. Our crochet marigold garland lasts a lifetime, looks just as vivid, and can be folded into a bag and stored until next year.',
      },
      {
        type: 'heading',
        text: 'Cultural Significance of the Marigold',
      },
      {
        type: 'paragraph',
        text: "The marigold (sayapatri in Nepali) is Nepal's festival flower. Its bright saffron and orange shades represent prosperity and purity. It is used to welcome Laxmi, the goddess of wealth, into homes during Tihar, and its garlands frame every door and window in the Kathmandu Valley.",
      },
      {
        type: 'blockquote',
        text: 'My mother would string marigolds from dawn every Tihar morning. When I designed the crochet version, I wanted it to feel just as abundant — full, layered, and generous.',
        attribution: '— Sita Rai, Cultural Designer',
      },
      {
        type: 'heading',
        text: 'Making the Garland',
      },
      {
        type: 'list',
        items: [
          'Crochet 15–20 marigold flowers in orange and deep yellow',
          'Add optional green leaf pairs between each flower',
          'String on a jute or cotton cord, securing each flower with a knot',
          'Measure for your doorway — a standard Nepal door takes about 2.5m of garland',
          'Hang with simple command hooks to avoid wall damage',
        ],
      },
      {
        type: 'tip',
        text: 'Add a few LED fairy lights woven through the garland for a magical Tihar night effect. Use battery-powered lights so there are no trailing cords.',
      },
    ],
  },
  {
    id: 'b6',
    slug: 'color-theory-for-crochet',
    title: 'Color Theory for Crochet: Building Palettes Inspired by Nepal',
    excerpt:
      "From the saffron sunsets over Pokhara to the deep greens of Chitwan — learn how our designers translate Nepal's landscape into striking yarn palettes for every season.",
    category: 'craft',
    author: 'Priya Thapa',
    authorRole: 'Senior Artisan',
    date: '2026-03-28',
    readTime: 8,
    views: 2150,
    image:
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=85',
    tags: ['color', 'design', 'inspiration'],
    content: [
      {
        type: 'paragraph',
        text: 'Nepal is one of the most visually diverse countries on earth — from the snow-blue of Himalayan peaks to the ochre dust of Terai plains. Every Stitchery colour palette starts with a journey, real or imagined, through this landscape.',
      },
      {
        type: 'heading',
        text: 'Our Four Seasonal Palettes',
      },
      {
        type: 'list',
        items: [
          'Monsoon Blues: slate, steel, deep teal — inspired by storm clouds over Pokhara Lake',
          'Autumn Harvest: burnt orange, mustard, deep red — echoing the rice fields of Chitwan',
          'High Winter: ivory, smoke, pale sage — the colours of snow against pine',
          'Festival Spring: saffron, rose, turquoise — Tihar and Holi in a yarn palette',
        ],
      },
      {
        type: 'heading',
        text: 'Warm vs Cool Contrast in Crochet',
      },
      {
        type: 'paragraph',
        text: 'The most impactful crochet colour work uses warm-cool contrast: a warm main colour (terracotta, amber, rose) against a cool accent (sage, slate, teal). This is why our Himalayan Blossom keyring in terracotta with sage leaf accents is consistently our best-selling colourway.',
      },
      {
        type: 'blockquote',
        text: 'Colour is the first thing someone notices and the last thing they can describe. When a palette feels right, it is usually because the temperature balance is right.',
        attribution: '— Priya Thapa, Senior Artisan',
      },
      {
        type: 'tip',
        text: 'When in doubt, pull three colours from a single photograph of a Nepali landscape. Nature does not make colour mistakes.',
      },
    ],
  },
  {
    id: 'b7',
    slug: 'meet-the-artisans-mustang',
    title: 'Meet the Artisans: Weaving Dreams in the Mustang Valley',
    excerpt:
      'We visited the remote Mustang district to meet the women behind our signature yak-wool throws. Their stories of craft, resilience, and community will stay with you.',
    category: 'story',
    author: 'Rohan Gurung',
    authorRole: 'Materials Specialist',
    date: '2026-03-20',
    readTime: 10,
    views: 3870,
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85',
    tags: ['artisans', 'mustang', 'story'],
    content: [
      {
        type: 'paragraph',
        text: 'Lo Manthang, the walled city of Upper Mustang, sits at 3,840 metres. Electricity is intermittent, road access is seasonal, and the wind never truly stops. It is here, in a low stone room with a yak-dung stove, that Tenzin and her daughter Karma produce the throws that have become some of our most beloved products.',
      },
      {
        type: 'heading',
        text: 'A Day in the Mustang Workshop',
      },
      {
        type: 'paragraph',
        text: 'The day begins at 5am when the yaks are let out to graze. After morning chores, Tenzin and Karma work together at a traditional loom until the afternoon light fades. There is no artificial lighting strong enough to work by in the evenings. In a good month, they complete three throws.',
      },
      {
        type: 'blockquote',
        text: 'We learned from our mothers, who learned from theirs. The patterns are not written — they live in our hands. When I sleep, sometimes I dream in stitches.',
        attribution: '— Tenzin, Mustang Artisan',
      },
      {
        type: 'heading',
        text: 'The Fair Wage Agreement',
      },
      {
        type: 'paragraph',
        text: 'Stitchery pays Mustang artisans directly at a rate that represents three times the local market rate. We cover the transport cost of raw materials to Lo Manthang and the shipping of finished pieces to Kathmandu. No middlemen. All of this is documented in our annual transparency report.',
      },
      {
        type: 'tip',
        text: 'Every Mustang Throw ships with a small card bearing the name and photo of the artisan who made it. This is not a gimmick — it is accountability.',
      },
    ],
  },
  {
    id: 'b8',
    slug: 'sustainable-crochet-practices',
    title: 'Sustainable Crochet: How We Keep Our Craft Planet-Friendly',
    excerpt:
      'From naturally dyed yarn and zero-waste off-cuts to recycled packaging — a full breakdown of the sustainability practices woven into every step of our production process.',
    category: 'craft',
    author: 'Anita Sharma',
    authorRole: 'Founder & Lead Artisan',
    date: '2026-03-12',
    readTime: 7,
    views: 1740,
    image:
      'https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=1200&q=85',
    tags: ['sustainability', 'eco', 'process'],
    content: [
      {
        type: 'paragraph',
        text: 'Sustainability in craft is not a marketing term for us — it is a practical constraint. Working in Nepal, far from industrial supply chains, forces you to think about waste, longevity, and sourcing in ways that urban producers rarely consider.',
      },
      {
        type: 'heading',
        text: 'Natural Dyes',
      },
      {
        type: 'paragraph',
        text: 'About 40% of our yarn is naturally dyed using plants sourced from local growers: indigo for blues, madder root for reds and pinks, turmeric for yellow, and walnut husks for brown. Natural dyes are not as uniform as synthetic dyes — every batch varies slightly — but that variation is part of the beauty.',
      },
      {
        type: 'list',
        items: [
          'Zero synthetic dyes in our yak-wool collection',
          'Off-cuts are repurposed into stuffing for amigurumi pieces',
          'Packaging is recycled paper and handmade dhaka cloth',
          'Workshop runs on solar power during daylight hours',
        ],
      },
      {
        type: 'blockquote',
        text: 'The most sustainable product is one that lasts. A piece of crochet made with care from good yarn will outlast twenty fast-fashion garments.',
        attribution: '— Anita Sharma, Founder',
      },
    ],
  },
  {
    id: 'b9',
    slug: 'amigurumi-animal-tutorial',
    title: 'Amigurumi 101: Crochet a Baby Yak in an Afternoon',
    excerpt:
      'Our most requested pattern — a palm-sized yak plushie with a shaggy belly and tiny horns. Includes full written instructions, stitch count, and stuffing tips.',
    category: 'tutorial',
    author: 'Sita Rai',
    authorRole: 'Cultural Designer',
    date: '2026-03-05',
    readTime: 14,
    views: 6430,
    image:
      'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=1200&q=85',
    tags: ['amigurumi', 'tutorial', 'beginner'],
    content: [
      {
        type: 'paragraph',
        text: 'Amigurumi — the Japanese art of crocheted stuffed toys — meets the Himalayan yak in this pattern that has made our workshop the most followed crochet account in Nepal. The baby yak is forgiving for beginners, quick to complete, and deeply charming when done.',
      },
      {
        type: 'heading',
        text: 'Materials',
      },
      {
        type: 'list',
        items: [
          'Chunky yarn in dark brown (body) and cream (belly/face)',
          '5.0 mm hook',
          'Polyester stuffing',
          'Safety eyes 9mm × 2',
          'Small amount of black yarn for nostrils',
          'Pipe cleaners for horns (optional, makes them poseable)',
          'Stitch markers',
        ],
      },
      {
        type: 'tip',
        text: 'Use a slightly smaller hook than the yarn label recommends. Tighter stitches mean the stuffing stays inside and the toy holds its shape better over time.',
      },
      {
        type: 'heading',
        text: 'The Body — Round by Round',
      },
      {
        type: 'paragraph',
        text: 'Start with a magic ring and 6 sc. Round 2: increase in each stitch (12 sts). Round 3: *1 sc, 1 inc* × 6 (18 sts). Continue increasing every other round until you reach 36 stitches, then work even for 8 rounds to form the barrel-shaped body. Decrease back symmetrically, stuffing firmly before you close the last 6 stitches.',
      },
      {
        type: 'blockquote',
        text: 'The secret to a good amigurumi is overstuffing slightly. The toy compresses with handling, so what feels too firm at completion will feel perfect in a month.',
        attribution: '— Sita Rai, Cultural Designer',
      },
    ],
  },
  {
    id: 'b10',
    slug: 'dashain-gifting-guide',
    title: 'Dashain Gifting Guide: Handmade Gifts Your Family Will Treasure',
    excerpt:
      'From elegant wall hangings for elders to playful keyrings for siblings — a curated Dashain gift guide for every member of the family, all from our handcrafted collection.',
    category: 'culture',
    author: 'Priya Thapa',
    authorRole: 'Senior Artisan',
    date: '2026-02-25',
    readTime: 6,
    views: 4880,
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
    tags: ['dashain', 'gifts', 'culture'],
    content: [
      {
        type: 'paragraph',
        text: "Dashain is Nepal's greatest festival — fifteen days of family reunions, blessings from elders, and the exchange of gifts. A handmade gift during Dashain carries a message that no packaged product can: that someone took time, care, and skill for you.",
      },
      {
        type: 'heading',
        text: 'By Age Group',
      },
      {
        type: 'list',
        items: [
          'Grandparents: Mandala Wall Hanging or Himalayan Throw — something to display with pride',
          'Parents: Lotus Coaster Set or Flower Vase Wrap — functional and beautiful',
          'Siblings: Himalayan Blossom Keyring in their favourite colour',
          'Children: Baby Yak Amigurumi — instantly beloved by every child who sees it',
          'Friends: Gift card and let them choose their own piece',
        ],
      },
      {
        type: 'blockquote',
        text: 'My mother still has the wall hanging I gave her for Dashain three years ago. She moved it to the living room from the bedroom because she says it deserves to be seen.',
        attribution: '— Priya Thapa, Senior Artisan',
      },
      {
        type: 'tip',
        text: 'Order by the 15th of the month before Dashain to guarantee delivery within Nepal. We offer free gift wrapping in handmade dhaka cloth for all Dashain orders.',
      },
    ],
  },
  {
    id: 'b11',
    slug: 'blocking-crochet-pieces',
    title: 'Why Blocking Changes Everything: A Guide to Finishing Crochet',
    excerpt:
      'Blocking is the secret step most beginners skip — and why their finished pieces look uneven. We show you wet blocking, spray blocking, and steam blocking with real before/after results.',
    category: 'care',
    author: 'Rohan Gurung',
    authorRole: 'Materials Specialist',
    date: '2026-02-18',
    readTime: 8,
    views: 2240,
    image:
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=85',
    tags: ['blocking', 'finishing', 'technique'],
    content: [
      {
        type: 'paragraph',
        text: 'Blocking is the process of wetting or steaming a finished crochet piece and pinning it into shape while it dries. It transforms lumpy, uneven crochets into crisp, professional-looking textiles. It is the single biggest step between "handmade" and "handcrafted".',
      },
      {
        type: 'heading',
        text: 'Three Methods Explained',
      },
      {
        type: 'list',
        items: [
          'Wet blocking: fully submerge in cool water, press (never wring) excess out, pin to shape on foam tiles',
          'Spray blocking: mist with water from a spray bottle, pin, allow to dry — best for lace and large pieces',
          'Steam blocking: hover a steam iron 2–3cm above the piece without touching — fast, precise, ideal for natural fibres',
        ],
      },
      {
        type: 'tip',
        text: 'Never steam block acrylic yarn — the heat permanently changes the fibre structure. Wet or spray blocking only for acrylic.',
      },
      {
        type: 'heading',
        text: 'When to Block',
      },
      {
        type: 'paragraph',
        text: 'Block every finished piece before gifting, selling, or photographing. Block motifs before joining them into blankets. Block swatches before measuring gauge. If you are ever unsure whether to block, the answer is yes.',
      },
      {
        type: 'blockquote',
        text: 'I had a student who spent forty hours on a shawl. She blocked it before showing me and could not believe it was the same piece. Blocking is not finishing — it is transformation.',
        attribution: '— Rohan Gurung, Materials Specialist',
      },
    ],
  },
  {
    id: 'b12',
    slug: 'newari-motifs-in-crochet',
    title: 'Newari Motifs: Bringing Ancient Kathmandu Art Into Modern Crochet',
    excerpt:
      'The peacock, the lotus, the sun mandala — iconic symbols of Newari art find new life in our crochet motif series. Learn the history and try the pattern yourself.',
    category: 'culture',
    author: 'Sita Rai',
    authorRole: 'Cultural Designer',
    date: '2026-02-10',
    readTime: 11,
    views: 3110,
    image:
      'https://images.unsplash.com/photo-1583396618422-71e9c86eb7e6?auto=format&fit=crop&w=1200&q=85',
    tags: ['newari', 'motifs', 'culture'],
    content: [
      {
        type: 'paragraph',
        text: "The Newar people of the Kathmandu Valley are among the world's great visual artists. Their wood carvings, thangka paintings, and metalwork are celebrated globally. What is less known is that their motif vocabulary — peacock, lotus, sun wheel, serpent — translates with remarkable elegance into crochet.",
      },
      {
        type: 'heading',
        text: 'The Peacock Motif',
      },
      {
        type: 'paragraph',
        text: 'The peacock represents beauty and spiritual protection in Newari tradition. It appears on temple struts, on the windows of Bhaktapur Durbar Square, and on traditional jewellery. Our crochet peacock motif uses extended double crochets fanned outward from a central point to mimic tail feathers, with French knots added for the eye pattern.',
      },
      {
        type: 'heading',
        text: 'The Lotus Mandala',
      },
      {
        type: 'list',
        items: [
          'Eight petals radiating from a tight centre — representing the Buddhist Eightfold Path',
          'Each petal is a joined granny square with colour-work detail',
          'The full mandala measures 30cm when blocked — perfect for a decorative coaster or table centrepiece',
          'Pattern uses worsted weight yarn; advanced beginner skill level',
        ],
      },
      {
        type: 'blockquote',
        text: 'When I started designing Newari motifs in crochet, the elderly artisans in Bhaktapur laughed — they could not imagine their art in yarn. Three years later, two of them have learned to crochet and are making the lotus motif themselves.',
        attribution: '— Sita Rai, Cultural Designer',
      },
      {
        type: 'tip',
        text: 'Visit the Siddhi Ganesh Temple in Bhaktapur for the richest collection of peacock carvings in the valley. Bring a sketchbook — it is the best pattern reference you will ever find.',
      },
    ],
  },
];
