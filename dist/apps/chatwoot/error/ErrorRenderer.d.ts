interface IErrorRender<T> {
    text(error: T): string;
    data(error: T): Record<string, any>;
}
export declare class ErrorRenderer implements IErrorRender<any> {
    private readonly axiosRenderer;
    private readonly chatwootRenderer;
    private readonly genericRenderer;
    text(error: any): string;
    data(error: any): Record<string, any>;
}
export {};
