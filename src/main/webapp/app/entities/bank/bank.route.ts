import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Bank } from 'app/shared/model/bank.model';
import { BankService } from './bank.service';
import { BankComponent } from './bank.component';
import { BankDetailComponent } from './bank-detail.component';
import { BankUpdateComponent } from './bank-update.component';
import { BankDeletePopupComponent } from './bank-delete-dialog.component';
import { IBank } from 'app/shared/model/bank.model';

@Injectable({ providedIn: 'root' })
export class BankResolve implements Resolve<IBank> {
    constructor(private service: BankService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((bank: HttpResponse<Bank>) => bank.body);
        }
        return Observable.of(new Bank());
    }
}

export const bankRoute: Routes = [
    {
        path: 'bank',
        component: BankComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank/:id/view',
        component: BankDetailComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank/new',
        component: BankUpdateComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank/:id/edit',
        component: BankUpdateComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: 'bank/:id/delete',
        component: BankDeletePopupComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jorgeluiskyrkosApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
