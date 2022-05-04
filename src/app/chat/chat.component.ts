import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, scan, Subscription, tap, toArray } from 'rxjs';
import { Group } from '../models/Group';
import { GroupChannel } from '../models/GroupChannel';
import { GroupChatMsg } from '../models/GroupChatMsg';
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
  isWsLoggedIn?: boolean
  groupChatMessages: GroupChatMsg[] = new Array<GroupChatMsg>()
  channelMessages: GroupChatMsg[] = new Array<GroupChatMsg>()

  private channelSubscription?: Subscription
  private groupChatMessageSubject = new BehaviorSubject<GroupChatMsg[] | null>(null)
  private selectedChannelSubject = new BehaviorSubject<GroupChannel | null>(null)

  constructor(private websocketService: WebsocketService,
    private userDataService: UserDataService,
    private groupDataService: GroupDataService) { }

  ngOnInit(): void {
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
        this.groupDataService.getGroup(this.user).subscribe(groups => this.groups = groups)
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
              // NOTE: RXJS IS A MASSIVE PAIN
              // NOTE: Changes done to the ejabberd configuration to persist data
              this.channelMessages = msgs?.filter(msg => msg.group == channel.jid.toLowerCase())
            }
          )
        }
      }
    )
  }

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

  sendGroupChatMsg(msgText: string | undefined) {
    if (this.selectedChannel && msgText) {
      this.websocketService.sendGroupChatMsg(msgText, this.selectedChannel?.jid)
      this.text = ""
    }
  }

  getChannelMessages() {
    const groupMsg = this.groupChatMessages.filter(msg => msg.group == this.selectedChannel?.jid)
    console.log(this.groupChatMessages)
    return groupMsg
  }

  getMemberNameFromJid(jid: string) {
    return this.selectedGroup?.members.find(
      member => member.chatInfo.jid == jid
      )?.contact.name
  }

}
