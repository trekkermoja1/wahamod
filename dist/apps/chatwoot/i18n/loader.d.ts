export declare class YamlLocaleLoader {
    private readonly dir;
    private readonly ext;
    constructor(dir: string, ext: string);
    load(): Record<string, Record<string, string>>;
}
