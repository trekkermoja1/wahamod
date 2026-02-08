import { IJsonQuery } from '@waha/core/storage/sql/IJsonQuery';
import { PaginationParams } from '@waha/structures/pagination.dto';
export declare abstract class Paginator {
    protected readonly pagination: PaginationParams;
    constructor(pagination: PaginationParams);
    apply<T>(data: T): T;
    protected abstract sort(data: any): any;
    protected abstract limit(data: any): any;
}
export declare class PaginatorInMemory extends Paginator {
    protected sort(data: any[]): any[];
    protected limit(data: any[]): any[];
    NullLast(field: any): (item: any) => any;
}
export declare class KnexPaginator extends Paginator {
    protected jsonQuery: IJsonQuery;
    indexes: string[];
    dataField: string;
    constructor(pagination: PaginationParams, jsonQuery: IJsonQuery);
    protected sort(query: any): any;
    protected limit(query: any): any;
}
export declare class MongoPaginator extends Paginator {
    protected sort(query: any): any;
    protected limit(query: any): any;
}
