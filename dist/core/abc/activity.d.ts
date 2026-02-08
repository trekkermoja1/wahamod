import type { WhatsappSession } from '@waha/core/abc/session.abc';
export declare function Activity(): <T extends (...args: any[]) => Promise<any>>(target: WhatsappSession, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;
