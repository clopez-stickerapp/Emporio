import type { VariantProps } from 'class-variance-authority';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { btn } from './variants';

export type ButtonProps = HTMLButtonAttributes & VariantProps<typeof btn>;
