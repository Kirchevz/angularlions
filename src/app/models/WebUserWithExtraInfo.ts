import { ChatInfo } from "./ChatInfo";
import { Contact } from "./Contact";
import { WebUser } from "./WebUser";

export interface WebUserWithExtraInfo {
    id: number,
    webUser: WebUser,
    contact: Contact,
    chatInfo: ChatInfo,
}