import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GROUPS } from '../mocks/Groups';
import { Group } from '../models/Group';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  constructor() { }

  getGroup(user: WebUserWithExtraInfo | undefined) {
    const groups = GROUPS.filter(
      group => group.members.find(u => u.id == user?.id)
      )

    return new Observable<Group[]>(subscribe => {
      if(groups) subscribe.next(groups)
      else {
        throw throwError(() => {
          const error: any = new Error(`No groups was found`);
          error.timestamp = Date.now();
          return error;
        })
      }
    })
  }
}
