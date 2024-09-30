import type { InputProps } from 'components/input/types';
import type { HTMLAttributes } from 'svelte/elements';

export type OnChange<Multiple extends boolean = false> = Multiple extends true
  ? (values: string[]) => void
  : (value: string) => void;

export type TilePickerRootProps<Multiple extends boolean = false> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onchange'
> & {
  name: string;
  multiple?: Multiple;
  onchange?: OnChange<Multiple>;
};

export type TilePickerItemProps = Omit<InputProps, 'type' | 'name'> & {
  label: string;
  img: string;
};
