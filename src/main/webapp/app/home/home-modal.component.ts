import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const ORGANIZATIONS = [
    {
        name: 'Χαμόγελο του παιδιού',
        account: [
            {
                bank: 'ALPHA BANK',
                logariasmos: '144-00-2001-000011',
                iban: 'GR4601401440144002001000011'
            },
            {
                bank: 'ΕΘΝΙΚΗ ΤΡΑΠΕΖΑ',
                logariasmos: '116/296076-12',
                iban: 'GR81011011600000116296076512'
            },
            {
                bank: 'ΠΕΙΡΑΙΩΣ',
                logariasmos: '5233-003309-251',
                iban: 'GR3301722330005233003309251'
            }
        ]
    },
    {
        name: 'Κιβωτός του κόσμου',
        account: [
            {
                bank: 'ALPHA BANK',
                logariasmos: '183002002003534',
                iban: 'GR4801401830183002002003534'
            },
            {
                bank: 'ΕΘΝΙΚΗ ΤΡΑΠΕΖΑ',
                logariasmos: '100/296102-42',
                iban: 'GR6201101000000010029610242'
            },
            {
                bank: 'ΠΕΙΡΑΙΩΣ',
                logariasmos: '5023 - 032595 - 870',
                iban: 'GR3801720230005023032595870'
            }
        ]
    },
    {
        name: 'ΑΝΙΜΑ',
        account: [
            {
                bank: 'ΠΕΙΡΑΙΩΣ',
                logariasmos: '5037-055201-578',
                iban: 'GR7901720370005037055201578'
            },
            {
                bank: 'EUROBANK',
                logariasmos: '0026-0052-21-0101152035',
                iban: 'GR4602600520000210101152035'
            }
        ]
    },
    {
        name: 'ΑΡΣΙΣ',
        account: [
            {
                bank: 'ALPHA BANK',
                logariasmos: '',
                iban: 'GR0601401420142002002008979'
            }
        ]
    },
    {
        name: 'ΚΑΝΕ ΜΙΑ ΕΥΧΗ',
        account: [
            {
                bank: 'ALPHA BANK',
                logariasmos: '122 00 200 2010 774',
                iban: 'GR9001401220122002002010774'
            },
            {
                bank: 'ΕΘΝΙΚΗ ΤΡΑΠΕΖΑ',
                logariasmos: '715 4701 31 37',
                iban: 'GR3001107150000071547013137'
            }
        ]
    },
    {
        name: 'ΕΛΕΠΑΠ',
        account: [
            {
                bank: 'ALPHA BANK',
                logariasmos: '115-00-2002-005 795',
                iban: 'GR0601401150115002002005795'
            },
            {
                bank: 'ΕΘΝΙΚΗ ΤΡΑΠΕΖΑ',
                logariasmos: '139/480064-84',
                iban: 'GR8101101390000013948006484'
            },
            {
                bank: 'ΠΕΙΡΑΙΩΣ',
                logariasmos: '5063-0215944-939',
                iban: 'GR64017200300050030215944939'
            }
        ]
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
