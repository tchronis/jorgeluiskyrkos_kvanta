import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, Principal, Account } from 'app/core';
import { Subscription } from 'rxjs';

import { IAction } from 'app/shared/model/action.model';
import { HomeModalContentComponent } from 'app/home/home-modal.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HomeService } from './home.service';

// const DONATORS: IDonator[] = [
//     {
//         name: 'Austin Moore',
//         amount: 142,
//         date: '06-19-19'
//     },
//     {
//         name: 'Salvador Mccormick',
//         amount: 191,
//         date: '04-23-20'
//     },
//     {
//         name: 'Olivia Martinez',
//         amount: 113,
//         date: '06-03-20'
//     },
//     {
//         name: 'Suki Weiss',
//         amount: 157,
//         date: '06-06-19'
//     },
//     {
//         name: 'Tanya Willis',
//         amount: 186,
//         date: '12-12-19'
//     },
//     {
//         name: 'Rudyard Martinez',
//         amount: 140,
//         date: '01-01-20'
//     },
//     {
//         name: 'Aubrey Carpenter',
//         amount: 158,
//         date: '04-04-20'
//     },
//     {
//         name: 'Halee Stevens',
//         amount: 75,
//         date: '11-01-20'
//     },
//     {
//         name: 'Amal Lindsey',
//         amount: 160,
//         date: '05-05-20'
//     },
//     {
//         name: 'Slade Barnes',
//         amount: 58,
//         date: '04-01-20'
//     },
//     {
//         name: 'Uta Little',
//         amount: 123,
//         date: '12-04-20'
//     },
//     {
//         name: 'Noble Finley',
//         amount: 156,
//         date: '06-08-19'
//     },
//     {
//         name: 'Amy Robertson',
//         amount: 163,
//         date: '05-05-20'
//     },
//     {
//         name: 'Lucian Lynch',
//         amount: 164,
//         date: '05-05-20'
//     },
//     {
//         name: 'Palmer Finley',
//         amount: 111,
//         date: '06-06-19'
//     },
//     {
//         name: 'Serina Beard',
//         amount: 186,
//         date: '08-09-19'
//     },
//     {
//         name: 'Denise Whitley',
//         amount: 135,
//         date: '07-07-19'
//     },
//     {
//         name: 'Lael Barber',
//         amount: 140,
//         date: '01-09-19'
//     },
//     {
//         name: 'Gabriel Copeland',
//         amount: 178,
//         date: '06-09-19'
//     },
//     {
//         name: 'Allegra Baker',
//         amount: 83,
//         date: '02-02-20'
//     },
//     {
//         name: 'Desiree Peck',
//         amount: 107,
//         date: '08-08-19'
//     },
//     {
//         name: 'Barry George',
//         amount: 169,
//         date: '05-05-19'
//     },
//     {
//         name: 'Tanya Chavez',
//         amount: 196,
//         date: '04-10-19'
//     },
//     {
//         name: 'Yetta May',
//         amount: 149,
//         date: '05-12-19'
//     },
//     {
//         name: 'Philip Spears',
//         amount: 59,
//         date: '01-05-20'
//     },
//     {
//         name: 'Gay Dillard',
//         amount: 53,
//         date: '10-10-19'
//     },
//     {
//         name: 'Vivien Morales',
//         amount: 61,
//         date: '02-02-20'
//     },
//     {
//         name: 'Jermaine Weaver',
//         amount: 66,
//         date: '07-07-19'
//     },
//     {
//         name: 'Rama Velez',
//         amount: 158,
//         date: '08-09-19'
//     },
//     {
//         name: 'Halla Warren',
//         amount: 125,
//         date: '07-06-19'
//     },
//     {
//         name: 'Barry Cooke',
//         amount: 148,
//         date: '02-05-20'
//     },
//     {
//         name: 'Phelan Sandoval',
//         amount: 74,
//         date: '04-05-19'
//     },
//     {
//         name: 'Jasmine Gillespie',
//         amount: 79,
//         date: '03-12-19'
//     },
//     {
//         name: 'Morgan Wooten',
//         amount: 142,
//         date: '05-06-19'
//     },
//     {
//         name: 'Sheila Price',
//         amount: 123,
//         date: '01-09-19'
//     },
//     {
//         name: 'Olivia Giles',
//         amount: 85,
//         date: '04-04-20'
//     },
//     {
//         name: 'Oscar Sweeney',
//         amount: 190,
//         date: '05-11-19'
//     },
//     {
//         name: 'Ora Ford',
//         amount: 133,
//         date: '07-07-19'
//     },
//     {
//         name: 'Shoshana Vega',
//         amount: 118,
//         date: '07-07-19'
//     },
//     {
//         name: 'Veronica Goff',
//         amount: 84,
//         date: '09-10-19'
//     },
//     {
//         name: 'Amal Garrett',
//         amount: 198,
//         date: '01-10-19'
//     },
//     {
//         name: 'Candice Collins',
//         amount: 190,
//         date: '07-02-20'
//     },
//     {
//         name: 'Jerry Morales',
//         amount: 194,
//         date: '07-02-20'
//     },
//     {
//         name: 'Ray Maxwell',
//         amount: 168,
//         date: '06-07-19'
//     },
//     {
//         name: 'Fleur Lopez',
//         amount: 199,
//         date: '06-06-19'
//     },
//     {
//         name: 'Alika Clay',
//         amount: 62,
//         date: '12-07-19'
//     },
//     {
//         name: 'Walker Hoover',
//         amount: 127,
//         date: '11-07-19'
//     },
//     {
//         name: 'Kermit Rosales',
//         amount: 77,
//         date: '01-11-19'
//     },
//     {
//         name: 'Brennan Pearson',
//         amount: 130,
//         date: '10-11-19'
//     },
//     {
//         name: 'Ivor Stanley',
//         amount: 143,
//         date: '06-11-19'
//     },
//     {
//         name: 'Xena Duncan',
//         amount: 181,
//         date: '09-07-19'
//     }
// ];

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    // donaators = DONATORS;
    donators: IAction[];
    eventSubscriber: Subscription;
    donatorsCounter: number;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private homeService: HomeService
    ) {}

    loadAll() {
        this.homeService.query().subscribe(
            (res: HttpResponse<IAction[]>) => {
                this.donators = res.body;
                this.donatorsCounter = this.countDonators();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    // totalDonations() {
    //     let sum = 0;
    //     for (let i = 0; i < this.donators.length; i++) {
    //         sum = sum + this.donators[i].amount;
    //     }
    //     return sum;
    // }

    countDonators() {
        let count = 0;
        for (let i = 0; i < this.donators.length; i++) {
            if (this.donators[i].verified) {
                count++;
            }
        }
        return count;
    }

    open() {
        const modalRef = this.modalService.open(HomeModalContentComponent);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
