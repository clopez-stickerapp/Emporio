import type { HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { LabelProps } from '../label/types';

export type SelectRootProps = HTMLSelectAttributes & {
  name: string;
  open?: boolean;
  label: string | Snippet;
  placeholder: string;
};

export type SelectLabelProps = LabelProps;

export type SelectOptionProps = HTMLOptionAttributes & { label: string };
