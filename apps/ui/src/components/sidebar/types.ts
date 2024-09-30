import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLImgAttributes } from 'svelte/elements';

export type SidebarRootProps = HTMLAttributes<HTMLElement> & { children: Snippet };
export type SidebarContentProps = HTMLAttributes<HTMLElement> & { children: Snippet };
export type SidebarHeaderProps = HTMLAttributes<HTMLElement> & { children: Snippet };
export type SidebarLogoProps = HTMLImgAttributes;
