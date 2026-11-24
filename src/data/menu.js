/* ==========================================================================
   Tasty's Take Aways - THE MENU
   Change prices, names and items here only. The website builds the menu
   from this file automatically.

   Each item can have:
     name     - shown on the menu (required)
     price    - number in Rand, e.g. 28.5 shows as R28.50. Use null for "Ask us"
     from     - true shows "from R25" (price is a starting price)
     desc     - short description (optional)
     extras   - extra options, e.g. [{ label: 'With chips', price: 70 }]
                a price with plus: true shows "+R8"
     photo    - file name in src/assets/menu/ without .webp (optional).
                Items WITH a photo show as a picture card, the rest as a list.
   ========================================================================== */

export const categories = [
  {
    id: 'burgers',
    title: 'Burgers & boxes',
    items: [
      {
        name: 'Fillet Box',
        price: 130,
        desc: '2 fillets, chips, salad and a bun, packed in a box.',
        extras: [{ label: 'Extra fillet', price: 25, plus: true }],
        photo: 'fillet-box',
      },
      {
        name: 'Crumbed Chicken Burger',
        price: 45,
        desc: 'With chips on the side.',
        photo: 'crumbed-chicken-burger',
      },
      {
        name: 'Beef Cheese Burger',
        price: 60,
        extras: [
          { label: 'With chips', price: 70 },
          { label: 'Mushroom sauce', price: 8, plus: true },
        ],
      },
      {
        name: 'Grilled Chicken Cheese Burger',
        price: 60,
        extras: [{ label: 'With chips', price: 70 }],
      },
    ],
  },

  {
    id: 'rolls',
    title: 'Rolls',
    items: [
      { name: 'Steak Roll', price: 65, photo: 'steak-roll' },
      { name: 'Steak Roll Special', price: 70, desc: 'With chips & cheese.', photo: 'steak-roll-special' },
      { name: 'Chicken Roll', price: 60, photo: 'chicken-roll' },
      { name: 'Chicken Roll Special', price: 70, desc: 'With chips & cheese.', photo: 'chicken-roll-special' },
      { name: 'Chip Roll + Polony', price: 30, photo: 'polony-roll' },
      { name: 'Chip Roll', price: 25 },
      { name: 'Chip Roll + Cheese + Russian', price: 45 },
      { name: 'Chip Roll + Wors', price: 55 },
      { name: 'Wors Roll', price: 35 },
      { name: 'Vienna Roll', price: 35 },
    ],
  },

  {
    id: 'kotas',
    title: 'Kotas',
    items: [
      {
        name: 'Kota 3',
        price: 60,
        desc: 'Atchaar, chips, polony, cheese, Russian, egg & pattie.',
        photo: 'kota',
      },
      { name: 'Kota 1', price: 20, desc: 'Atchaar, chips & polony.' },
      { name: 'Kota 2', price: 40, desc: 'Atchaar, chips, polony, cheese & Russian.' },
    ],
  },

  {
    id: 'chips',
    title: 'Chips',
    note: 'Seasoned, with your choice of sauce: tomato, mustard, BBQ, mayo, peri mayo or chilli. Jalapeños optional.',
    items: [
      {
        name: 'Make Your Own Chip Parcel',
        price: 25,
        from: true,
        desc: 'Regular R25 or large R40. Add Vienna, sausage, wors or Russian (R15 each) or salami (4 slices, R8).',
        photo: 'chip-parcel',
      },
      { name: 'Chips + 1 Russian', price: 35, desc: 'Try it with jalapeños.', photo: 'russian-and-chips' },
      { name: 'Regular Chips', price: 25 },
      { name: 'Large Chips', price: 40 },
      { name: 'Chips + 1 Vienna', price: 35 },
      { name: 'Chips + Sausage', price: 40 },
      { name: 'Chips + Wors', price: 45 },
    ],
  },

  {
    id: 'sandwiches',
    title: 'Toasted sandwiches',
    note: 'Jalapeños, green chillies and onions optional.',
    items: [
      {
        name: 'Hunger Buster',
        price: 38,
        desc: '2 polony, Russian and chips between 3 slices of bread.',
        extras: [{ label: 'Add a Buddy Coke', price: 10, plus: true }],
        photo: 'hunger-buster',
      },
      { name: 'Cheese & Tomato', price: 28.5, extras: [{ label: 'With chips', price: 33.5 }] },
      { name: 'Cheese & Salami', price: 40 },
      { name: 'Cheese & Polony', price: 40, extras: [{ label: 'With chips', price: 45 }] },
      {
        name: 'Cheese, Premium Polony & Scrambled Egg',
        price: 50,
        extras: [{ label: 'With chips', price: 55 }],
      },
      { name: 'Polony & Scrambled Egg', price: 20 },
      { name: 'Steak & Cheese', price: 80, extras: [{ label: 'With chips', price: 85 }] },
      { name: 'Steak Special', price: 100 },
      { name: 'Chicken Mayo & Gherkins', price: 60, extras: [{ label: 'With chips', price: 65 }] },
      { name: 'Dagwood', price: 95 },
    ],
  },

  {
    id: 'wraps',
    title: 'Wraps',
    items: [
      { name: 'Mutton Curry Roti Wrap', price: 60, desc: 'With salad inside.', photo: 'mutton-roti-wrap' },
      { name: 'Grilled Chicken Wrap', price: 60, desc: 'Salad, chips & cheese inside the wrap.' },
    ],
  },

  {
    id: 'pizza',
    title: 'Pizza',
    items: [
      { name: 'Premium Polony', price: 70, photo: 'pizza-polony' },
      { name: 'Chicken', price: 70, photo: 'pizza-chicken' },
      { name: 'Steak', price: 70, photo: 'pizza-steak' },
      { name: 'Margarita', price: 60, photo: 'pizza-margarita' },
    ],
  },

  {
    id: 'specials',
    title: 'Daily specials',
    special: true,
    note: 'Curries, bunny chows and samoosas change daily and depend on availability. Call or WhatsApp to hear what’s cooking today.',
    items: [
      { name: 'Butter Chicken', price: 80, desc: 'Served with 1 roti.', photo: 'butter-chicken' },
      {
        name: 'Chicken Biryani',
        price: 80,
        desc: 'Big portion. Carrot salad & yoghurt sauce included.',
        extras: [{ label: 'Small portion', price: 45 }],
        photo: 'chicken-biryani',
      },
      { name: 'Durban Mutton Curry Bunny Chow', price: 95, desc: 'Authentic Durban style.', photo: 'mutton-bunny-chow' },
      { name: 'Beef Curry Bunny Chow', price: 70, photo: 'beef-bunny-chow' },
      {
        name: 'Samoosas',
        price: null,
        desc: 'Beef, chicken or cheese & corn. Flavours and prices vary by day.',
        photo: 'samoosas',
      },
      { name: 'Beef Curry & Rice', price: 80 },
      { name: 'Chicken Curry Bunny Chow', price: null },
      { name: 'Curry of the day', price: null },
    ],
  },
];
