import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import data from './../../../datastore/linechartData.json';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  
  @Output() selectboxValueSelected = new EventEmitter();
  selectboxValue = 'Please select an item';

  items = ( data );

  selectbox_items = [];

  constructor() {}

  filter(){
    this.selectboxValueSelected.emit(this.selectboxValue)
  }

  ngOnInit(): void {
  }

}
