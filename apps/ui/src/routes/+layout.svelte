<script lang="ts">
    import type { Snippet } from 'svelte';
    import '../app.css';
    import { Shell, type ShellProps } from '@stickerapp-org/pallas/Shell';

    const { data, children }: { data: ShellProps; children: Snippet } = $props();
</script>

<Shell menuItems={data.menuItems} appName="Emporio" currentUrl={data.currentUrl}>
    {@render children()}
</Shell>
