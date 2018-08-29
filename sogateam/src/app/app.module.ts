import { AuthserviceService } from './services/authservice.service';
import { environment } from './../environments/environment';
import { RoutermoduleModule } from './routermodule/routermodule.module';
import { PlayersDataService } from './services/players-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllplayersComponent } from './components/allplayers/allplayers.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';


import { FormsModule } from '@angular/Forms';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AllplayersComponent,
    AddPlayerComponent,
    PlayerDetailsComponent,
    EditPlayerComponent,
    NotfoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutermoduleModule,
    AngularFireModule.initializeApp(environment.firebase, 'sogateam'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
   
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularFireAuthModule,
    FormsModule,
 
 
   
  ],
  providers: [ PlayersDataService, AuthserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
