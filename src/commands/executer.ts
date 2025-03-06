import path from 'path';
import { commandMessage } from '../util/message.js';
export class HandlerExecuter {
    static async use(handlerPath: string, argv: any) {
        const absolutePath = `file://${path.resolve(handlerPath)}`;
        try {
            const module = await import(absolutePath);
            if (module.default && typeof module.default === 'function') {
                await module.default(argv);
            } else if (typeof module === 'function') {
                await module(argv);
            } else {
                commandMessage({
                    type: 'error',
                    comment: 'Handler module does not export a function'
                });
            }
        } catch (error) {
            commandMessage({
                type: 'error',
                comment: `Error executing handler: ${error}`
            });
        }
    }
}
