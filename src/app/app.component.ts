import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-simple-socketio';

  currentStatus: string = 'None';

  constructor(private socketSrv: SocketioService) {
  }

  ngOnInit() : void {
    this.socketSrv.messages$.subscribe(msg => {
      this.currentStatus = msg;
    });
  }
}
