import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {FormsModule } from '@angular/forms';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent } from './login/login.component';
import {ChatComponent } from './chat/chat.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClientModule} from'@angular/common/http';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { JoinGroupComponent } from './join-group/join-group.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    JoinGroupComponent
  ],
  imports: [
  HttpClientModule,
  MatButtonModule,
  MatButtonToggleModule,
  FormsModule,
  MatSidenavModule,
  MatCardModule,
  MatCheckboxModule,
  MatTabsModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSliderModule,
  MatListModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
