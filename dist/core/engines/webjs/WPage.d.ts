import { EventEmitter } from 'events';
import { Page } from 'puppeteer';
export interface CallErrorEvent {
    method: string | symbol;
    error: unknown;
}
export declare const PAGE_CALL_ERROR_EVENT = "page.call.error";
export declare class WPage extends EventEmitter {
    private page;
    constructor(page: Page);
    evaluate(fn: any, ...args: any[]): Promise<any>;
    screenshot(options: any): Promise<string>;
    waitForNavigation(options: any): Promise<import("puppeteer-core").HTTPResponse>;
    waitForFunction(fn: any, options: any, ...args: any[]): Promise<import("puppeteer-core").ElementHandle<any> | import("puppeteer-core").JSHandle<any>>;
    setRequestInterception(value: boolean): Promise<void>;
    exposeFunction(name: string, fn: (...args: any[]) => any): Promise<void>;
    reload(options?: any): Promise<any>;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    get tracing(): import("puppeteer-core").Tracing;
}
