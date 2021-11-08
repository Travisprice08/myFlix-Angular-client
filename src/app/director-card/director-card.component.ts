import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
    selector: 'app-director-card',
    templateUrl: './director-card.component.html',
    styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

    directors: any = [];

    constructor(


        public userRegistrationService: UserRegistrationService,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            id: string;
        }
    ) { }

    ngOnInit(): void {
        this.getDirectorInfo(this.data.id);
    }

    getDirectorInfo(id: string): void {
        this.userRegistrationService.getDirector(id).subscribe((response: any) => {
            this.directors = response;
            // console.log(this.directors);
            return this.directors;
        });

    }


}
