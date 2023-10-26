import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eSchedule';
  dataFromSort: any;
  onSortedData(data: any) {
    this.dataFromSort = data;
  }

}
