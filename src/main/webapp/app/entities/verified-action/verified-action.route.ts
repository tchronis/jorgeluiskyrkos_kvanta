import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { VerifiedAction } from 'app/shared/model/verified-action.model';
import { VerifiedActionService } from './verified-action.service';
import { VerifiedActionComponent } from './verified-action.component';
import { VerifiedActionDetailComponent } from './verified-action-detail.component';
import { VerifiedActionUpdateComponent } from './verified-action-update.component';
import { VerifiedActionDeletePopupComponent } from './verified-action-delete-dialog.component';
import { IVerifiedAction } from 'app/shared/model/verified-action.model';

@Injectable({ providedIn: 'root' })
export class VerifiedActionResolve implements Resolve<IVerifiedAction> {
    constructor(private service: VerifiedActionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((verifiedAction: HttpResponse<VerifiedAction>) => verifiedAction.body);
        }
        return Observable.of(new VerifiedAction());
    }
}

export const verifiedActionRoute: Routes = [
    {
        path: 'verified-action',
        component: VerifiedActionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.verifiedAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'verified-action/:id/view',
        component: VerifiedActionDetailComponent,
        resolve: {
            verifiedAction: VerifiedActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.verifiedAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'verified-action/new',
        component: VerifiedActionUpdateComponent,
        resolve: {
            verifiedAction: VerifiedActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.verifiedAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'verified-action/:id/edit',
        component: VerifiedActionUpdateComponent,
        resolve: {
            verifiedAction: VerifiedActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.verifiedAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const verifiedActionPopupRoute: Routes = [
    {
        path: 'verified-action/:id/delete',
        component: VerifiedActionDeletePopupComponent,
        resolve: {
            verifiedAction: VerifiedActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.verifiedAction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
