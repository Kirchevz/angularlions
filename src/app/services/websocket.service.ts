import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { GroupChatMsg } from '../models/GroupChatMsg';
import { LoginMsg } from '../models/LoginMsg';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private _subject: WebSocketSubject<any> = webSocket("ws://localhost:3000/chat")
  private _loginObservable: Observable<LoginMsg>
  private _groupChatMsgObservable: Observable<GroupChatMsg>

  constructor(private userDataService: UserDataService) {
    userDataService.userObservable.subscribe({
      next: user => this.login(user),
      error: () => { alert('no valid xmpp credentials given') }
    })

    this._loginObservable = this._loginObservable = this._subject.pipe(
      filter(msg => msg.messageType == 'login')
    )

    this._groupChatMsgObservable = this._subject.pipe(
      filter(msg => msg.messageType == 'groupChatMessage')
    )
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

}
