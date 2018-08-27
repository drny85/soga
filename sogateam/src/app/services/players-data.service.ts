import { Player } from './../models/player';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {

  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  playerDoc: AngularFirestoreDocument<Player>;

  constructor(private afs: AngularFirestore) { 
    this.getPlayer();
  }

  getPlayer() {
    this.playersCollection = this.afs.collection<Player>('players', ref => ref.orderBy('name', 'asc'));

      this.players = this.playersCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Player;
          data.id = a.payload.doc.id;
          return data;
        }))
      );

      return this.players;
  }


  addPlayer(player: Player) {
    this.playersCollection.add(player);
  }

}
