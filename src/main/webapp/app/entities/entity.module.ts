import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JorgeluiskyrkosActionModule } from './action/action.module';
import { JorgeluiskyrkosOrganizationModule } from './organization/organization.module';
import { JorgeluiskyrkosBankModule } from './bank/bank.module';
import { JorgeluiskyrkosVerifiedActionModule } from './verified-action/verified-action.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JorgeluiskyrkosActionModule,
        JorgeluiskyrkosOrganizationModule,
        JorgeluiskyrkosBankModule,
        JorgeluiskyrkosVerifiedActionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JorgeluiskyrkosEntityModule {}
