import { getFamilies } from '$lib/api';

export async function load() {
  const families = await getFamilies();
  return { families: Object.keys(families) };
}
