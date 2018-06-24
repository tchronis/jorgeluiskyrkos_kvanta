import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JorgeluiskyrkosSharedModule } from 'app/shared';
import {
    ActionComponent,
    ActionDetailComponent,
    ActionUpdateComponent,
    ActionDeletePopupComponent,
    ActionDeleteDialogComponent,
    actionRoute,
    actionPopupRoute
} from './';

const ENTITY_STATES = [...actionRoute, ...actionPopupRoute];

@NgModule({
    imports: [JorgeluiskyrkosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ActionComponent, ActionDetailComponent, ActionUpdateComponent, ActionDeleteDialogComponent, ActionDeletePopupComponent],
    entryComponents: [ActionComponent, ActionUpdateComponent, ActionDeleteDialogComponent, ActionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JorgeluiskyrkosActionModule {}
