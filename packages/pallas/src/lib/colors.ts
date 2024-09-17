export type Color = 'dark' | 'light' | 'medium';

export const backgroundColors: Record<Color, string> = {
  dark: 'bg-st-dark-grey',
  light: 'bg-white',
  medium: 'bg-st-grey',
};

export const textColors: Record<Color, string> = {
  dark: 'text-st-dark-grey',
  light: 'text-white',
  medium: 'text-st-dusty-grey',
};
