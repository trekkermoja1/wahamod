type Baileys = typeof import('@adiwajshing/baileys');
declare const esm: {
    b: Baileys;
};
declare function loadESMModules(): Promise<void>;
export { loadESMModules };
export default esm;
