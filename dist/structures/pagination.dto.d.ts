export declare enum SortOrder {
    DESC = "desc",
    ASC = "asc"
}
export declare class LimitOffsetParams {
    limit?: number;
    offset?: number;
}
export declare class PaginationParams extends LimitOffsetParams {
    sortBy?: string;
    sortOrder?: SortOrder;
}
