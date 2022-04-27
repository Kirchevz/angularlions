export interface WebUser {
    username: string,
    password: string,
    isResident: boolean,
    isChatActivate: boolean,
    isLoginPermitted: boolean,
    hasResidentWebAccess: boolean,
    hasBoardWebAccess: boolean
}