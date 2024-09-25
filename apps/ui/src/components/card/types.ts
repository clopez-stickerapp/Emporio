import type { HTMLAttributes } from 'svelte/elements';

export type CardRootProps = HTMLAttributes<HTMLElement>;

export type CardHeaderProps = HTMLAttributes<HTMLElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export type CardContentProps = HTMLAttributes<HTMLElement>;
export type CardFooterProps = HTMLAttributes<HTMLElement>;
