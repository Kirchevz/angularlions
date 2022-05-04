import { ItemMsg } from "./ItemMsg";

export interface PresenceMsg {
    messageType: string,
    receiver: string,
    type: string,
    sender: string,
    group: string,
    item: ItemMsg
}