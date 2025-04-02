export interface TableColumn<T> {
    field: keyof T | string;
    header: string;
    width?: string;
    sortable?: boolean;
    cellTemplate?: string;
}
