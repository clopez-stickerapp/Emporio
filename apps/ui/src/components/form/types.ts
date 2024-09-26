import { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements';
import { InputProps } from '../input/types';
import { LabelProps } from '../label/types';

export type FormRootProps = HTMLFormAttributes;

export type FormItemProps = HTMLAttributes<HTMLElement>;

export type FormInputProps = InputProps & {
  id: string;
  name: string;
  label: string;
  description?: string;
  hint?: string;
};

export type FormLabelProps = LabelProps;
