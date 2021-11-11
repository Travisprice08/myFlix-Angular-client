import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    favoriteMovies: any = [];
    favs: any[] = [];
    movie: any[] = [];
    genres: any = [];
    directors: any = [];

    constructor(
        public fetchApiDataService: FetchApiDataService,
        public router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            id: string;
        }
    ) { }

    ngOnInit(): void {
        this.getUsersFavs();
        // this.getMovies();
        setTimeout(() => {
            this.getMovies()
        }, 1000);

    }

    getMovies(): void {
        this.fetchApiDataService.getAllMovies().subscribe((resp: any) => {
            this.favs = resp;
            console.log(this.favs, 'all movies');
            return this.filterFavorites();
            // return this.movie
        })
    }


    getUsersFavs(): void {
        this.fetchApiDataService.getUser(user).subscribe((resp: any) => {
            this.favorites = resp.FavoriteMovies;
            console.log(this.favorites, 'My favorites');
            return this.favorites;
        })
    }

    filterFavorites(): void {
        console.log(this.favs, 'favs')
        console.log(this.favorites, 'favorites')


        this.favs.forEach((movie: any) => {
            if (this.favorites.includes(movie._id)) {
                this.favoriteMovies.push(movie);
                console.log(movie)
            }

        });
        console.log(this.favoriteMovies, 'filtered');
        return this.favoriteMovies;
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

    // openFavorites(id: string): void {
    //     this.fetchApiDataService.getFavoriteMovies(id).subscribe((response: any) => {
    //         this.favs = response;
    //         console.log(this.favs, 'openFavorites');
    //         return this.favs
    //     })
    // }

    addToUserFavorites(id: string, Title: string): void {
        this.fetchApiDataService.addToFavoriteMovies(id).subscribe((resp: any) => {
            this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
                duration: 3000,
            });
            return this.getUsersFavs();
        })
    }

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
        if (this.favorites.includes(id)) {
            return true;
        } else {
            return false;
        }
    }

}
