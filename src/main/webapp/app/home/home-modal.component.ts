import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const ORGANIZATIONS = [
    {
        name: 'Organization  1',
        iban: 'GR8702544832402111065962522'
    },
    {
        name: 'Organization  2',
        iban: 'GR6190765661979613338457127'
    },
    {
        name: 'Organization  3',
        iban: 'GR3936443266453058385938223'
    },
    {
        name: 'Organization  4',
        iban: 'GR3357269008821742111161470'
    },
    {
        name: 'Organization  5',
        iban: 'GR8311635939078022937700463'
    },
    {
        name: 'Organization  6',
        iban: 'GR1748922613603592723901530'
    },
    {
        name: 'Organization  7',
        iban: 'GR0401925451733247916219787'
    },
    {
        name: 'Organization  8',
        iban: 'GR7918414673810867305306415'
    },
    {
        name: 'Organization  9',
        iban: 'GR0607879805723120460356271'
    },
    {
        name: 'Organization  10',
        iban: 'GR4718429019368047629533070'
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
