import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
    selector: 'app-genre-card',
    templateUrl: './genre-card.component.html',
    styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

    genres: any = {};

    constructor(
        public userRegistrationService: UserRegistrationService,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            Name: string;
            Description: string;
        }
    ) { }

    ngOnInit(): void {
        this.getGenreInfo
    }

    getGenreInfo(): void {
        this.userRegistrationService.getGenre().subscribe((response: any) => {
            this.genres = response;
            console.log(this.genres);
            return this.genres
        })
    }

}
