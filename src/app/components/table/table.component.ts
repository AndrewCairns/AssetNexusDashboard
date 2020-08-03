import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as Tablesort from 'tablesort';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  el = document.getElementById('partiesTable');
  @ViewChild('partiesTable') partiesTable: ElementRef;


  parties = [
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phoneNumber": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phoneNumber": "07927453455",
      "approved": false
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phoneNumber": "079279345343",
      "approved": false
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phoneNumber": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phoneNumber": "07927453455",
      "approved": true
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phoneNumber": "079279345343",
      "approved": false
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phoneNumber": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phoneNumber": "07927453455",
      "approved": false
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phoneNumber": "079279345343",
      "approved": true
    },
  ]

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sort()
  }

  sort() {
    new Tablesort(this.partiesTable.nativeElement);
  }




}