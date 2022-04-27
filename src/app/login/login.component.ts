import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection.service';
import { loginMsg } from '../models/loginMsg';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ""
  password: string = ""

  constructor(private router: Router, private connectionService: ConnectionService, 
    private securityService: SecurityService) {
      connectionService.loginSubject.subscribe(this.login)
     }

  ngOnInit() { }

  onLogin() {
    const user = this.securityService.getUser(this.username, this.password)

    if (user) {
      this.connectionService.subject.next(
        {username: user.chatInfo.jid, password: user.chatInfo.password}
        )
        this.connectionService.subject.subscribe(stanza => console.log(stanza))
    } else {
      alert("wrong")
    }

    // if (this.username == "user" && this.password == "user") {
    //   this.router.navigate(["/chat"])
    // }
    // else {
    //   alert("wrong")
    // }
  }

  private login = (loginStanza: loginMsg) => {
    const msg = loginStanza.connectionType

    if(msg == "CONNECTED") {
      this.router.navigate(["/chat"])
    } else if(msg == "AUTHFAIL") {
      alert("wrong")
    }
  }

}
