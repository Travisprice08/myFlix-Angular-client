import { Component, OnInit } from '@angular/core';
import { DirectorCardComponent } from '../director-card/director-card.component';
// import { GenreCardComponent } from '../genre-card/genre-card.component';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

const user = localStorage.getItem('Username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {

  movies: any[] = [];

  constructor(
    public userRegistrationService: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.userRegistrationService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // openGenre(Name: string, Description: string): void {
  //   this.dialog.open(GenreCardComponent, {
  //     data: { Name, Description },
  //     width: '500px'
  //   });
  // }

  // openGenre(Name: string, Description: string): void {
  //   this.userRegistrationService.getGenre().subscribe((resp: any) => {
  //     this.genre = resp;
  //     console.log(this.genre);
  //     return this.genre;
  //   });
  // }

  openDirector(Name: string, Bio: string, Birthday: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio, Birthday },
      width: '500px'
    });
  }

  // openDirector(Name: string, Bio: string, Birthday: number): void {
  //   this.userRegistrationService.getDirector().subscribe((resp: any) => {
  //     this.director = resp;
  //     console.log(this.director);
  //     return this.director;
  //   });
  // }

}
