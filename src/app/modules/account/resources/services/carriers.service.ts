import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { Carrier, CarrierAdd } from '../models/Carrier';

@Injectable({
  providedIn: 'root'
})
export class CarriersService {

  constructor(private http: HttpClient) { }

  getCarriers(){
    return this.http.get<Carrier[]>(AppSettings.baseUrl + "Carriers");
  }

  addCarrier(body: CarrierAdd){
    return this.http.post<any>(AppSettings.baseUrl + "Carriers", body, { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 200) {
          let carrier: Carrier = {
            id: JSON.parse(data.body),
            name: body.name
          }
          return new Observable<Carrier>(data => data.next(carrier));
        } else {
          return throwError(data);
        }
      })
    );
  }

  deleteCarrier(id: string){
    return this.http.delete<any>(AppSettings.baseUrl + "Carriers/" + id, { observe: 'response' }).pipe(
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
