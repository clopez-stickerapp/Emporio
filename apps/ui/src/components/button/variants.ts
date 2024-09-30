import { cva } from 'class-variance-authority';

export const btn = cva(
  'rounded-md text-sm font-semibold shadow-sm ring-1 ring-inset hover:bg-st-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-between gap-2',
  {
    variants: {
      size: {
        small: 'px-2.5 py-1.5',
        medium: 'px-3 py-2',
        large: 'px-3.5 py-2.5',
        icon: 'p-2',
      },
      variant: {
        default: 'bg-white text-st-gray-900 ring-st-gray-300 shadow-sm ring-1',
        primary:
          'bg-st-yellow text-st-gray-900 ring-st-yellow hover:bg-st-yellow-600 hover:ring-st-yellow-600 shadow-sm ring-1 ring-inset',
        secondary:
          'bg-st-gray-600 text-white ring-st-gray-600 hover:bg-st-gray-700 shadow-sm ring-1 ring-inset',
        ghost: 'bg-transparent text-white rounded-full text-st-gray-900',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
      disabled: false,
    },
  },
);
