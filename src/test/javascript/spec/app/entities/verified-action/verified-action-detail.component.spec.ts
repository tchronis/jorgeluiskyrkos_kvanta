/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { VerifiedActionDetailComponent } from 'app/entities/verified-action/verified-action-detail.component';
import { VerifiedAction } from 'app/shared/model/verified-action.model';

describe('Component Tests', () => {
    describe('VerifiedAction Management Detail Component', () => {
        let comp: VerifiedActionDetailComponent;
        let fixture: ComponentFixture<VerifiedActionDetailComponent>;
        const route = ({ data: of({ verifiedAction: new VerifiedAction(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [VerifiedActionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VerifiedActionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VerifiedActionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.verifiedAction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
