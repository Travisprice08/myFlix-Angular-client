import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
    selector: 'app-director-card',
    templateUrl: './director-card.component.html',
    styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

    director: any[] = [];

    constructor(


        public userRegistrationService: UserRegistrationService,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            Name: string,
            Bio: string,
            Birthday: number,
        }
    ) { }

    ngOnInit(): void {
        this.getDirectorInfo
    }

    getDirectorInfo(Name: string, Bio: string, Birthday: number): void {
        this.userRegistrationService.getDirector().subscribe((response: any) => {
            this.director = response;
            console.log('director');
            return this.director

        })
    }

}
