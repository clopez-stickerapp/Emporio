export type IconTileProps = {
    text?: string;
    selected?: boolean;
    enabled?: boolean;
    imgSrc?: string;
};

export type IconTilesProps = {
    title?: string;
    iconTileProps: IconTileProps[];
};
