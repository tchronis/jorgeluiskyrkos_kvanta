import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBank } from 'app/shared/model/bank.model';
import { Principal } from 'app/core';
import { BankService } from './bank.service';

@Component({
    selector: 'jhi-bank',
    templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit, OnDestroy {
    banks: IBank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankService: BankService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bankService.query().subscribe(
            (res: HttpResponse<IBank[]>) => {
                this.banks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBank) {
        return item.id;
    }

    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe('bankListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
