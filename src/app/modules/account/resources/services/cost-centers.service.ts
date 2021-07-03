import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { CostCenter, CostCenterAdd } from '../models/CostCenter';

@Injectable({
  providedIn: 'root'
})
export class CostCentersService {

  constructor(private http: HttpClient) { }

  getCostCenters(){
    return this.http.get<CostCenter[]>(AppSettings.baseUrl + "CostCenters");
  }

  addCostCenter(body: CostCenterAdd){
    return this.http.post<any>(AppSettings.baseUrl + "CostCenters", body, { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 200) {
          let costCenter: CostCenter = {
            id: JSON.parse(data.body),
            name: body.name,
            costCenterCode: body.costCenterCode
          }
          console.log(costCenter);
          return new Observable<CostCenter>(data => data.next(costCenter));
        } else {
          return throwError(data);
        }
      })
    );
  }

  deleteCostCenter(id: string){
    return this.http.delete<any>(AppSettings.baseUrl + "CostCenters/" + id, { observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 204) {
          return new Observable<string>(data => data.next(id));
        } else {
          return throwError(data);
        }
      })
    );
  }
}
