import type { Order } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2089',
    date: '2026-04-22',
    status: 'shipped',
    total: 2850,
    trackingCode: 'NP-TRK-88821',
    items: [
      {
        id: 'i1',
        name: 'Crochet Rose Bouquet',
        qty: 1,
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=75',
      },
      {
        id: 'i2',
        name: 'Yarn Key Ring',
        qty: 2,
        price: 525,
        imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2085',
    date: '2026-04-18',
    status: 'processing',
    total: 1200,
    items: [
      {
        id: 'i6',
        name: 'Daisy Hair Clip Set',
        qty: 3,
        price: 400,
        imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2079',
    date: '2026-04-14',
    status: 'confirmed',
    total: 3600,
    items: [
      {
        id: 'i7',
        name: 'Himalayan Wool Throw',
        qty: 1,
        price: 3600,
        imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2071',
    date: '2026-04-10',
    status: 'delivered',
    total: 4500,
    items: [
      {
        id: 'i3',
        name: 'Woolen Sweater — Terracotta',
        qty: 1,
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2068',
    date: '2026-04-07',
    status: 'confirmed',
    total: 2200,
    items: [
      {
        id: 'i8',
        name: 'Crochet Sun Hat',
        qty: 1,
        price: 1400,
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=75',
      },
      {
        id: 'i9',
        name: 'Cotton Tote Bag',
        qty: 1,
        price: 800,
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2055',
    date: '2026-03-28',
    status: 'delivered',
    total: 1650,
    items: [
      {
        id: 'i4',
        name: 'Daisy Hair Clip Set',
        qty: 3,
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=75',
      },
      {
        id: 'i5',
        name: 'Crochet Bookmark',
        qty: 1,
        price: 300,
        imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2049',
    date: '2026-03-20',
    status: 'delivered',
    total: 5200,
    items: [
      {
        id: 'i10',
        name: 'Handknit Cardigan — Navy',
        qty: 1,
        price: 5200,
        imageUrl: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2041',
    date: '2026-03-12',
    status: 'shipped',
    total: 780,
    trackingCode: 'NP-TRK-75443',
    items: [
      {
        id: 'i11',
        name: 'Lavender Sachet Pouch',
        qty: 2,
        price: 390,
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2033',
    date: '2026-03-05',
    status: 'cancelled',
    total: 2100,
    items: [
      {
        id: 'i12',
        name: 'Mountain Motif Cushion Cover',
        qty: 2,
        price: 1050,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2025',
    date: '2026-02-25',
    status: 'delivered',
    total: 3300,
    items: [
      {
        id: 'i13',
        name: 'Crochet Wall Hanging',
        qty: 1,
        price: 2200,
        imageUrl: 'https://images.unsplash.com/photo-1558171813-9c6d2e4a61c5?w=200&q=75',
      },
      {
        id: 'i14',
        name: 'Mini Yarn Basket',
        qty: 2,
        price: 550,
        imageUrl: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2018',
    date: '2026-02-18',
    status: 'delivered',
    total: 1800,
    items: [
      {
        id: 'i15',
        name: 'Cherry Blossom Garland',
        qty: 1,
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc02?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2011',
    date: '2026-02-10',
    status: 'delivered',
    total: 6800,
    items: [
      {
        id: 'i16',
        name: 'Merino Wool Blanket',
        qty: 1,
        price: 6800,
        imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2004',
    date: '2026-02-03',
    status: 'delivered',
    total: 1200,
    items: [
      {
        id: 'i17',
        name: 'Lotus Flower Brooch',
        qty: 2,
        price: 600,
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-1997',
    date: '2026-01-28',
    status: 'delivered',
    total: 4200,
    items: [
      {
        id: 'i18',
        name: 'Himalayan Hemp Tote',
        qty: 1,
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=75',
      },
      {
        id: 'i19',
        name: 'Crochet Beanie — Mustard',
        qty: 2,
        price: 1350,
        imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-1989',
    date: '2026-01-15',
    status: 'processing',
    total: 950,
    items: [
      {
        id: 'i20',
        name: 'Yak Wool Scarf',
        qty: 1,
        price: 950,
        imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&q=75',
      },
    ],
  },
];
