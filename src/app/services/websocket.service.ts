import { Injectable } from '@angular/core';
import { filter, map, Observable, shareReplay, Subject, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Group } from '../models/Group';
import { GroupChatMsg } from '../models/GroupChatMsg';
import { LoginEnum } from '../models/loginEnum';
import { LoginMsg } from '../models/LoginMsg';
import { PresenceMsg } from '../models/PresenceMsg';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { GroupDataService } from './group-data.service';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private _subject: WebSocketSubject<any> = webSocket("ws://localhost:3000/chat")
  private _loginObservable: Observable<LoginMsg>
  private _groupChatMsgObservable: Observable<GroupChatMsg>
  private _presenceObservable: Observable<PresenceMsg>

  isLoggedIn: Observable<boolean>

  constructor(userDataService: UserDataService,
    groupDataService: GroupDataService) {

    userDataService.userObservable.subscribe({
      next: user => this.login(user),
      error: () => { alert('no valid xmpp credentials given') }
    })

    this._loginObservable = this._loginObservable = this._subject.pipe(
      filter(msg => msg.messageType == 'login'),
      shareReplay()
    )

    this._groupChatMsgObservable = this._subject.pipe(
      filter(msg => msg.messageType == 'groupChatMessage'),
      shareReplay()
    )

    this._presenceObservable = this._subject.pipe(
      filter(msg => msg.messageType == 'presence'),
      shareReplay()
    )

    this.isLoggedIn = this._loginObservable.pipe(
      map(msg => !!(msg.connectionType == LoginEnum.CONNECTED))
    )

    // If user logs in then get all join all groups if any
    // first subscribes to see if user is logged in then subscribes to groups
    this.isLoggedIn.subscribe({
      next: isLoggedIn => {
        if (isLoggedIn) {
          groupDataService.groupsObservable.subscribe(
            groups => {
              if (groups)
                this.joinGroups(groups)
            }
          )
        }
      }
    })
  }

  private login(user: WebUserWithExtraInfo | null) {
    if (user) {
      this._subject.next({ username: user.chatInfo.jid, password: user.chatInfo.password })
    }
  }

  public get subject() {
    return this._subject
  }

  public get loginObservable(): Observable<LoginMsg> {
    return this._loginObservable
  }

  public get groupChatMsgObservable(): Observable<GroupChatMsg> {
    return this._groupChatMsgObservable
  }

  public get presenceObservable(): Observable<PresenceMsg> {
    return this._presenceObservable
  }

  public joinGroups(groups: Group[]) {
    this._subject.next({ 
      messageType: 'joinGroups', 
      groups: groups 
    })
  }

  public sendGroupChatMsg(message: string, room: string) {
    this._subject.next({ 
      messageType: 'groupChatMessage', 
      message: message, 
      room: room 
    })
  }

}
