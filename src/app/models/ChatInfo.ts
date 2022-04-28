import { ChatGroup } from "./ChatGroup";

// NOTE: should not contain password as in the future a token will be generated instead
export interface ChatInfo {
    jid: string,
    password: string,
    groups: ChatGroup[]
}
// make password a token later on in part 3