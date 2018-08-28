import { PlayersDataService } from './../../services/players-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allplayers',
  templateUrl: './allplayers.component.html',
  styleUrls: ['./allplayers.component.css']
})
export class AllplayersComponent implements OnInit {

  players;

  constructor(private playerSer: PlayersDataService) { }

  ngOnInit() {

    this.playerSer.getPlayer().subscribe(players => this.players = players);
  }

}
