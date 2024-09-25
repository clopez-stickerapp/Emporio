import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type PageRootProps = HTMLAttributes<HTMLElement> & { children: Snippet };

export type PageTitleProps = HTMLAttributes<HTMLHeadingElement>;
