import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {group} from "@angular/animations";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {DataSharingService} from "../../../service/data-sharing";
import {WeeksSortComponent} from "../weeks-sort/weeks-sort.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],

})
export class SearchComponent implements OnInit {
  selectedArtefact: string | null = '';
  @Output() onChanged  = new EventEmitter<string>();

  searching(){
    this.selectedArtefact = this.myControl.value;
    // @ts-ignore
    this.onChanged.emit(this.selectedArtefact);
  }
  constructor(private dataSharingService: DataSharingService){

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
  // sendDataToChild2() {
  //   const data = this.myControl.value;
  //   this.dataSharingService.sendData(data);
  // }

}
