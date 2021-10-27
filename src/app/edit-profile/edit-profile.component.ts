import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

// Make sure to change this in other components
export class EditProfileComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  }

  constructor(
    public userRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  editProfile(): void {
    // Check editUserProfile
    this.userRegistrationService.editUserProfile(this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Account successfully updated!', {
        duration: 2000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
}
