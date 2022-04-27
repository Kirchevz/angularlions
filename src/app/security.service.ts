import { Injectable } from '@angular/core';
import { USERS } from './mocks/Users';
import { WebUserWithExtraInfo } from './models/WebUserWithExtraInfo';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  getUser(username: string, password: string): WebUserWithExtraInfo | undefined {
    let user = USERS.find(i => i.webUser.username == username)

    if (user?.webUser.password == password) {
      return user
    }

    return undefined
  }
}
