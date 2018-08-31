import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Player } from './../../models/player';
import { PlayersDataService } from './../../services/players-data.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  id: string;
  currentRoute = '';
  locationURL: string;

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
    avg: 0,
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

  numberTaken: boolean;

  constructor( private afStorage: AngularFireStorage, private route: ActivatedRoute, private router: Router, private message: ToastrService, private playerServ: PlayersDataService, public location: Location) {
    router.events.subscribe(url => {
      if (location.path() !== '') {
        this.locationURL = location.path();
      } else {
        this.locationURL = '';
      }
    });
   }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.playerServ.getPlayer(this.id).subscribe(player => this.player = player);
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);

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

 
  
  console.log(this.numberTaken);
  
  if (!valid || this.numberTaken) {
    // add error
      console.log('error');
      this.message.error('Please pick another number', 'Number Taken');
      document.getElementById('number').classList.add('is-invalid');
      
      return;

  } else {

    let hits = this.player.singles + this.player.doubles + this.player.triples + this.player.hrs;
    this.player.hits = hits;
    let avg = (hits / this.player.atbat) * 1000;
    this.player.avg = avg;

    this.playerServ.updatePlayer(this.player);
    this.router.navigate([`player-details/${this.id}`]);
    this.message.success('Player has been updated...', 'Updated!' );

  }
}


checkNumber(event) {
  let num = event.target.value;
  
    this.playerServ.getPlayers()
    .subscribe(p => p.forEach(pl => {
      
      if ( pl.number == num) {
      this.numberTaken = true;
      document.getElementById('number').classList.add('is-invalid');
      this.message.error(`The number ${num} is already taken by ${pl.name.toUpperCase()} ${pl.last_name.toUpperCase()}`);
     
      } 

    }))

    if (this.numberTaken) {
      this.numberTaken = false;
      document.getElementById('number').classList.remove('is-invalid');
     
    }

    
    
    

}



}
