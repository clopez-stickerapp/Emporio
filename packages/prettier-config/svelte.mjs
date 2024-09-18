import base from "./node.mjs";

/**
 * @type {import('prettier').Config}
 */
export default {
  ...base,
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  htmlWhitespaceSensitivity: "ignore"
};
