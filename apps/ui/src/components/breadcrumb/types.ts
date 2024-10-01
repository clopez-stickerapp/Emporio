import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

export type BreadcrumbRootProps = HTMLAttributes<HTMLElement>;
export type BreadcrumbItemProps = HTMLAttributes<HTMLElement> & { skipIndicator?: true };
export type BreadcrumbLinkProps = HTMLAnchorAttributes & { current?: boolean };
