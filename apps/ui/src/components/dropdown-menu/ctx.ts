import { createDropdownMenu, type CreateDropdownMenuProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = Symbol('dropdown-menu');

export type DropdownMenuContext = ReturnType<typeof createDropdownMenu>;

export function setCtx(props: CreateDropdownMenuProps) {
  const builder = createDropdownMenu({
    positioning: { placement: 'bottom-end' },
    ...props,
  });

  setContext(NAME, { ...builder });

  return builder;
}

export function getCtx() {
  return getContext<DropdownMenuContext>(NAME);
}
