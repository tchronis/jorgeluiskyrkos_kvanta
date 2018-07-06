import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBank } from 'app/shared/model/bank.model';

type EntityResponseType = HttpResponse<IBank>;
type EntityArrayResponseType = HttpResponse<IBank[]>;

@Injectable({ providedIn: 'root' })
export class BankService {
    private resourceUrl = SERVER_API_URL + 'api/banks';

    constructor(private http: HttpClient) {}

    create(bank: IBank): Observable<EntityResponseType> {
        return this.http.post<IBank>(this.resourceUrl, bank, { observe: 'response' });
    }

    update(bank: IBank): Observable<EntityResponseType> {
        return this.http.put<IBank>(this.resourceUrl, bank, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBank>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBank[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
