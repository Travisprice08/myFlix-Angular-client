import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  constructor(

    public userRegistrationService: UserRegistrationService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      imageUrl: any,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
