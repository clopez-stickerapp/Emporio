import type { LoadEvent } from '@sveltejs/kit';

export function load({ url }: LoadEvent) {
  return {
    pathname: url.pathname,
  };
}
