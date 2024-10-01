<script lang="ts">
  import { setCtx } from '../ctx';
  import type { DropdownMenuRootProps } from '../types';

  const {
    children,
    positioning,
    arrowSize,
    dir,
    preventScroll,
    escapeBehavior,
    closeOnItemClick,
    portal,
    closeOnOutsideClick,
    onOutsideClick,
    preventTextSelectionOverflow,
    loop,
    defaultOpen,
    open,
    onOpenChange,
    forceVisible,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    ids,
  }: DropdownMenuRootProps = $props();

  setCtx({
    positioning,
    arrowSize,
    dir,
    preventScroll,
    escapeBehavior,
    closeOnItemClick,
    portal,
    closeOnOutsideClick,
    onOutsideClick,
    preventTextSelectionOverflow,
    loop,
    defaultOpen,
    open,
    onOpenChange,
    forceVisible,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    ids,
  });
</script>

{@render children?.()}
