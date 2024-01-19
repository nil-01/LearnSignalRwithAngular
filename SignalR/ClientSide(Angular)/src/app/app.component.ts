import { Component, NgZone } from '@angular/core';
import { SignalrserviceService } from './signalrservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SignalRDemoClientSide';
  txtMessage: string = '';  
  messages = new Array<string>();  

  constructor(  
    private messageService: SignalrserviceService,  
    private _ngZone: NgZone,
  ) {  
    this.subscribeToEvents();  
  }  

  MessageSet(event:any)
  {
    this.txtMessage=event.target.value;
    console.log(this.txtMessage);
  }
  sendMessage(): void {  
    if (this.txtMessage!='' || this.txtMessage!=null) {  
         debugger;
        this.messageService.sendMessage(this.txtMessage.trim());
        this.txtMessage='';
    } 
    else{
      alert("Enter the message message can't be empty");
    } 
  }  

  private subscribeToEvents(): void {  
    this.messageService.messageReceived.subscribe((message: string) => {  
      this._ngZone.run(() => {  
          this.messages.push(message);   
      });  
    });  
   
  }
  
}
