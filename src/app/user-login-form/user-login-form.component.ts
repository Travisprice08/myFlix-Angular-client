import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '' }

  constructor(
    public userRegistrationService: UserRegistrationService,
    public router: Router,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.userRegistrationService.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('token', response.token);
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}