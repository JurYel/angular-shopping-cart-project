import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../models/order.interface';
import { environment } from '../../../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serverUrl = environment.SERVER_URL;
  
  constructor(private http: HttpClient) { }

  getOrders = (): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.serverUrl}/orders`);
  }

  checkIfOrderExists = (username: string): Observable<boolean> => {
    const orders$: Observable<Order[]> = this.getOrders();

    return orders$.pipe(
      map((orders: Order[]) => orders.some(order => order.username.toLowerCase() === username.toLowerCase()))
    );
  }

  createOrder = (order: Order) => {
    return this.http.post<Order>(`${this.serverUrl}/orders`, order);
  }

  updateOrder = (order: Order) => {
    return this.http.put<Order>(`${this.serverUrl}/orders/${order.id}`, order);
  }

  getOrdersByUsername = (username: string): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.serverUrl}/orders?username=${username}`);
  }

  checkIfTempOrderExists = (username: string): Observable<boolean> => {
    const tempOrders$: Observable<Order[]> = this.getTempOrders();

    return tempOrders$.pipe(
      map((orders: Order[]) => orders.some(order => order.username.toLowerCase() === username.toLowerCase()))
    );
  }

  getTempOrders = (): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.serverUrl}/temp_orders`);
  }

  getTempOrder = (username: string): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.serverUrl}/temp_orders?username=${username}`);
  }

  createTempOrder = (order: Order) => {
    return this.http.post<Order>(`${this.serverUrl}/temp_orders`, order);
  }

  updateTempOrder = (order: Order) => {
    return this.http.put<Order>(`${this.serverUrl}/temp_orders/${order.id}`, order);
  }

  deleteTempOrder = (id: string) => {
    return this.http.delete<Order>(`${this.serverUrl}/temp_orders/${id}`);
  }
}
