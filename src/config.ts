const name = {
  ja: 'INDOOR GREEN',
  en: 'INDOOR GREEN',
};

export const config = {
  locales: ['ja', 'en'],
  name,
  tagline: {
    ja: `${name.ja} - インドアグリーン、観葉植物の育て方や知識を深めるメディア`,
    en: `${name.en} - The Media of indoor green and plants to know how to grow and knowledge`,
  },
  description: {
    ja: `インドアグリーン、観葉植物の育て方や知識を深めるメディア`,
    en: `The Media of indoor green and plants to know how to grow and knowledge`,
  },
  path: {
    api: '/api',
    admin: '/admin',
  },
};

export const resourceTypes = [
  {
    name: 'notes',
    type: 'note',
  },
  {
    name: 'labels',
    type: 'label',
  },
  {
    name: 'plants',
    type: 'plant',
    attributes: [
      {
        key: 'shade_tolerance',
        inputType: 'select',
        options: [
          {
            name: 'Very Weak',
            value: 0,
          },
          {
            name: 'Weak',
            value: 1,
          },
          {
            name: 'Standard',
            value: 2,
          },
          {
            name: 'Strong',
            value: 3,
          },
          {
            name: 'Very Strong',
            value: 4,
          },
        ],
      },
      {
        key: 'cold_tolerance',
        inputType: 'select',
        options: [
          {
            name: 'Very Weak',
            value: 0,
          },
          {
            name: 'Weak',
            value: 1,
          },
          {
            name: 'Standard',
            value: 2,
          },
          {
            name: 'Strong',
            value: 3,
          },
          {
            name: 'Very Strong',
            value: 4,
          },
        ],
      },
    ],
  },
  {
    name: 'products',
    type: 'product',
    attributes: [
      {
        key: 'suggested_retail_price',
        inputType: 'number',
      },
      {
        key: 'release_date',
        inputType: 'date',
      },
    ],
  },
];
