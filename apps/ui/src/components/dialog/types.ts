import type { CreateDialogProps } from '@melt-ui/svelte';
import type { ButtonProps } from 'components/button/types';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type DialogRootProps = CreateDialogProps & { children: Snippet };

export type DialogPortalProps = { children: Snippet };

export type DialogOverlayProps = Omit<HTMLAttributes<HTMLElement>, 'children'>;

export type DialogContentProps = HTMLAttributes<HTMLElement>;

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export type DialogTriggerProps = ButtonProps;

export type DialogCloseProps = ButtonProps;
export type DialogXProps = Omit<ButtonProps, 'children'>;
