import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as Tablesort from 'tablesort';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() parties: string;
  el = document.getElementById('partiesTable');
  @ViewChild('partiesTable') partiesTable: ElementRef;
  keys;

  constructor() { }


  ngOnInit(): void {
    this.keys = Object.keys(this.parties[0]); // Get the column names
  }

  ngAfterViewInit() {
    this.sort()
  }

  sort() {
    new Tablesort(this.partiesTable.nativeElement);
  }




}
