import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVerifiedAction } from 'app/shared/model/verified-action.model';

type EntityResponseType = HttpResponse<IVerifiedAction>;
type EntityArrayResponseType = HttpResponse<IVerifiedAction[]>;

@Injectable({ providedIn: 'root' })
export class VerifiedActionService {
    private resourceUrl = SERVER_API_URL + 'api/verified-actions';

    constructor(private http: HttpClient) {}

    create(verifiedAction: IVerifiedAction): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(verifiedAction);
        return this.http
            .post<IVerifiedAction>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(verifiedAction: IVerifiedAction): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(verifiedAction);
        return this.http
            .put<IVerifiedAction>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVerifiedAction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVerifiedAction[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(verifiedAction: IVerifiedAction): IVerifiedAction {
        const copy: IVerifiedAction = Object.assign({}, verifiedAction, {
            dateInstant:
                verifiedAction.dateInstant != null && verifiedAction.dateInstant.isValid() ? verifiedAction.dateInstant.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateInstant = res.body.dateInstant != null ? moment(res.body.dateInstant) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((verifiedAction: IVerifiedAction) => {
            verifiedAction.dateInstant = verifiedAction.dateInstant != null ? moment(verifiedAction.dateInstant) : null;
        });
        return res;
    }
}
