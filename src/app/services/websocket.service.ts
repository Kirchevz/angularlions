import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { GroupChatMsg } from '../models/GroupChatMsg';
import { loginMsg } from '../models/loginMsg';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private _subject?: WebSocketSubject<unknown>
  private _loginSubject: Subject<loginMsg>
  private groupChatMsgSubject: Subject<GroupChatMsg>

  constructor() { 
    this._loginSubject = new Subject<loginMsg>(),
    this.groupChatMsgSubject = new Subject<GroupChatMsg>()
  }

  public get subject() {
    if(!this._subject) {
      this._subject = webSocket("ws://localhost:3000/chat")

      this._subject.subscribe(this.subjectHandler)
    }

    return this._subject
  }

  
  public get loginSubject() : Subject<loginMsg> {
    return this._loginSubject
  }
  

  private subjectHandler = (stanza: any) => {
    switch (stanza.messageType) {
      case 'login':
        this._loginSubject.next(<loginMsg> stanza)
        break;
      case 'groupChatMessage':
        this.groupChatMsgSubject.next(<GroupChatMsg> stanza)
        break;
      default:
        break;
    }
  }
}
