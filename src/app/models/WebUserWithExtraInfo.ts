import { ChatInfo } from "./ChatInfo";
import { Contact } from "./Contact";
import { TenantWebInfo } from "./TenantWebInfo";
import { WebUser } from "./WebUser";

export interface WebUserWithExtraInfo {
    id: number,
    webUser: WebUser,
    contact: Contact,
    chatInfo: ChatInfo,
    tenantWebInfo: TenantWebInfo,
}