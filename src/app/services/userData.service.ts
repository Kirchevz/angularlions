import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userSubject = new BehaviorSubject<WebUserWithExtraInfo | null>(null)

  userObservable: Observable<WebUserWithExtraInfo | null> = this.userSubject.asObservable()

  isLoggedIn : Observable<boolean>

  constructor(private http: HttpClient) {
    this.isLoggedIn = this.userObservable.pipe(map(user => !!user))
   }

  // NOTE: currently mocked data
  // TODO: make this get data from c# api
  login(username: string, password: string) : Observable<WebUserWithExtraInfo> {

    return this.http.get<WebUserWithExtraInfo>(`https://localhost:7102/api/UserExtra/Login?username=${username}&password=${password}`).pipe(
      tap(user => this.userSubject.next(user))
    )
    // const user = USERS.find(i => i.webUser.username == username)
    // const correctPassword = user?.webUser.password == password

    // return new Observable<WebUserWithExtraInfo>(subscribe => {
    //   if(correctPassword) {
    //     subscribe.next(user)
    //   } else {
    //     throw throwError(() => {
    //       const error: any = new Error(`No user was found`);
    //       error.timestamp = Date.now();
    //       return error;
    //     })
    //   }
    // }).pipe(
    //   tap(user => {
    //     this.userSubject.next(user)
    //   }),
    // )
  }
}
