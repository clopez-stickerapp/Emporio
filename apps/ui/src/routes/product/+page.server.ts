export function load() {
    const sizeFilters = [
        { text: 'Default', selected: true, value: 'default' },
        { text: 'Epoxy', value: 'epoxy' },
        { text: 'Wall', value: 'wall' },
        { text: 'Kiss-Cut Sheet', value: 'kiss-cut-sheet' },
        { text: 'Sheet', value: 'sheet' },
    ];

    const quantityLists = [
        { text: 'Default', selected: true, value: 'default' },
        { text: 'Epoxy', value: 'epoxy' },
    ];

    const shapeProps = [
        {
            text: 'Contour',
            imgSrc: '/favicon.png',
            selected: true,
            enabled: true,
        },
        {
            text: 'Square',
            imgSrc: '/favicon.png',
            selected: true,
            enabled: true,
        },
        {
            text: 'Round',
            imgSrc: '/favicon.png',
            selected: false,
            enabled: true,
        },
        {
            text: 'Rounded',
            imgSrc: '/favicon.png',
            selected: false,
            enabled: false,
        },
    ];

    const materialProps = [
        { text: 'Vinyl', imgSrc: '/favicon.png', selected: true },
        { text: 'Holographic', imgSrc: '/favicon.png' },
        { text: 'Glitter', imgSrc: '/favicon.png' },
        { text: 'Kraft paper', imgSrc: '/favicon.png', selected: true },
        { text: 'Prismatic', imgSrc: '/favicon.png' },
        { text: 'Glow in the Dark', imgSrc: '/favicon.png', selected: true },
        { text: 'Clear', imgSrc: '/favicon.png', enabled: false },
        { text: 'Pixie Dust', imgSrc: '/favicon.png', enabled: false },
    ];

    const laminateProps = [
        { selected: true, text: 'Glossy' },
        { enabled: false, text: 'Matte' },
        { enabled: false, text: 'Cracked Ice' },
    ];

    const sizeProps = [
        { text: '1x1', selected: true },
        { text: '2x2', selected: true },
        { text: '3x3', selected: true },
        { text: '4x4', selected: true },
        { text: '5x5', selected: true },
        { text: '6x6', selected: true },
        { text: '7x7', selected: true },
        { text: '8x8', selected: true },
    ];

    const quantityProps = [
        { text: '100', selected: true },
        { text: '200', selected: true },
        { text: '300', selected: true },
        { text: '500', selected: true },
        { text: '750', selected: true },
        { text: '1000', selected: true },
        { text: '1500', selected: true },
        { text: '2000', selected: true },
    ];

    return {
        sizeFilters,
        quantityLists,
        shapeProps,
        materialProps,
        laminateProps,
        sizeProps,
        quantityProps,
    };
}
