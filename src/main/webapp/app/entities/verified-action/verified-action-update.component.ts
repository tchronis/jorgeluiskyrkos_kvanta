import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IVerifiedAction } from 'app/shared/model/verified-action.model';
import { VerifiedActionService } from './verified-action.service';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action';
import { IBank } from 'app/shared/model/bank.model';
import { BankService } from 'app/entities/bank';

@Component({
    selector: 'jhi-verified-action-update',
    templateUrl: './verified-action-update.component.html'
})
export class VerifiedActionUpdateComponent implements OnInit {
    private _verifiedAction: IVerifiedAction;
    isSaving: boolean;

    actions: IAction[];

    banks: IBank[];
    dateInstant: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private verifiedActionService: VerifiedActionService,
        private actionService: ActionService,
        private bankService: BankService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ verifiedAction }) => {
            this.verifiedAction = verifiedAction;
        });
        this.actionService.query({ filter: 'verifiedaction-is-null' }).subscribe(
            (res: HttpResponse<IAction[]>) => {
                if (!this.verifiedAction.action || !this.verifiedAction.action.id) {
                    this.actions = res.body;
                } else {
                    this.actionService.find(this.verifiedAction.action.id).subscribe(
                        (subRes: HttpResponse<IAction>) => {
                            this.actions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.bankService.query({ filter: 'verifiedaction-is-null' }).subscribe(
            (res: HttpResponse<IBank[]>) => {
                if (!this.verifiedAction.bank || !this.verifiedAction.bank.id) {
                    this.banks = res.body;
                } else {
                    this.bankService.find(this.verifiedAction.bank.id).subscribe(
                        (subRes: HttpResponse<IBank>) => {
                            this.banks = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.verifiedAction.dateInstant = moment(this.dateInstant, DATE_TIME_FORMAT);
        if (this.verifiedAction.id !== undefined) {
            this.subscribeToSaveResponse(this.verifiedActionService.update(this.verifiedAction));
        } else {
            this.subscribeToSaveResponse(this.verifiedActionService.create(this.verifiedAction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVerifiedAction>>) {
        result.subscribe((res: HttpResponse<IVerifiedAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackActionById(index: number, item: IAction) {
        return item.id;
    }

    trackBankById(index: number, item: IBank) {
        return item.id;
    }
    get verifiedAction() {
        return this._verifiedAction;
    }

    set verifiedAction(verifiedAction: IVerifiedAction) {
        this._verifiedAction = verifiedAction;
        this.dateInstant = moment(verifiedAction.dateInstant).format(DATE_TIME_FORMAT);
    }
}
