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
  player: Observable<Player>;

  constructor(private afs: AngularFirestore) { 
    this.getPlayers();
  }

  getPlayers() {
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

 //add a new player
  addPlayer(player: Player) {
    this.playersCollection.add(player);
  }

    // get a player
  getPlayer(id: string): Observable<Player> {
    this.playerDoc = this.afs.doc<Player>(`players/${id}`);
    this.player = this.playerDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {

        return null;

      } else {
        const data = action.payload.data() as Player;
        data.id = action.payload.id;
        return data;
      }
    }))

    return this.player;
  }

  // delete a player
  deletePlayer(id: string) {
    this.playerDoc = this.afs.doc(`players/${id}`);
    this.playerDoc.delete();
  }

  // update a Player
  updatePlayer(player: Player) {
    this.playerDoc= this.afs.doc(`players/${player.id}`);
    this.playerDoc.update(player);
  }
}
