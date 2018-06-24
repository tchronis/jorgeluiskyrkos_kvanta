import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVerifiedAction } from 'app/shared/model/verified-action.model';
import { VerifiedActionService } from './verified-action.service';

@Component({
    selector: 'jhi-verified-action-delete-dialog',
    templateUrl: './verified-action-delete-dialog.component.html'
})
export class VerifiedActionDeleteDialogComponent {
    verifiedAction: IVerifiedAction;

    constructor(
        private verifiedActionService: VerifiedActionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.verifiedActionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'verifiedActionListModification',
                content: 'Deleted an verifiedAction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-verified-action-delete-popup',
    template: ''
})
export class VerifiedActionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ verifiedAction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VerifiedActionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.verifiedAction = verifiedAction;
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
