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
  departmentGroups?: Group[]

  constructor(userDataService: UserDataService,
    groupDataService: GroupDataService) { 
      userDataService.userObservable.subscribe(user => {
        if(user)
        groupDataService.getDepartmentGroups(user).subscribe(groups =>
          this.departmentGroups = groups)
      })
      
    }

  ngOnInit(): void {
  }

}
