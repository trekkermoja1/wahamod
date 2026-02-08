export declare class LabelBody {
    name: string;
    colorHex?: string;
    color?: number;
    toDTO(): LabelDTO;
}
export declare class LabelDTO {
    name: string;
    color: number;
}
export declare class Label {
    id: string;
    name: string;
    color: number;
    colorHex: string;
    static toHex(color: number): string;
}
export declare class LabelID {
    id: string;
}
export declare class SetLabelsRequest {
    labels: LabelID[];
}
export declare class LabelChatAssociation {
    labelId: string;
    label: Label | null;
    chatId: string;
}
