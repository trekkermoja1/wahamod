export interface NOWEBNewsletterMetadata {
    id: string;
    state: string;
    creation_time: number;
    name: string;
    nameTime: number;
    description: string;
    descriptionTime: number;
    invite: string;
    handle: string;
    picture: string | null;
    preview: string | null;
    reaction_codes: string | null;
    subscribers: number;
    verification: string;
    viewer_metadata: any;
}
export declare function toNewsletterMetadata(data: any): NOWEBNewsletterMetadata | null;
