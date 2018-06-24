/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { ActionDetailComponent } from 'app/entities/action/action-detail.component';
import { Action } from 'app/shared/model/action.model';

describe('Component Tests', () => {
    describe('Action Management Detail Component', () => {
        let comp: ActionDetailComponent;
        let fixture: ComponentFixture<ActionDetailComponent>;
        const route = ({ data: of({ action: new Action(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [ActionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ActionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.action).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
