import type { HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { LabelProps } from '../label/types';

export type SelectRootProps = Omit<HTMLSelectAttributes, 'onchange'> & {
  name: string;
  open?: boolean;
  label: string | Snippet;
  placeholder: string;
  onchange?: (value: string) => void;
};

export type SelectLabelProps = LabelProps;

export type SelectOptionProps = HTMLOptionAttributes & { label: string };
