import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
    selector: 'app-synopsis',
    templateUrl: './synopsis.component.html',
    styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

    constructor(

        /**
         * uses Inject to get movie info from the movie object
         */
        public fetchApiDataService: FetchApiDataService,
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
