import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVerifiedAction } from 'app/shared/model/verified-action.model';

@Component({
    selector: 'jhi-verified-action-detail',
    templateUrl: './verified-action-detail.component.html'
})
export class VerifiedActionDetailComponent implements OnInit {
    verifiedAction: IVerifiedAction;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ verifiedAction }) => {
            this.verifiedAction = verifiedAction;
        });
    }

    previousState() {
        window.history.back();
    }
}
