import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { ShipmentStatus, ShipmentStatusAdd } from '../models/ShipmentStatus';

@Injectable({
  providedIn: 'root'
})
export class ShipmentStatusesService {

  constructor(private http: HttpClient) { }

  getShipmentStatuses(){
    return this.http.get<ShipmentStatus[]>(AppSettings.baseUrl + "ShipmentStatuses");
  }

  addShipmentStatus(body: ShipmentStatusAdd){
    return this.http.post<any>(AppSettings.baseUrl + "ShipmentStatuses", body, { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 200) {
          let shipmentStatus: ShipmentStatus = {
            id: JSON.parse(data.body),
            name: body.name
          }
          return new Observable<ShipmentStatus>(data => data.next(shipmentStatus));
        } else {
          return throwError(data);
        }
      })
    );
  }

  deleteShipmentStatus(id: string){
    return this.http.delete<any>(AppSettings.baseUrl + "ShipmentStatuses/" + id, { observe: 'response' }).pipe(
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
