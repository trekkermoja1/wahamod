type RewriteRule = {
    name: string;
    re: RegExp;
    replace: string;
};
export declare class PhoneJidNormalizer {
    private rules;
    constructor(rules?: RewriteRule[]);
    private parseFromJid;
    private rewrite;
    fromJid(jid: string): string | null;
}
export declare const E164Parser: PhoneJidNormalizer;
export {};
