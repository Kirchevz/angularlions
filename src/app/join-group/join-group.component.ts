import { Component, OnInit } from '@angular/core';
import { Group } from '../models/Group';
import { WebUserWithExtraInfo } from '../models/WebUserWithExtraInfo';
import { GroupDataService } from '../services/group-data.service';
import { UserDataService } from '../services/userData.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {
  private currUser?: WebUserWithExtraInfo | null
  departmentGroups?: Group[]

  constructor(userDataService: UserDataService,
    private groupDataService: GroupDataService) { 
      userDataService.userObservable.subscribe(user => {
        if(user) {
        this.currUser = user
        groupDataService.getDepartmentGroups(user).subscribe(groups =>
          this.departmentGroups = groups)
        }
      })
      
    }

  ngOnInit(): void {
  }

  joinNewGroup(group: Group) {
    if (this.currUser)
    this.groupDataService.joinNewGroup(this.currUser, group)
  }

}
