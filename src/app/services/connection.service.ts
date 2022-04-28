import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginMsg } from '../models/loginMsg';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { WebsocketService } from '../services/websocket.service';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private _currentUser?: WebUserWithExtraInfo | undefined;

  constructor(
    private websocketService: WebsocketService,
    private userDataService: UserDataService
    ) { }
  
  // NOTE: might store the user in localstore so it retrieved after page reload
  public get currentUser(): WebUserWithExtraInfo | undefined {
    return this._currentUser;
  }

  public login(username?: string, password?: string): Observable<loginMsg> {
    const user = this.userDataService.getUser(username, password)

    if(user) {
      this._currentUser = user

      this.websocketService.subject.next(
        // send the username and password over the connection
        // TODO: change to token ones c# api works
        {username: user.chatInfo.jid, password: user.chatInfo.password}
        )
    }

    return this.websocketService.loginSubject.asObservable()
  }

}
