import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Injectable()
export class SignalrserviceService {

  messageReceived = new EventEmitter<string>();
  connectionEstablished = new EventEmitter<Boolean>();
  private _hubConnection!: HubConnection;
  private connectionIsEstablished = false;
  constructor()
  {
    this.createConnection();
    this.startConnection();
    this.registerOnServerEvents();
  }
 
  createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:38879/SignalRHub')
      .build();
  }


  startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(() => { this.startConnection(); }, 5000);
      });

  }

  sendMessage(message: string) {
    this._hubConnection.invoke('NewMessage', message);
  }


  registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });

  }

}    
