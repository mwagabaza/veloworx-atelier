export const SHOP = {
  name: 'Veloworx',
  established: 1998,
  phone: '310-584-9797',
  phoneHref: 'tel:+13105849797',
  address: '3106 Lincoln Blvd',
  city: 'Santa Monica, CA 90405',
  mapHref: 'https://maps.app.goo.gl/V4qtpjfuT2wP1sRX7',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  hours: [
    { days: 'Tuesday — Sunday', time: '11:00 — 17:00' },
    { days: 'Monday', time: 'Closed' },
  ],
}

export const NAV = [
  { label: 'Range', href: '#range' },
  { label: 'Service', href: '#service' },
  { label: 'Heritage', href: '#sukeun' },
  { label: 'The Shop', href: '#shop' },
  { label: 'Visit', href: '#visit' },
]

export type Category = {
  index: string
  name: string
  line: string
  note: string
  image: string
  alt: string
}

export const CATEGORIES: Category[] = [
  {
    index: '01',
    name: 'Road',
    line: 'Race geometry, tuned for the canyons',
    note: 'Full carbon builds and steel classics. Electronic or mechanical, fit first.',
    image: '/images/road-bike.jpg',
    alt: 'Road cyclist riding along a coastal waterfront promenade at speed',
  },
  {
    index: '02',
    name: 'Gravel',
    line: 'One bike for pavement and dirt',
    note: 'Wide-clearance frames, tubeless from the floor, bags fitted in-house.',
    image: '/images/gravel-bike.jpg',
    alt: 'Rider on a gravel bike descending a dry dirt road',
  },
  {
    index: '03',
    name: 'Mountain',
    line: 'Trail, enduro, and everything sharper',
    note: 'Suspension set to your weight and your local dirt before you leave.',
    image: '/images/mountain-bike.jpg',
    alt: 'Mountain biker riding a singletrack trail through a forest',
  },
  {
    index: '04',
    name: 'E-Bikes',
    line: 'Range for the whole Westside',
    note: 'Commuters and cargo builds, serviced by a certified drive-system tech.',
    image: '/images/ebike-commuter.jpg',
    alt: 'Cyclist riding an upright bike along a river path',
  },
  {
    index: '05',
    name: 'Cruisers',
    line: 'Abbot Kinney to the pier and back',
    note: 'Single-speed and three-speed beach bikes. Characterful, honest, affordable.',
    image: '/images/beach-cruiser.jpg',
    alt: 'Person riding a cruiser bicycle on the beach at sunset',
  },
]

export const SERVICES = [
  {
    index: 'S1',
    name: 'Tune-Up',
    price: 'from $95',
    turn: '48 hrs',
    detail: 'Shift and brake adjustment, true wheels, torque check, full drivetrain clean.',
  },
  {
    index: 'S2',
    name: 'Overhaul',
    price: 'from $320',
    turn: '5 days',
    detail: 'Frame stripped to bare, every bearing repacked, cables and housing replaced.',
  },
  {
    index: 'S3',
    name: 'Bike Fit',
    price: '$225',
    turn: '2 hrs',
    detail: 'Two hours on the jig with Sukeun. Measurements kept on file for life.',
  },
  {
    index: 'S4',
    name: 'Wheel Build',
    price: 'from $180',
    turn: '7 days',
    detail: 'Hand-laced, tensioned, and stress-relieved. Tension chart goes home with you.',
  },
  {
    index: 'S5',
    name: 'Suspension',
    price: 'from $140',
    turn: '4 days',
    detail: 'Lowers service, damper rebuild, spring rate matched to rider weight.',
  },
  {
    index: 'S6',
    name: 'Flat Repair',
    price: '$25',
    turn: 'Walk-in',
    detail: 'Tube or tubeless, while you wait. No appointment, no upsell.',
  },
]

export const BRANDS = [
  'CERVÉLO',
  'PINARELLO',
  'SANTA CRUZ',
  'SHIMANO',
  'CAMPAGNOLO',
  'CHRIS KING',
  'ENVE',
  'BROOKS',
  'SRAM',
  'ELECTRA',
  'YETI',
  'THOMSON',
]

export const TESTIMONIALS = [
  {
    quote:
      'Sukeun spent forty minutes measuring me and eleven seconds selling me. I left with the frame I already owned, set up properly, and it rides like a different bike.',
    name: 'Marisol Ferrante',
    meta: 'Ocean Park · riding since 2011',
  },
  {
    quote:
      'I brought in a rusted cruiser I found in a garage. They treated it exactly like the carbon bike on the next stand. That tells you everything.',
    name: 'Dev Raghunathan',
    meta: 'Venice · weekend rider',
  },
  {
    quote:
      'Best mechanic on the Westside, and it is not close. He diagnosed a creak three other shops blamed on my bottom bracket. It was a seatpost clamp.',
    name: 'Elena Whitfield',
    meta: 'Mar Vista · Cat 3 racer',
  },
  {
    quote:
      'My daughter got her first real bike here. Sukeun knelt down and explained the brakes to her, not to me. She still rides it every day.',
    name: 'Tomás Iglesias',
    meta: 'Santa Monica · family of four',
  },
]

export const RIDES = [
  {
    day: 'Saturday',
    time: '07:00',
    name: 'Pier to Point Dume',
    detail: '46 mi · steady 18–19 mph · regroup at Trancas',
  },
  {
    day: 'Sunday',
    time: '08:30',
    name: 'Ballona Dirt Loop',
    detail: '22 mi gravel · no-drop · 40c minimum',
  },
  {
    day: 'Wednesday',
    time: '18:15',
    name: 'Shop Social',
    detail: '14 mi · lights required · coffee after, on us',
  },
]

export const SPOTLIGHT = {
  eyebrow: 'Bike of the Month · August',
  name: 'Cervélo Áspero-5',
  build: 'Force AXS · Reserve 40|44 · 45c Pathfinder',
  price: '$8,400',
  weight: '8.1 kg',
  size: '51 / 54 / 56 in stock',
  copy:
    'Built on the floor this month for a customer riding the Lost Coast. We liked it enough to keep the second frame. Fast on tarmac, unbothered by fire road, and quiet in a way gravel bikes rarely are.',
  image: '/images/aspero-spotlight.jpg',
  alt: 'Macro detail of a gold bicycle sprocket and drivetrain',
}
