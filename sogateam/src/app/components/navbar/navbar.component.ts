import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from './../../services/authservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MzNavbarModule } from 'ngx-materialize'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  currentUserName: string;
  curretnUserEmail: string;

  constructor( private router: Router,
               private auth: AuthserviceService,
              private msg: ToastrService ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      if (auth ) {
        this.loggedIn = true;
        this.currentUserName = auth.displayName;
        this.curretnUserEmail = auth.email;
      } else {
        this.loggedIn = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}
