import { map } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private route: Router, private auth: AngularFireAuth) {

    }

    canActivate(): Observable<boolean> {
        return this.auth.authState.pipe(map(auth => {
            if (!auth ) {
                this.route.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}
