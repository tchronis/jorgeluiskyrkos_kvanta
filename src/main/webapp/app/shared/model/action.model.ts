export interface IAction {
    id?: number;
    name?: string;
    email?: string;
    address?: string;
    depositReceiptContentType?: string;
    depositReceipt?: any;
    messageText?: string;
    visible?: boolean;
    verified?: boolean;
    amount?: number;
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public address?: string,
        public depositReceiptContentType?: string,
        public depositReceipt?: any,
        public messageText?: string,
        public visible?: boolean,
        public verified?: boolean,
        public amount?: number
    ) {
        this.visible = false;
        this.verified = false;
    }
}
