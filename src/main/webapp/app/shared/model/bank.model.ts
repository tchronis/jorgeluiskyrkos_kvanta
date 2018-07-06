import { IOrganization } from 'app/shared/model//organization.model';

export interface IBank {
    id?: number;
    name?: string;
    account?: string;
    iban?: string;
    organization?: IOrganization;
}

export class Bank implements IBank {
    constructor(
        public id?: number,
        public name?: string,
        public account?: string,
        public iban?: string,
        public organization?: IOrganization
    ) {}
}
