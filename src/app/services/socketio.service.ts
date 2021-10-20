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
      this.subject.next('Connected');
    });

    this.socket.on('error', (error) => {
      console.log(`An error has been detected: ${error}`)
      this.subject.next(error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket');
      this.subject.next('Disconnected');
    })

    this.socket.onAny((event, arg: any) => {
      console.log(`A event ${event} has been received from socket!`);
      this.subject.next(event);
    });
  }

  get messages$() : Observable<any>{
    return this.subject.asObservable();
  }
}
