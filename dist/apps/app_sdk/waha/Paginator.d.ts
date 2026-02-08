type Call<Record> = (processed: number) => Promise<Record[]>;
export interface PaginatorParams {
    processed?: number;
    max?: number;
}
export declare class ArrayPaginator<Record> {
    private readonly params;
    constructor(params?: PaginatorParams);
    iterate(call: Call<Record>): AsyncGenerator<Record>;
}
export {};
