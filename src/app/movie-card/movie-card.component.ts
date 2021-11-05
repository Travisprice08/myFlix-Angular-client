import { Component, OnInit } from '@angular/core';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { SynopsisComponent } from '../synopsis/synopsis.component';

const user = localStorage.getItem('Username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {

  movies: any[] = [];
  genres: any = [];
  directors: any = [];
  favs: any[] = [];
  favorites: any = [];

  constructor(
    public userRegistrationService: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.userRegistrationService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenre(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '500px'
    });
  }

  // openDirector(Name: string, Bio: string, Birthday: number): void {
  //   this.dialog.open(DirectorCardComponent, {
  //     data: { Name, Bio, Birthday },
  //     width: '500px'
  //   });
  // }

  openDirector(id: string): void {
    this.userRegistrationService.getDirector(id).subscribe((resp: any) => {
      this.directors = resp.data;
      console.log(this.directors);
      return this.directors;
    });

  }

  openSynopsis(Title: string, imageUrl: any, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Title, imageUrl, Description },
      width: '500px'
    });
  }

  getUsersFavs(): void {
    this.userRegistrationService.getUser(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, 'favs');
      return this.favs;
    })
  }

  addToUserFavorites(id: string, Title: string): void {
    this.userRegistrationService.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  removeFromUserFavorites(id: string, Title: string): void {
    this.userRegistrationService.removeFromFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }


}
