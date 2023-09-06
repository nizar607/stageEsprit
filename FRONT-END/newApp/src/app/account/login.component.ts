import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';
import { User } from '../_models';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register.component';
import { UserService } from '../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private userService: UserService,
        private alertService: AlertService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f['email'].value, this.f['password'].value)
        .pipe(first())
        .subscribe({
            next: (response) => {
                // Extract the user and token from the response
                const user = response;
                const token = response.token;
                
                console.log (user);
                console.log("Login success");
                if (user.type == "company") {
                    this.router.navigate(['/company']);
                }else if (user.type == "user") {
                    this.router.navigate(['/user']);
                }

                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
                // Store user details and token in local storage or elsewhere as needed
                localStorage.setItem('token', "fake token");
    
            },
            error: error => {
                console.log("Login error");
                this.alertService.error("Email or password is incorrect");
                this.loading = false;
            }
        });
    
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(RegisterComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    closeDialog(): void {
        const dialogRef = this.dialog.open(RegisterComponent);
        dialogRef.close();
    }
}