import type { InputProps } from 'components/input/types';
import type { HTMLAttributes } from 'svelte/elements';

export type TilePickerRootProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  multiple?: boolean;
};

export type TilePickerItemProps = Omit<InputProps, 'type' | 'name'> & {
  label: string;
  img: string;
};
