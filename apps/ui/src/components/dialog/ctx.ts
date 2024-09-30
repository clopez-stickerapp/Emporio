import { createDialog, type CreateDialogProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

export type DialogContext = ReturnType<typeof createDialog>;

const NAME = 'dialog';

export function setCtx(props: Partial<CreateDialogProps>) {
  const dialog = createDialog(props);

  setContext<DialogContext>(NAME, dialog);

  return dialog;
}

export function getCtx() {
  return getContext<DialogContext>(NAME);
}

export function setOpen(open: boolean) {
  const { states } = getCtx();

  states.open.set(open);
}
