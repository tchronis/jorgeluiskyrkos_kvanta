/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { VerifiedActionComponent } from 'app/entities/verified-action/verified-action.component';
import { VerifiedActionService } from 'app/entities/verified-action/verified-action.service';
import { VerifiedAction } from 'app/shared/model/verified-action.model';

describe('Component Tests', () => {
    describe('VerifiedAction Management Component', () => {
        let comp: VerifiedActionComponent;
        let fixture: ComponentFixture<VerifiedActionComponent>;
        let service: VerifiedActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [VerifiedActionComponent],
                providers: []
            })
                .overrideTemplate(VerifiedActionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VerifiedActionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerifiedActionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VerifiedAction(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.verifiedActions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
