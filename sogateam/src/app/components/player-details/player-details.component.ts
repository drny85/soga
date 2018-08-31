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
  showMoreDiv: boolean = false;
  

  

  constructor(private route: ActivatedRoute, private playerServ: PlayersDataService, private router: Router, private message: ToastrService) { }

  ngOnInit() {

    this.url = this.router.url;
    this.id = this.route.snapshot.params['id'];
    this.playerServ.getPlayer(this.id).subscribe(player => this.player = player);

    
  }

 

  onDelete() {
    if (confirm('Are you sure you want to delete it?')) {
      this.playerServ.deletePlayer(this.id)
      this.message.info(`${this.player.name.toUpperCase()} ${this.player.last_name.toUpperCase()} has been deleted from SogaTeam`);
      this.router.navigate(['allplayers']);
    } else {
    this.message.info('No changes were made', 'Canceled');
  }

  }

  showMore() {
    let div = <HTMLBodyElement>document.getElementById('show');
    let btn = <HTMLBodyElement>document.getElementById('showBtn');
    this.showMoreDiv = !this.showMoreDiv;
      
    if (this.showMoreDiv) {
     
      btn.innerText = 'Show Less';
      
      div.classList.replace('zoomOut', 'zoomIn');
      
    } else {
    
      btn.innerText = 'Show More';
      div.classList.replace('zoomIn', 'zoomOut');
     
    }
    
  }

 
  
}
