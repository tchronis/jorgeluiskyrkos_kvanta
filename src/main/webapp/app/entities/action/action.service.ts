import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAction } from 'app/shared/model/action.model';

type EntityResponseType = HttpResponse<IAction>;
type EntityArrayResponseType = HttpResponse<IAction[]>;

@Injectable({ providedIn: 'root' })
export class ActionService {
    private resourceUrl = SERVER_API_URL + 'api/actions';

    constructor(private http: HttpClient) {}

    create(action: IAction): Observable<EntityResponseType> {
        return this.http.post<IAction>(this.resourceUrl, action, { observe: 'response' });
    }

    update(action: IAction): Observable<EntityResponseType> {
        return this.http.put<IAction>(this.resourceUrl, action, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAction[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
