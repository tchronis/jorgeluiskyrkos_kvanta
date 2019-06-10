export interface IDonator {
    name?: string;
    // amount?: number;
    // date?: string;
}

export class Donator implements IDonator {
    constructor(public name?: string) // public amount?: number,
    // public date?: string
    {}
}
