import { WebUserWithExtraInfo } from "../models/WebUserWithExtraInfo";


export const USERS: WebUserWithExtraInfo[] = [
    {
        webUser: {username: "nadeemo", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "nadeem ab", email: "some@mail.com", birthday: new Date("2005-09-18")},
        chatInfo: {jid: "user1@localhost", password: "passw0rd", groups: [
            {name: "FirstEvarGroup", jid: "aaa@conference.localhost", channels: [
                {name: "general", jid: "nadeemo.general.localhost"}
            ]}
        ]}
    },
    {
        webUser: {username: "valentino", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "valentin vt", email: "some1@mail.com", birthday: new Date("2001-02-13")},
        chatInfo: {jid: "user2@localhost", password: "passw0rd", groups: [
            {name: "FirstEvarGroup", jid: "aaa@conference.localhost", channels: [
                {name: "general", jid: "nadeemo.general.localhost"}
            ]}
        ]}
    },
    {
        webUser: {username: "random0", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false},
        contact: {name: "rando 1", email: "some1t@mail.com", birthday: new Date("1992-02-13")},
        chatInfo: {jid: "user3@localhost", password: "passw0rd", groups: [
            {name: "FirstEvarGroup", jid: "aaa@conference.localhost", channels: [
                {name: "general", jid: "nadeemo.general.localhost"}
            ]}
        ]}
    },
]