import { Injectable, Query } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ARTWORK_API } from "src/app/static/constants/api.contant";
import { QueryOption, SearchQueryOption } from "../interfaces/artwork.interface";

@Injectable({
    providedIn : 'root'
})


export class ArtworkService {
    constructor(private http: HttpClient) { }

    getArtworkList(option: QueryOption): Observable<any>{
        const reqOptions = this.buildQueryRequestOption(option);
        const url = ARTWORK_API.GET_ARTWORK;
        return this.http.get(url, reqOptions);
    }

    searchArtWorkByDate(option:SearchQueryOption): Observable<any>{
        const reqOptions = this.buildQueryRequestOption(option);
        const url = ARTWORK_API.SEARCH_ARTWROK;
        return this.http.get(url, reqOptions);
    }

    protected buildQueryRequestOption(option: QueryOption): any {
        return {
          params: option
        };
    }

}


