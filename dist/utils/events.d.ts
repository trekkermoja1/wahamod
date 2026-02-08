export declare class EventWildUnmask {
    private readonly events;
    private readonly all;
    constructor(events: string[] | any, all?: string[] | any | null);
    unmask(events: string[]): any[];
}
