import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBank } from 'app/shared/model/bank.model';
import { BankService } from './bank.service';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization';

@Component({
    selector: 'jhi-bank-update',
    templateUrl: './bank-update.component.html'
})
export class BankUpdateComponent implements OnInit {
    private _bank: IBank;
    isSaving: boolean;

    organizations: IOrganization[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bankService: BankService,
        private organizationService: OrganizationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganization[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(this.bankService.create(this.bank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBank>>) {
        result.subscribe((res: HttpResponse<IBank>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }
    get bank() {
        return this._bank;
    }

    set bank(bank: IBank) {
        this._bank = bank;
    }
}
