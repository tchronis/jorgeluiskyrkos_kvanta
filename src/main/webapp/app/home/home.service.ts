import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDonator } from 'app/shared/model/donator.model';

type EntityArrayResponseType = HttpResponse<IDonator[]>;

@Injectable({ providedIn: 'root' })
export class HomeService {
    private resourceUrl = SERVER_API_URL + 'api/actions';

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonator[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
}
