// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { LoginMsg } from '../models/LoginMsg';
// import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
// import { WebsocketService } from '../services/websocket.service';
// import { UserDataService } from './userData.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ConnectionService {
  
//   constructor(
//     private websocketService: WebsocketService,
//     private userDataService: UserDataService
//   ) { }

//   public login(username: string, password: string): Observable<LoginMsg> {
//     this.userDataService.login(username, password).subscribe({
//       next: this.successfulLogin, error: () => { throw new Error('Could not login') }
//     })

//     return this.websocketService.loginSubject.asObservable()
//   }

//   private successfulLogin = (user: WebUserWithExtraInfo) => {
//     this.websocketService.subject.next(
//       // NOTE: send the username and password over the connection
//       // TODO: change to token ones c# api works
//       { username: user.chatInfo.jid, password: user.chatInfo.password }
//     )
//   }
// }
