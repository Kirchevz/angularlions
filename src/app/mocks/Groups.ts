import { Group } from "../models/Group";

export const GROUPS: Group[] = [
    {
        id: 1, name: "FirstGroup", jid: "nadeemo.FirstEvarGroup@conference.localhost", department: 1, channels: [
            { id:1, name: "general", jid: "nadeemo.FirstEvarGroup.general.localhost" },
            { id:2, name: "support", jid: "nadeemo.FirstEvarGroup.support.localhost" }
        ], 
        members: [
            {
                id: 1,
                webUser: { username: "nadeemo", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false },
                contact: { name: "nadeem ab", email: "some@mail.com", birthday: new Date("2005-09-18") },
                chatInfo: { jid: "user1@localhost", password: "passw0rd" }
            },
            {
                id: 2,
                webUser: { username: "valentino", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false },
                contact: { name: "valentin vt", email: "some1@mail.com", birthday: new Date("2001-02-13") },
                chatInfo: { jid: "user2@localhost", password: "passw0rd" }

            },
        ]
    },
    {
        id: 2, name: "SecondGroup", jid: "nadeemo.Secundo@conference.localhost", department: 1, channels: [
            { id:2, name: "general", jid: "nadeemo.Secundo.general.localhost"}
        ],  members: [
            {
                id: 1,
                webUser: { username: "nadeemo", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false },
                contact: { name: "nadeem ab", email: "some@mail.com", birthday: new Date("2005-09-18") },
                chatInfo: { jid: "user1@localhost", password: "passw0rd" }
            },
            {
                id: 2,
                webUser: { username: "valentino", password: "passw0rd", isResident: true, isLoginPermitted: true, isChatActivate: true, hasResidentWebAccess: true, hasBoardWebAccess: false },
                contact: { name: "valentin vt", email: "some1@mail.com", birthday: new Date("2001-02-13") },
                chatInfo: { jid: "user2@localhost", password: "passw0rd" }

            },
        ] 
    }
]