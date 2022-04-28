import { Injectable } from '@angular/core';
import { USERS } from '../mocks/Users';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  // NOTE: currently mocked data
  // TODO: make this get data from c# api
  getUser(username?: string, password?: string): WebUserWithExtraInfo | undefined {
    if (username && password) {
      let user = USERS.find(i => i.webUser.username == username)

      if (user?.webUser.password == password) {
        return user
      }
    }
    
    return undefined
  }
}
