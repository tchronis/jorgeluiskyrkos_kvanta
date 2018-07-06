/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { ActionDeleteDialogComponent } from 'app/entities/action/action-delete-dialog.component';
import { ActionService } from 'app/entities/action/action.service';

describe('Component Tests', () => {
    describe('Action Management Delete Component', () => {
        let comp: ActionDeleteDialogComponent;
        let fixture: ComponentFixture<ActionDeleteDialogComponent>;
        let service: ActionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [ActionDeleteDialogComponent]
            })
                .overrideTemplate(ActionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActionService);
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
