import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

// Make sure to change this in other components
export class EditProfileComponent implements OnInit {

  username: any = {};

  /**
   * Required fields for updating user info
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  }

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Edits user info
   */
  editProfile(): void {
    this.fetchApiDataService.editUserProfile(this.userData).subscribe((res) => {
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
