import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Group } from '../models/Group';
import { GroupChannel } from '../models/GroupChannel';
import { GroupChatMsg } from '../models/GroupChatMsg';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { GroupDataService } from '../services/group-data.service';
import { UserDataService } from '../services/userData.service';
import { WebsocketService } from '../services/websocket.service';
import {MatDialog} from '@angular/material/dialog';
import { JoinGroupComponent } from '../join-group/join-group.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('channelHistory') private channelHistory : ElementRef | undefined

  selectedGroup?: Group
  selectedChannel?: GroupChannel
  text?: string
  user?: WebUserWithExtraInfo
  groups?: Group[]
  isWsLoggedIn?: boolean
  groupChatMessages: GroupChatMsg[] = new Array<GroupChatMsg>()
  channelMessages: GroupChatMsg[] = new Array<GroupChatMsg>()
  // has a map since it contains the jid plus the status of the user
  // TODO: might implement statuses for users
  groupUsersOnlineStatus: Map<string, string> = new Map<string, string>()

  private channelSubscription?: Subscription
  private groupChatMessageSubject = new BehaviorSubject<GroupChatMsg[] | null>(null)
  private selectedChannelSubject = new BehaviorSubject<GroupChannel | null>(null)
  

  constructor(private websocketService: WebsocketService,
    private userDataService: UserDataService,
    private groupDataService: GroupDataService,
    public dialog: MatDialog) { }
  
  
  ngAfterViewChecked(): void {
    // NOTE: Checks if there is an update/rerender on the page and if there is it will place the scroll bar in the bottom
    if (this.channelHistory)
    this.channelHistory.nativeElement.scrollTop = this.channelHistory?.nativeElement.scrollHeight
    
  }

  ngOnInit(): void {

    // TODO: Replace "isLoggedIn" with method that can actually check if the connection has failed
    this.websocketService.isLoggedIn?.subscribe(isLoggedin => {
      this.isWsLoggedIn = isLoggedin

      if (isLoggedin) {
        this.websocketService.groupChatMsgObservable.subscribe((msg) => {
          this.groupChatMessages.push(msg)
          this.groupChatMessageSubject.next(this.groupChatMessages)
        })
      } 
    })

    this.userDataService.userObservable.subscribe((user) => {
      if (user) {
        this.user = user
        this.groupDataService.getGroup(this.user).subscribe(groups =>{
           this.groups = groups
          })
      }
    })

    this.selectedChannelSubject.subscribe(
      channel => {
        if(channel) {
          if(this.channelSubscription) {
            this.channelSubscription.unsubscribe()
          }
          this.channelSubscription = this.groupChatMessageSubject.subscribe(
            msgs => {
              if(msgs)
              // NOTE: Problem every jid is lowercase when returned from ejabberd
              // NOTE: Changes done to the ejabberd configuration to persist data
              this.channelMessages = msgs?.filter(msg => msg.group == channel.jid.toLowerCase())
            }
          )
        }
      }
    )

    this.websocketService.presenceObservable.subscribe(msg => {
      console.log(msg)
      
      if(msg.item?.jid) {
        if(msg.type == "") {
          this.groupUsersOnlineStatus.set(msg.item.jid, 'online')
        } else if (msg.type == "unavailable") {
          this.groupUsersOnlineStatus.delete(msg.item.jid)
        } else {
          console.log(msg.type + ': is unknown')
        }
        console.log(this.groupUsersOnlineStatus)
        
      }
    })
  }

  // Selection section:
  selectGroup(groupId: number) {
    this.selectedGroup = this.groups?.find(group => group.id == groupId)
  }

  selectChannel(channelId: number) {
    this.selectedChannel = this.selectedGroup?.channels.find(channel => channel.id == channelId)

    if(this.selectedChannel) {
      this.selectedChannelSubject.next(this.selectedChannel)
    }
    
  }

  removeSelected() {
    this.selectedGroup = undefined
    this.selectedChannel = undefined
  }

  // Group message method
  sendGroupChatMsg(msgText: string | undefined) {
    if (this.selectedChannel && msgText) {
      this.websocketService.sendGroupChatMsg(msgText, this.selectedChannel?.jid)
      this.text = ""
    }
  }

  // User data section:
  getMemberNameFromJid(jid: string) {

    return this.selectedGroup?.members.find(
      member => member.chatInfo.jid == jid
      )?.contact.name
  }

  isMemberOnline(jid: string) {
    if(this.groupUsersOnlineStatus.has(jid)) {
      switch (this.groupUsersOnlineStatus.get(jid)) {
        case 'online':
          return true
        default:
          return false
      }
    }
    return false
  }

  isOwnMessage(msg: GroupChatMsg) {
    return msg.sender == this.user?.chatInfo.jid
  }

  // Dialog section
  openDialog() {
    const dialogRef = this.dialog.open(JoinGroupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.groupDataService.getGroup(this.user).subscribe(groups =>{
        this.groups = groups
       })
    })
    // after dialog has been closed update the group list
  }
}
