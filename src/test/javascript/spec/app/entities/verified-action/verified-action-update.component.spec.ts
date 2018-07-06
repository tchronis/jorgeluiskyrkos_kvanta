/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { VerifiedActionUpdateComponent } from 'app/entities/verified-action/verified-action-update.component';
import { VerifiedActionService } from 'app/entities/verified-action/verified-action.service';
import { VerifiedAction } from 'app/shared/model/verified-action.model';

describe('Component Tests', () => {
    describe('VerifiedAction Management Update Component', () => {
        let comp: VerifiedActionUpdateComponent;
        let fixture: ComponentFixture<VerifiedActionUpdateComponent>;
        let service: VerifiedActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [VerifiedActionUpdateComponent]
            })
                .overrideTemplate(VerifiedActionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VerifiedActionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerifiedActionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VerifiedAction(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.verifiedAction = entity;
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
                    const entity = new VerifiedAction();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.verifiedAction = entity;
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
