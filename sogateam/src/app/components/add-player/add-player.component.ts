import { PlayersDataService } from './../../services/players-data.service';
import { Router } from '@angular/router';
import { Player } from './../../models/player';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})

export class AddPlayerComponent implements OnInit {

  btnSuccess: string = 'Add Picture'; // to changes button text to upload picture
  imageUpload: string = 'Upload Image';

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
    outs: 0,
    dob: '',
    bb: 0, // base on balls
    hidp: 0, // hit into double play
    ko: 0, // strike outs
    fo: 0, //force outs
    number: 0, // jersey number
    atbat: 0,
    phone: '',
    email: '',
    last_at_bat: '',
    picture: '',
    address: {
      street: '',
      apt: '',
      city: '',
      state: '',
      zipcode: ''
    }
   
  }

  positions = ['1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf', 'c', 'p', 'dh', 'ah', 'bench'];

  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;
  numberTaken = false;
  
  
  constructor(private afStorage: AngularFireStorage, private message: ToastrService, private router: Router, private playerServ: PlayersDataService) { }

  ngOnInit() {

  }


  onUpload(event) {
    
    const id = Math.random().toString(36).substring(2);
    let file = <File>event.target.files[0];
    let imagSize = file.size;
    let fileType = file.type;
    let name = file.name;
    let ext = fileType.split('/', 1);

    if (imagSize > 3000000) {

      this.message.error('File is too large', 'Error Uploading');
      return;

    } else if (ext[0] !== 'image') {
      this.message.error('Invalid File', 'Error Uploading');
      return;
    } else {

    let hits = this.player.singles + this.player.doubles + this.player.triples + this.player.hrs;
    this.player.hits = hits;
    
    let reference = this.afStorage.ref('img/' + id + '-' + name);
    this.task = reference.put(file);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then( snap => snap.ref.getDownloadURL().then(a => {this.downloadURL = a; this.player.picture = a;}));
    this.message.success('Image succesfully uploaded', 'Great');
    this.btnSuccess = 'Change Picture';
    this.imageUpload = 'Image Uploaded';
    

  }

 }

 onSubmit({value, valid}: { value: Player, valid: boolean}) {
  
  if (!valid) {
    // add error
      console.log('error');

  } else {
    // add player
   
    this.playerServ.addPlayer(this.player);
    this.router.navigate(['allplayers']);
    this.message.success('Player Added...', 'Added!' );

  }
}

// checkNumber(event) {
//   let num = event.target.value;
//   let div = <HTMLBodyElement>event.target;
//   console.log(div.parentNode);
//   console.log(div.nextElementSibling);
//   if (num == 5 ) {
//     this.numberTaken = true;
//     div.
    
  
   
// }

}


