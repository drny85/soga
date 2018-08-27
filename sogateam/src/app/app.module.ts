import { RoutermoduleModule } from './routermodule/routermodule.module';
import { PlayersDataService } from './services/players-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllplayersComponent } from './components/allplayers/allplayers.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AllplayersComponent,
    AddPlayerComponent,
    PlayerDetailsComponent,
    EditPlayerComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RoutermoduleModule
  ],
  providers: [ PlayersDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
