import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { JoinGroupComponent } from './join-group/join-group.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuardGuard],
    },
    {
        path: 'groups',
        component: JoinGroupComponent,
        canActivate: [AuthGuardGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
})
export class AppRoutingModule { }