import { Pipe, PipeTransform } from '@angular/core';
import { IAction } from 'app/shared/model/action.model';

@Pipe({ name: 'filteredDonators' })
export class FilteredDonatorsPipe implements PipeTransform {
    transform(donators: IAction[]): IAction[] {
        return donators.filter(donator => donator.visible && donator.verified);
    }
}
