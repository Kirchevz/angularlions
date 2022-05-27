import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap, throwError } from 'rxjs';
import { Group } from '../models/Group';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  
  private groupsSubject = new BehaviorSubject<Group[] | null>(null)

  groupsObservable: Observable<Group[] | null> = this.groupsSubject.asObservable()
  
  constructor(private http: HttpClient) { }

  getUserGroups(user: WebUserWithExtraInfo | undefined) : Observable<Group[]> {

     return this.http.get<Group[]>(`https://localhost:7102/api/Group/User/${user?.id}`).pipe(
       tap(groups => this.groupsSubject.next(groups))
     )
    // const groups = GROUPS.filter(
    //   group => group.members.find(u => u.id == user?.id)
    //   )

    // return new Observable<Group[]>(subscribe => {
    //   if(groups) subscribe.next(groups)
    //   else {
    //     throw throwError(() => {
    //       const error: any = new Error(`No groups was found`);
    //       error.timestamp = Date.now();
    //       return error;
    //     })
    //   }
    // }).pipe(
    //   tap(groups => {
    //     this.groupsSubject.next(groups)
    //   }),
    // )
  }

  getDepartmentGroups(user: WebUserWithExtraInfo | undefined) {
    return this.http.get<Group[]>(`https://localhost:7102/api/Group/Department/${user?.tenantWebInfo.department.id}`)
    // const groups = GROUPS.filter(
    //   group => group.departmentId == user?.tenantWebInfo.DepartmentId
    //   )
      
    // return new Observable<Group[]>(subscribe => {
    //   if(groups) subscribe.next(groups)
    //   else {
    //     throw throwError(() => {
    //       const error: any = new Error(`No groups was found`);
    //       error.timestamp = Date.now();
    //       return error;
    //     })
    //   }
    // })
  }

  joinNewGroup(user: WebUserWithExtraInfo | undefined, group: Group | undefined) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    
    return this.http.put(`https://localhost:7102/api/Group/Join`, {userId: user?.id, groupId:group?.id}, httpOptions)
  //   const newGroup = GROUPS.find(g => g.id == group?.id)
  //   if(user){
  //     // Check if user already member
  //     if (!newGroup?.members.find(u => u.id == user.id))
  //     newGroup?.members.push(user)
  // }
  }
}