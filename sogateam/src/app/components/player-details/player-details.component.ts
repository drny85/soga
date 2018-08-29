import { Player } from './../../models/player';
import { ToastrService } from 'ngx-toastr';
import { PlayersDataService } from './../../services/players-data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {


  id: string;
  player: Player;
  url: string;
  

  

  constructor(private route: ActivatedRoute, private playerServ: PlayersDataService, private router: Router, private message: ToastrService) { }

  ngOnInit() {

    this.url = this.router.url;
    this.id = this.route.snapshot.params['id'];
    this.playerServ.getPlayer(this.id).subscribe(player => this.player = player);

    
  }

 

  onDelete() {
    if (confirm('Are you sure you want to delete it?')) {
      this.playerServ.deletePlayer(this.id)
      this.message.info('Player has been deleted', 'Deteled');
      this.router.navigate(['allplayers']);
    } else {
    this.message.info('No changes were made', 'Canceled');
  }

  }
  
}
