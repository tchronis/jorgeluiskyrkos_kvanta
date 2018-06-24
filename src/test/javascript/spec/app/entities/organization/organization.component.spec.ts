/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JorgeluiskyrkosTestModule } from '../../../test.module';
import { OrganizationComponent } from 'app/entities/organization/organization.component';
import { OrganizationService } from 'app/entities/organization/organization.service';
import { Organization } from 'app/shared/model/organization.model';

describe('Component Tests', () => {
    describe('Organization Management Component', () => {
        let comp: OrganizationComponent;
        let fixture: ComponentFixture<OrganizationComponent>;
        let service: OrganizationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JorgeluiskyrkosTestModule],
                declarations: [OrganizationComponent],
                providers: []
            })
                .overrideTemplate(OrganizationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganizationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Organization(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.organizations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
