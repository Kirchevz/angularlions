import { ChatChannel } from "./ChatChannel";

export interface ChatGroup {
    name: string,
    jid: string,
    channels: ChatChannel[]
}