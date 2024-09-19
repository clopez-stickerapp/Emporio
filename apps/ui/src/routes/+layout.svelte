<script lang="ts">
    import '../app.css';
    import { Shell, type ShellProps } from '@stickerapp-org/pallas/Shell';

    const { data }: { data: ShellProps } = $props();
</script>

<!-- <Shell menuItems={data.menuItems} appName="Emporio" currentUrl={data.currentUrl}><slot /></Shell> -->
<Shell menuItems={data.menuItems} appName="Emporio" currentUrl={data.currentUrl}><slot /></Shell>
