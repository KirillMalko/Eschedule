// data-sharing.service.ts
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();

    sendData(data: string | null) {
    // @ts-ignore
        this.dataSubject.next(data);
  }
}

