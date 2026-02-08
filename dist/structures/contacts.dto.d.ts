import { PaginationParams } from '@waha/structures/pagination.dto';
import { SessionBaseRequest, SessionQuery } from './base.dto';
export declare class ContactQuery extends SessionQuery {
    contactId: string;
}
export declare class ContactProfilePictureQuery extends ContactQuery {
    refresh?: boolean;
}
export declare enum ContactSortField {
    ID = "id",
    NAME = "name"
}
export declare class ContactsPaginationParams extends PaginationParams {
    sortBy?: string;
}
export declare class ContactRequest extends SessionBaseRequest {
    contactId: string;
}
export declare class ContactUpdateBody {
    firstName: string;
    lastName: string;
}
