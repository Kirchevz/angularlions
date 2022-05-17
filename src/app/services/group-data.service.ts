import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap, throwError } from 'rxjs';
import { GROUPS } from '../mocks/Groups';
import { Group } from '../models/Group';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  private groupsSubject = new BehaviorSubject<Group[] | null>(null)

  groupsObservable: Observable<Group[] | null> = this.groupsSubject.asObservable()
  
  constructor() { }

  getGroup(user: WebUserWithExtraInfo | undefined) : Observable<Group[]> {
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
    }).pipe(
      tap(groups => {
        this.groupsSubject.next(groups)
      }),
    )
  }

  getDepartmentGroups(user: WebUserWithExtraInfo | undefined) {
    const groups = GROUPS.filter(
      group => group.departmentId == user?.tenantWebInfo.DepartmentId
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