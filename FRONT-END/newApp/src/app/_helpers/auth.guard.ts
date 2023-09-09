import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
        private httpClient: HttpClient
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token');
        console.log("token ", token)
        if (token) {
            this.httpClient.post<String>("http://localhost:3000/token", { token }, { responseType: "json" }).subscribe(
                (response: any) => {
                    console.log("response ",response);
                    if (response.valid)
                        return true;
                    else
                        return false;
                },
                (error) => {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
            );
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);
        return false;
    }
}