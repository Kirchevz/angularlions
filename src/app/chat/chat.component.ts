import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { WebsocketService } from '../services/websocket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  selectedChat?: string
  text?: string

  constructor(private websocketService: WebsocketService) { 
  }

  ngOnInit(): void {
    this.websocketService.loginObservable?.subscribe(msg => console.log(msg))
  }

}
