import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const user = localStorage.getItem('username');

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    user: any = {};
    favorites: any = [];
    movies: any[] = [];
    favs: any[] = [];
    genres: any = [];
    directors: any = [];

    constructor(
        public userRegistrationServices: UserRegistrationService,
        public router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.getMovies();
        this.getUsersFavs();

    }

    getMovies(): void {
        this.userRegistrationServices.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            // console.log(resp, 'fav movies');
            return this.filterFavorites();
            // return this.movies
        })
    }

    openGenre(id: string): void {
        this.dialog.open(GenreCardComponent, {
            data: { id },
            width: '500px'
        });
    }

    openDirector(id: string): void {
        this.dialog.open(DirectorCardComponent, {
            data: { id },
            width: '500px'
        });
    }

    openSynopsis(Title: string, imageUrl: any, Description: string): void {
        this.dialog.open(SynopsisComponent, {
            data: { Title, imageUrl, Description },
            width: '500px'
        });
    }


    getUsersFavs(): void {
        this.userRegistrationServices.getUser(user).subscribe((resp: any) => {
            this.favs = resp.FavoriteMovies;
            console.log(resp, 'favs');
            return this.favs;
        })
    }

    filterFavorites(): void {
        this.favs.forEach((movie: any) => {
            if (this.favs.includes(movie._id)) {
                this.favorites.push(movie);
            }
            // console.log(this.favorites, 'favorites');
        });
        return this.favorites;
    }

    addToUserFavorites(id: string, Title: string): void {
        this.userRegistrationServices.addToFavoriteMovies(id).subscribe((resp: any) => {
            this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
                duration: 3000,
            });
            return this.getUsersFavs();
        })
    }

    removeFromUserFavorites(id: string, Title: string): void {
        this.userRegistrationServices.removeFromFavoriteMovies(id).subscribe((resp: any) => {
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
