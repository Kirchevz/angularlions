// NOTE: should not contain password as in the future a token will be generated instead
export interface ChatInfo {
    jid: string,
    password: string,
}
// make password a token later on in part 3