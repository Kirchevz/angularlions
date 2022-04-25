import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ""
  password: string = ""

  constructor(private router: Router, private connectionService: ConnectionService) {}

  ngOnInit() { }

  onLogin() {
    if (this.username == "user" && this.password == "user") {
      this.router.navigate(["/chat"])
    }
    else {
      alert("wrong")
    }
  }

}
