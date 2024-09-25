import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type NavigationMenuRootProps = HTMLAttributes<HTMLElement> & {
  children: Snippet;
  orientation?: HTMLAttributes<HTMLElement>['aria-orientation'];
};

export type PageRootProps = HTMLAttributes<HTMLElement> & { children: Snippet };

export type PageTitleProps = HTMLAttributes<HTMLHeadingElement>;
