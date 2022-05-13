import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { LoginMsg } from '../models/LoginMsg';
import { UserDataService } from '../services/userData.service';
import { Subscription } from 'rxjs';
import { LoginEnum } from '../models/loginEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username?: string | undefined
  password?: string | undefined
  loginSubscription?: Subscription

  constructor(
    private router: Router,
    private userDataService: UserDataService,

  ) {}

  ngOnInit() { }

  onLogin() {

    if (this.username && this.password) {
      this.loginSubscription = this.userDataService.login(this.username, this.password).subscribe({
        next: () => {
          this.router.navigate(["/chat"])
          this.loginSubscription?.unsubscribe()
        }, error: () => {
          alert("wrong credentials")
        }
      })
    }
  }

  // private loginLogic = (loginStanza: loginMsg) => {
  //   const msgType = loginStanza.connectionType

  //   switch (msgType) {
  //     case loginType.CONNECTED:
  //       this.router.navigate(["/chat"])
  //       this.loginSubscription?.unsubscribe()
  //       break;
  //     case loginType.AUTHFAIL:
  //       alert("Wrong ejabberd credentials")
  //       break;
  //     case loginType.CONFAIL:
  //       alert('Ejabberd server error')
  //       break;
  //     default:
  //       break;
  //   }
  // }

}
