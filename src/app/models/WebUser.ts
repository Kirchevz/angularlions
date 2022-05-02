export interface WebUser {
    // TODO: Remove username and password once c# api is built
    username: string,
    password: string,
    isResident: boolean,
    isChatActivate: boolean,
    isLoginPermitted: boolean,
    hasResidentWebAccess: boolean,
    hasBoardWebAccess: boolean
}