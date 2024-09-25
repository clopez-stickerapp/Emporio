// These are the only colors that we should ever use in the app.
// Even though tailwind comes with colors included we shouldn't use them, we
// should only ever use colors from this palette. If any color is missing, talk to
// the design team to get it added.

export const colors = {
  'st-black': '#151515',
  'st-white': '#FFFFFF',
  'st-gray': {
    DEFAULT: '#979797',
    100: '#FAFAFA',
    200: '#EEEEEE',
    300: '#DDDDDD',
    400: '#CCCCCC',
    500: '#979797',
    600: '#757575',
    700: '#505050',
    800: '#2D2D2D',
    900: '#040404',
  },

  'st-yellow': {
    DEFAULT: '#ffdb00',
    100: '#FFF8CC',
    200: '#FFF199',
    300: '#FFE966',
    400: '#FFE233',
    500: '#FFDB00',
    600: '#CFB303',
    700: '#A18A08',
    800: '#72640C',
    900: '#423B0F',
  },

  'st-green': {
    DEFAULT: '#6CB676',
    100: '#DEEEE0',
    200: '#BEDCC2',
    300: '#9DCBA3',
    400: '#7DB985',
    500: '#5CA866',
    600: '#4E8A56',
    700: '#3F6D45',
    800: '#314F35',
    900: '#223224',
  },

  'st-blue': {
    DEFAULT: '#1477d6',
    100: '#D0E5F8',
    200: '#A1CBF2',
    300: '#73B0EB',
    400: '#4496E5',
    500: '#157CDE',
    600: '#1567B6',
    700: '#15528D',
    800: '#143E65',
    900: '#14293C',
  },

  'st-red': {
    DEFAULT: '#DA5246',
    100: '#F7DAD8',
    200: '#EFB5B0',
    300: '#E89089',
    400: '#E06B61',
    500: '#D8463A',
    600: '#B13C32',
    700: '#8A322B',
    800: '#622823',
    900: '#3B1E1C',
  },

  'st-pink': {
    DEFAULT: '#F024A1',
    100: '#FBD3EB',
    200: '#F9A7D8',
    300: '#F67CC6',
    400: '#F250B3',
    500: '#F024A1',
    600: '#C32185',
    700: '#971D69',
    800: '#6B1A4B',
    900: '#3F162F',
  },

  'st-creme': '#FAF6F2',
};
