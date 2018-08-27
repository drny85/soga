import { PlayerDetailsComponent } from './../components/player-details/player-details.component';
import { EditPlayerComponent } from './../components/edit-player/edit-player.component';
import { NotfoundComponent } from './../components/notfound/notfound.component';
import { AddPlayerComponent } from './../components/add-player/add-player.component';
import { AllplayersComponent } from './../components/allplayers/allplayers.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const appRouter: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'allplayers', component: AllplayersComponent},
  { path: 'add-player', component: AddPlayerComponent },
  { path: '**', component: NotfoundComponent },
  { path: 'edit-player/:id', component: EditPlayerComponent},
  { path: 'player-details', component: PlayerDetailsComponent },
];


@NgModule({

  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouter)
  ],
  declarations: [],
  providers: []
})
export class RoutermoduleModule { }
