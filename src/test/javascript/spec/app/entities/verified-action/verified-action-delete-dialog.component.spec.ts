/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { VerifiedActionDeleteDialogComponent } from 'app/entities/verified-action/verified-action-delete-dialog.component';
import { VerifiedActionService } from 'app/entities/verified-action/verified-action.service';

describe('Component Tests', () => {
    describe('VerifiedAction Management Delete Component', () => {
        let comp: VerifiedActionDeleteDialogComponent;
        let fixture: ComponentFixture<VerifiedActionDeleteDialogComponent>;
        let service: VerifiedActionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [VerifiedActionDeleteDialogComponent]
            })
                .overrideTemplate(VerifiedActionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VerifiedActionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerifiedActionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
