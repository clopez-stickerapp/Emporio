import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

export type NavigationMenuRootProps = HTMLAttributes<HTMLElement> & {
  children: Snippet;
  orientation?: HTMLAttributes<HTMLElement>['aria-orientation'];
};

export type NavigationMenuListProps = HTMLAttributes<HTMLElement> & { children: Snippet };

export type NavigationMenuItemProps = HTMLAttributes<HTMLElement> & { children: Snippet };

export type NavigationMenuLinkProps = HTMLAnchorAttributes & { isActive?: boolean };
