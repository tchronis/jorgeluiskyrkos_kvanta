/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { BankDeleteDialogComponent } from 'app/entities/bank/bank-delete-dialog.component';
import { BankService } from 'app/entities/bank/bank.service';

describe('Component Tests', () => {
    describe('Bank Management Delete Component', () => {
        let comp: BankDeleteDialogComponent;
        let fixture: ComponentFixture<BankDeleteDialogComponent>;
        let service: BankService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [BankDeleteDialogComponent]
            })
                .overrideTemplate(BankDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankService);
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
