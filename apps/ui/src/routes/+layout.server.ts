import { type ShellProps } from '@stickerapp-org/pallas/Shell';

export function load({ url }) {
    const menuItems = [
        {
            name: 'Start',
            url: '/',
        },
    ];
    return {
        menuItems,
        currentUrl: {
            pathname: url.pathname,
        },
    } as ShellProps;
}
