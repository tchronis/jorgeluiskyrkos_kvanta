import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAction } from 'app/shared/model/action.model';
import { ActionService } from './action.service';

@Component({
    selector: 'jhi-action-delete-dialog',
    templateUrl: './action-delete-dialog.component.html'
})
export class ActionDeleteDialogComponent {
    action: IAction;

    constructor(private actionService: ActionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.actionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'actionListModification',
                content: 'Deleted an action'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-action-delete-popup',
    template: ''
})
export class ActionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ action }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ActionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.action = action;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
