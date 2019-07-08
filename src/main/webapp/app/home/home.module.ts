import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JorgeluiskyrkosSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';

import { HomeModalContentComponent } from 'app/home/home-modal.component';
import { FilteredDonatorsPipe } from 'app/home/home.pipe';

@NgModule({
    imports: [JorgeluiskyrkosSharedModule, RouterModule.forChild([HOME_ROUTE]), BrowserModule, NgbModule],
    declarations: [HomeComponent, FilteredDonatorsPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [HomeModalContentComponent]
})
export class JorgeluiskyrkosHomeModule {}
