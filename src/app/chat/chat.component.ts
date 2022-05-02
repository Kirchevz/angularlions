import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { UserDataService } from '../services/userData.service';
import { WebsocketService } from '../services/websocket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  selectedChat?: string
  text?: string
  user?: WebUserWithExtraInfo

  constructor(private websocketService: WebsocketService,
              private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.websocketService.loginObservable?.subscribe(msg => console.log(msg))

    this.userDataService.userObservable.subscribe((user) => {
      if(user) this.user = user
    })
  }

}
