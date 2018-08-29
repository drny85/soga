import { AuthGuard } from './../../guards/auth.guard';
import { LoginComponent } from './../components/login/login.component';
import { AuthserviceService } from './../services/authservice.service';
import { PlayerDetailsComponent } from './../components/player-details/player-details.component';
import { NotfoundComponent } from './../components/notfound/notfound.component';
import { AddPlayerComponent } from './../components/add-player/add-player.component';
import { AllplayersComponent } from './../components/allplayers/allplayers.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPlayerComponent } from '../components/edit-player/edit-player.component';



const appRoutes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'allplayers', component: AllplayersComponent},
  { path: 'add-player', component: AddPlayerComponent },
  

  { path: 'edit-player/:id', component: EditPlayerComponent},
  { path: 'player-details/:id', component: PlayerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent }
];


@NgModule({

  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  providers: [AuthserviceService]
})
export class RoutermoduleModule { }
