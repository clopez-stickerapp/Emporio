import { makeElement } from '@melt-ui/svelte/internal/helpers';
import { type ClassValue } from 'clsx';
import type { Action } from 'svelte/action';
import type { SVGAttributes } from 'svelte/elements';
import { cn } from '$lib/utils';

export function createIcon({ className }: { className?: ClassValue }) {
  return makeElement<undefined, Action<SVGSVGElement>, () => SVGAttributes<SVGElement>, string>(
    'icon',
    {
      returned: () => ({
        'aria-hidden': 'true',
        class: cn('size-5', className),
      }),
    },
  );
}
