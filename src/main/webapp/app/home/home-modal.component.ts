import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const ORGANIZATIONS = [
    {
        name: 'Χαμόγελο του παιδιού',
        iban: 'GR8702544832402111065962522'
    },
    {
        name: 'Κιβωτός του κόσμου',
        iban: 'GR6190765661979613338457127'
    },
    {
        name: 'ΑΝΙΜΑ',
        iban: 'GR3936443266453058385938223'
    },
    {
        name: 'ΑΡΣΙΣ',
        iban: 'GR3357269008821742111161470'
    },
    {
        name: 'ΚΑΝΕ ΜΙΑ ΕΥΧΗ',
        iban: 'GR8311635939078022937700463'
    },
    {
        name: 'ΕΛΕΠΑΠ',
        iban: 'GR1748922613603592723901530'
    }
];

@Component({
    selector: 'jhi-home-modal-content',
    templateUrl: './home-modal.html'
})
export class HomeModalContentComponent {
    organizations = ORGANIZATIONS;

    constructor(public activeModal: NgbActiveModal) {}
}
