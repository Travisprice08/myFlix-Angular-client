import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const username = localStorage.getItem('username')

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    // When uncommented, an error appears about the loader not returning a string.
    // styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
    }

    openUserProfile(): void {
        this.dialog.open(ProfileViewComponent, {
            width: '500px'
        })
        // .then(success => console.log('navigation success?', success))
        // .catch(console.error);
    }

    openAllMovies(): void {
        this.router.navigate(['/movies'])
        // .then(success => console.log('navigation success?', success))
        // .catch(console.error);
    }

    openFavorites(): void {
        this.router.navigate(['favorites'])
    }

    backToHome(): void {
        this.router.navigate(['/movies'])
            .then(success => console.log('navigation success?', success))
            .catch(console.error);
    }

    logOut(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/welcome'])
            .then(success => console.log('navigation success?', success))
            .catch(console.error);
    }
}