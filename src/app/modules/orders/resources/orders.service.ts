import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderPostOrPut, PackingType, Stackability } from './Order';
import { AppSettings } from 'src/app/common/appSettings';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersByDate(fromDate: Date, toDate: Date){
    return this.http.get<Order[]>(AppSettings.baseUrl + `Orders/from=${fromDate.toUTCString()}/to=${toDate.toUTCString()}`);
  }

  addOrder(body: OrderPostOrPut){
    return this.http.post<any>(AppSettings.baseUrl + "Orders", body, { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(result => {
        if (result.status == 200) {
          return new Observable<Order>(data => data.next(JSON.parse(result.body) as Order));
        } else {
          return throwError("An error occured");
        }
      })
    );
  }

  updateOrder(id: string, body: OrderPostOrPut){
    return this.http.put<any>(AppSettings.baseUrl + "Orders/" + id, body, { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(result => {
        if (result.status == 200) {
          console.log(result.body)
          return new Observable<Order>(data => data.next(JSON.parse(result.body) as Order));
        } else {
          return throwError("An error occured");
        }
      })
    );
  }

  deleteOrder(id: string){
    return this.http.delete<any>(AppSettings.baseUrl + "Orders/" + id, { observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 204) {
          return new Observable<string>(data => data.next(id));
        } else {
          return throwError(data);
        }
      })
    );
  }

  getStackability(){
    return this.http.get<Stackability[]>(AppSettings.baseUrl + "Orders/stackability");
  }

  getPackingType(){
    return this.http.get<PackingType[]>(AppSettings.baseUrl + "Orders/packingtypes");
  }
}
