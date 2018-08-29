import { map } from 'rxjs/operators';

import { Player } from './../../models/player';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';



@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  selectedPic: File = null;

  player: Player = {
    name: '',
    last_name:'',
    pos: '',
    batting: 0,
    hits: 0,
    error: 0,
    singles : 0,
    doubles: 0,
    triples: 0,
    hrs: 0,
    rbis: 0,
    dob: '',
    number: 0,
    atbat: 0,
    last_at_bat: '',
    picture: ''
  }

  positions = ['1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf', 'c', 'p', 'dh', 'ah', 'bench'];

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;
  nameFile: string = ''

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit() {

  }


  onUpload(event) {
    const id = Math.random().toString(36).substring(2);
    let file = <File>event.target.files[0];
    let name = file.name;

    // this.task = this.afStorage.upload('img/'+id, event.target.files[0]);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // console.log(this.uploadState);
    
    // console.log(this.task);
    // this.snapshot = this.task.snapshotChanges();
    // console.log(this.snapshot);
    // this.uploadProgress = this.task.percentageChanges();
    // console.log(this.uploadProgress);
    let reference = this.afStorage.ref('img/' + name);
    this.task = reference.put(file);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then( snap => snap.ref.getDownloadURL().then(a => this.downloadURL = a));

  }

}
