/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { BankUpdateComponent } from 'app/entities/bank/bank-update.component';
import { BankService } from 'app/entities/bank/bank.service';
import { Bank } from 'app/shared/model/bank.model';

describe('Component Tests', () => {
    describe('Bank Management Update Component', () => {
        let comp: BankUpdateComponent;
        let fixture: ComponentFixture<BankUpdateComponent>;
        let service: BankService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [BankUpdateComponent]
            })
                .overrideTemplate(BankUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Bank(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bank = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Bank();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bank = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
