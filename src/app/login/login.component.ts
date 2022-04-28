import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { loginMsg } from '../models/loginMsg';
import { UserDataService } from '../services/userData.service';
import { ConnectionService } from '../services/connection.service';
import { Subscription } from 'rxjs';
import { loginType } from '../models/loginEnum';

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
    private connectionService: ConnectionService
    ) { }

  ngOnInit() { }

  onLogin() {
    this.loginSubscription = this.connectionService.login(this.username, this.password)
        .subscribe(this.loginLogic)
  }

  private loginLogic = (loginStanza: loginMsg) => {
    const msg = loginStanza.connectionType

    switch (msg) {
      case loginType.CONNECTED:
        this.router.navigate(["/chat"])
        break;
      case loginType.AUTHFAIL:
        alert("Wrong ejabberd credentials")
        break;
      case loginType.CONFAIL:
        alert('Ejabberd server error')
        break;
      default:
        break;
    }
  }

}
