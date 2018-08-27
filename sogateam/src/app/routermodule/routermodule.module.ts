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
  { path: 'player-details', component: PlayerDetailsComponent },
  { path: '**', component: NotfoundComponent }
];


@NgModule({

  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  providers: []
})
export class RoutermoduleModule { }
