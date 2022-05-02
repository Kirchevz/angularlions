import { GroupChannel } from "./GroupChannel";
import { WebUserWithExtraInfo } from "./WebUserWithExtraInfo";

export interface Group {
    id: number,
    name: string,
    jid: string,
    department: number,
    channels: GroupChannel[]
    members: WebUserWithExtraInfo[]
}