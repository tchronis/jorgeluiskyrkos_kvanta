import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVerifiedAction } from 'app/shared/model/verified-action.model';
import { Principal } from 'app/core';
import { VerifiedActionService } from './verified-action.service';

@Component({
    selector: 'jhi-verified-action',
    templateUrl: './verified-action.component.html'
})
export class VerifiedActionComponent implements OnInit, OnDestroy {
    verifiedActions: IVerifiedAction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private verifiedActionService: VerifiedActionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.verifiedActionService.query().subscribe(
            (res: HttpResponse<IVerifiedAction[]>) => {
                this.verifiedActions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVerifiedActions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVerifiedAction) {
        return item.id;
    }

    registerChangeInVerifiedActions() {
        this.eventSubscriber = this.eventManager.subscribe('verifiedActionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
