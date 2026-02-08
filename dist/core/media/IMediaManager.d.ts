import { IMediaEngineProcessor } from '@waha/core/media/IMediaEngineProcessor';
import { WAMedia } from '@waha/structures/media.dto';
interface IMediaManager {
    processMedia<Message>(processor: IMediaEngineProcessor<Message>, message: Message, session: string): Promise<WAMedia | null>;
    close(): void;
}
export { IMediaManager };
