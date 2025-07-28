import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message: string) {  
    const currentDate = new Date().toLocaleDateString();
    console.log(`[${currentDate}]:${message}`);
  }
}
