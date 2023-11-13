export type RowData = { [key: string]: unknown, [key: symbol]: number };
export type AvailableDataValueTypes = number | boolean | string;
export type ProcessedRowData = { [key: string | symbol]: AvailableDataValueTypes };
export type SortOrder = 'asc' | 'desc' | null;
