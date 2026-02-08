import { Label, LabelChatAssociation } from '@waha/structures/labels.dto';
import * as gows from './types';
export declare function eventToLabelDTO(labelEdit: gows.LabelEdit): Label;
export declare function eventToLabelChatAssociationDTO(labelAssoc: gows.LabelAssociationChat): LabelChatAssociation;
export declare function isLabelUpsertEvent(labelEdit: gows.LabelEdit): boolean;
export declare function isLabelChatAddedEvent(labelAssoc: gows.LabelAssociationChat): boolean;
