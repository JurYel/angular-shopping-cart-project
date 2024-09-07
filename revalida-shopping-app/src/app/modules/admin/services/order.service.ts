import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getOrders = (): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.serverUrl}/orders`);
  }

  updateOrder = (order: Order) => {
    return this.http.put<Order>(`${this.serverUrl}/orders/${order.id}`, order);
  }
}
