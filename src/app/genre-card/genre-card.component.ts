// import { Component, OnInit, Inject, Input } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UserRegistrationService } from '../fetch-api-data.service';

// @Component({
//   selector: 'app-genre-card',
//   templateUrl: './genre-card.component.html',
//   styleUrls: ['./genre-card.component.scss']
// })
// export class GenreCardComponent implements OnInit {

//   genre: any[] = [];

//   constructor(
//     public userRegistrationService: UserRegistrationService,
//     @Inject(MAT_DIALOG_DATA)
//     public data: {
//       Name: string;
//       Description: string;
//     }
//   ) { }

//   ngOnInit(): void {
//     this.getGenre
//   }

//   getGenre(): void {
//     this.userRegistrationService.getGenre().subscribe((response: any) => {
//       this.genre = response;
//       console.log('genre');
//       return this.genre
//     })
//   }

// }
