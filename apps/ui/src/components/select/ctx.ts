import { createSelect, type CreateSelectProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import { getOptionUpdater } from '../../lib/utils';

const NAME = 'select';

type Item = {
  value: string;
  label?: string;
};

export function setCtx(props: CreateSelectProps<Item>) {
  const select = createSelect<Item>(props);

  setContext(NAME, select);

  return {
    ...select,
    updateOption: getOptionUpdater(select.options),
  };
}

type GetReturn = Omit<ReturnType<typeof setCtx>, 'updateOption'>;

export function getCtx() {
  return getContext<GetReturn>(NAME);
}
