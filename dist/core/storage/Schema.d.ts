export declare class Field {
    fieldName: string;
    type: string;
    constructor(fieldName: string, type: string);
}
export declare class Index {
    name: string;
    columns: string[];
    constructor(name: string, columns: string[]);
}
export declare class Schema {
    name: string;
    columns: Field[];
    indexes: Index[];
    constructor(name: string, columns: Field[], indexes: Index[]);
}
