import type { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements';
import type { SelectOptionProps } from '@melt-ui/svelte';
import type { SelectRootProps } from 'components/select/types';
import type { SwitchProps } from 'components/switch/types';
import type { InputProps } from '../input/types';
import type { LabelProps } from '../label/types';

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

export type FormSelectProps = SelectRootProps & {
  id: string;
  name: string;
  label: string;
  description?: string;
  hint?: string;
};

export type FormSelectOptionProps = SelectOptionProps;

export type FormSwitchProps = SwitchProps & {
  id: string;
  name: string;
  label: string;
  description?: string;
};
