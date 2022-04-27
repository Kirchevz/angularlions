import { ChatInfo } from "./ChatInfo";
import { Contact } from "./Contact";
import { WebUser } from "./WebUser";

export interface WebUserWithExtraInfo {
    webUser: WebUser,
    contact: Contact,
    chatInfo: ChatInfo,
}