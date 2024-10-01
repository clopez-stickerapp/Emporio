import type { CreateDropdownMenuProps } from '@melt-ui/svelte';
import type { ButtonProps } from 'components/button/types';
import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

export type DropdownMenuRootProps = HTMLAttributes<HTMLElement> & CreateDropdownMenuProps;
export type DropdownMenuContentProps = HTMLAttributes<HTMLElement>;
export type DropdownMenuTriggerProps = ButtonProps;
export type DropdownMenuItemLinkProps = HTMLAnchorAttributes;
