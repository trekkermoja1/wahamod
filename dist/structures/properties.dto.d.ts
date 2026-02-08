import { ApiPropertyOptions } from '@nestjs/swagger';
declare function ChatIdProperty(options?: ApiPropertyOptions | null): PropertyDecorator;
declare function MessageIdProperty(): PropertyDecorator;
declare function MessageIdOnlyProperty(): PropertyDecorator;
declare function ReplyToProperty(): PropertyDecorator;
export declare function ConvertApiProperty(): PropertyDecorator;
export { ChatIdProperty, MessageIdOnlyProperty, MessageIdProperty, ReplyToProperty, };
