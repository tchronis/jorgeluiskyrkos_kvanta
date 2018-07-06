import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBank } from 'app/shared/model/bank.model';

@Component({
    selector: 'jhi-bank-detail',
    templateUrl: './bank-detail.component.html'
})
export class BankDetailComponent implements OnInit {
    bank: IBank;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
    }

    previousState() {
        window.history.back();
    }
}
