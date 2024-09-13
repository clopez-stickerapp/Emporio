import type { Snippet } from 'svelte';

export type MenuItem = {
  name: string;
  url: string;
};

export type ShellProps = {
  children: Snippet;
  appName: string;
  menuItems: MenuItem[];
  currentUrl: { pathname: string };
};

export type PageProps = {
  name: string;
  children: Snippet;
};
