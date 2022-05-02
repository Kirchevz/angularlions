import { Component, OnInit } from '@angular/core';
import { Group } from '../models/Group';
import { GroupChannel } from '../models/GroupChannel';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { GroupDataService } from '../services/group-data.service';
import { UserDataService } from '../services/userData.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  selectedGroup?: Group
  selectedChannel?: GroupChannel
  text?: string
  user?: WebUserWithExtraInfo
  groups?: Group[]

  constructor(private websocketService: WebsocketService,
              private userDataService: UserDataService,
              private groupDataService: GroupDataService) { }

  ngOnInit(): void {
    this.websocketService.loginObservable?.subscribe(msg => console.log(msg))

    this.userDataService.userObservable.subscribe((user) => {
      if(user) {
        this.user = user
        this.groupDataService.getGroup(this.user).subscribe(groups => this.groups = groups)
      }
    })
  }

  selectGroup(groupId: number) {
    this.selectedGroup = this.groups?.find(group => group.id == groupId)
  }

  selectChannel(channelId: number) {
    this.selectedChannel = this.selectedGroup?.channels.find(channel => channel.id == channelId)
  }

  removeSelected() {
    this.selectedGroup = undefined
    this.selectedChannel = undefined
  }

  logOut() {
    
  }

}
