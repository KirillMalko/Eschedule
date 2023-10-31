import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ScheduleService} from "../../../service/service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],

})
export class SearchComponent implements OnInit {
  selectedArtefact: string | null = '';
  constructor(private scheduleService: ScheduleService){}

  searching(){
    this.selectedArtefact = this.myControl.value;
    // @ts-ignore
    this.scheduleService.setGroup(this.selectedArtefact);
  }


  myControl = new FormControl('');
  options: string[] = ['СП091', 'ИП291', 'СО241', 'ИТ241','СО241','ПС241','МС291','СП291','ИТ291','ИП291'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
