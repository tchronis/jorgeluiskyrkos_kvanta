import { Moment } from 'moment';
import { IAction } from 'app/shared/model//action.model';
import { IBank } from 'app/shared/model//bank.model';

export interface IVerifiedAction {
    id?: number;
    depositAmount?: number;
    dateInstant?: Moment;
    action?: IAction;
    bank?: IBank;
}

export class VerifiedAction implements IVerifiedAction {
    constructor(
        public id?: number,
        public depositAmount?: number,
        public dateInstant?: Moment,
        public action?: IAction,
        public bank?: IBank
    ) {}
}
