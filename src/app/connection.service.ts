import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  subject?: WebSocketSubject<unknown>

  constructor() { 
    this.getService().subscribe(msg => console.log(msg))
    console.log('success')
  }

  getService() {
    if(!this.subject) {
      this.subject = webSocket("ws://localhost:3000/chat")
    }
    return this.subject
  }
}
