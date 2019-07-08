import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAction } from 'app/shared/model/action.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ActionService } from './action.service';

@Component({
    selector: 'jhi-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent implements OnInit {
    private _action: IAction;
    isSaving: boolean;

    constructor(private dataUtils: JhiDataUtils, private actionService: ActionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(this.actionService.update(this.action));
        } else {
            this.subscribeToSaveResponse(this.actionService.create(this.action));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
        result.subscribe((res: HttpResponse<IAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    get action() {
        return this._action;
    }

    set action(action: IAction) {
        this._action = action;
    }
}
