export interface Tab {
    id?: number;
    tabName: string;
    tabText: string;
    svgTabIconName: string;
    subTabsList?: Tab[];
}
