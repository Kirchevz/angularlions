// import { TestBed } from '@angular/core/testing';
// import { Observable } from 'rxjs';
// import { GROUPS } from '../mocks/Groups';
// import { USERS } from '../mocks/Users';
// import { Group } from '../models/Group';

// import { GroupDataService } from './group-data.service';

// describe('GroupDataService', () => {
//   let service: GroupDataService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(GroupDataService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should show for mock groups', () => {
//     const user = 

//     if(user) { 
//       service.getUserGroups(user).subscribe(groups => {
//         expect(groups.length).toBeGreaterThan(0)
//       })

//     } else {
//       fail() 
//     }
//   })

//   it('should get department group', () => {
//     const user = USERS.find(user => user.id == 1)
    
//     if(user) {
//       service.getDepartmentGroups(user).subscribe(groups => {
//         expect(groups.length).toBeGreaterThan(0)
//       })
//     } else {
//       fail()
//     }
//   })

//   it('should join a new group', () => {
//     const user = USERS.find(user => user.id == 1)
//     const newGroup = GROUPS.find(g => g.id == 3)

//     if(user) {
//       service.joinNewGroup(user, newGroup).subscribe(
//         subject => {
//           const groupo = 
//           expect(!!groupo?.members.find(user => user.id == 1)).toBeTrue()
//         }
//       )
      
//     } else {
//       fail()
//     }

//   })
// });
