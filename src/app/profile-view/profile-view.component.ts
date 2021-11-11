import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  /**
   * Gets the user information when component is opened
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches user info from api
   */
  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiDataService.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * Opens dialog to edit user info
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px'
    })
  }

}
