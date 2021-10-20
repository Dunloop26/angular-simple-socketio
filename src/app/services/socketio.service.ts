import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket = io(environment.websocket_endpoint);
  subject = new BehaviorSubject<any>(null);

  constructor() {
    this.socket.on('connect', () => {
      console.log('Connected to socket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    })

    this.socket.on('ping', () => {
      console.log('Ping from socket');
    });
  }

  get messages$() : Observable<any>{
    return this.subject.asObservable();
  }
}
