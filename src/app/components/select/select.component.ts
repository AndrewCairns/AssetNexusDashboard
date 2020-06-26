import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/linechartData.json';
import { element } from 'protractor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  
  objectKeys = Object.keys;

  selectArray = [];
  selectedValue = null;
  items = ( data );
  outputData;
  selectbox_items = [];

  constructor() {}

  ngOnInit(): void {

    Object.keys(this.items).forEach(element => {
      this.selectbox_items.push(element);

      this.items[element].forEach(element2 => {
        Object.keys(element2).forEach(element3 => {
          this.selectbox_items.push("\xa0 " + element3)

          element2[element3].forEach(element4 => {
            this.selectbox_items.push("\xa0 \xa0 " + element4.key)
          });
        })
      });

    })

  }

}
