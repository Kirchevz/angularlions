import { WebUserWithExtraInfo } from "../models/WebUserWithExtraInfo";


export const USERS: WebUserWithExtraInfo[] = [
    {
        id: 1,
        webUser: {username: "nadeemo", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "nadeem ab", email: "some@mail.com", birthday: new Date("2005-09-18")},
        chatInfo: {jid: "user1@localhost", password: "passw0rd" },
        tenantWebInfo: {company: {id: 1, name: "sad"}, department: {id:1, name: "what"}, lease: {id: 1, signOutDate: null, signUpDate: new Date()}}
    },
    {
        id: 2,
        webUser: {username: "valentino", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "valentin vt", email: "some1@mail.com", birthday: new Date("2001-02-13")},
        chatInfo: {jid: "user2@localhost", password: "passw0rd" },
        tenantWebInfo: {company: {id: 1, name: "sad"}, department: {id:1, name: "what"}, lease: {id: 2, signOutDate: null, signUpDate: new Date()}}
            
    },
    {
        id: 3,
        webUser: {username: "random0", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "rando 1", email: "some1t@mail.com", birthday: new Date("1992-02-13")},
        chatInfo: {jid: "user3@localhost", password: "passw0rd"},
        tenantWebInfo: {company: {id: 1, name: "sad"}, department: {id:2, name: "what"}, lease: {id: 1, signOutDate: null, signUpDate: new Date()}}
    },
    {
        id: 4,
        webUser: {username: "casperino", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "casper s", email: "some1t@mail.com", birthday: new Date("1992-02-13")},
        chatInfo: {jid: "user4@localhost", password: "passw0rd"},
        tenantWebInfo: {company: {id: 1, name: "sad"}, department: {id:1, name: "what"}, lease: {id: 6, signOutDate: null, signUpDate: new Date()}}
    },
]