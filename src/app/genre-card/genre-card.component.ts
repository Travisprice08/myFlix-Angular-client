import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
    selector: 'app-genre-card',
    templateUrl: './genre-card.component.html',
    styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

    genres: any = [];

    constructor(
        public userRegistrationService: UserRegistrationService,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            id: string;
            // Name: string;
            // Description: string;
        }
    ) { }

    ngOnInit(): void {
        this.getGenreInfo(this.data.id);
    }

    getGenreInfo(id: string): void {
        this.userRegistrationService.getGenre(id).subscribe((response: any) => {
            console.log(response, 'Genre info')
            this.genres = response;
            console.log(this.genres);
            return this.genres
        })
    }

}
