import { Component, OnInit } from '@angular/core';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
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
    public fetchApiDataService: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * When component is opened
   * Fetches movies, user info, and favorites
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens genre dialog
   * @param id - get genre id from movie object
   * @returns - data based on genre id
   */
  openGenre(id: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { id },
      width: '500px'
    });
  }

  /**
   * Opens director dialog
   * @param id - get director id from movie object
   * @returns - data based on director id
   */
  openDirector(id: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { id },
      width: '500px'
    });
  }

  /**
   * Opens synopsis dialog
   * @param Title 
   * @param imageUrl 
   * @param Description 
   */
  openSynopsis(Title: string, imageUrl: any, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Title, imageUrl, Description },
      width: '500px'
    });
  }

  /**
   * Gets list of users favorites
   */
  getUsersFavs(): void {
    this.fetchApiDataService.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      // console.log(this.favorites, 'My favorites');
      return this.favorites;
    })
  }

  /**
   * Adds the movie id to favorites
   * @param id 
   * @param Title 
   * @returns - success message
   */
  addToUserFavorites(id: string, Title: string): void {
    this.fetchApiDataService.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * Removes movie id from favorites
   * @param id 
   * @param Title 
   * @returns - succes message
   */
  removeFromUserFavorites(id: string, Title: string): void {
    this.fetchApiDataService.removeFromFavoriteMovies(id).subscribe((resp: any) => {
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
