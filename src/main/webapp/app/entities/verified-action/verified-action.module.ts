import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JorgeluiskyrkosSharedModule } from 'app/shared';
import {
    VerifiedActionComponent,
    VerifiedActionDetailComponent,
    VerifiedActionUpdateComponent,
    VerifiedActionDeletePopupComponent,
    VerifiedActionDeleteDialogComponent,
    verifiedActionRoute,
    verifiedActionPopupRoute
} from './';

const ENTITY_STATES = [...verifiedActionRoute, ...verifiedActionPopupRoute];

@NgModule({
    imports: [JorgeluiskyrkosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VerifiedActionComponent,
        VerifiedActionDetailComponent,
        VerifiedActionUpdateComponent,
        VerifiedActionDeleteDialogComponent,
        VerifiedActionDeletePopupComponent
    ],
    entryComponents: [
        VerifiedActionComponent,
        VerifiedActionUpdateComponent,
        VerifiedActionDeleteDialogComponent,
        VerifiedActionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JorgeluiskyrkosVerifiedActionModule {}
