import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  parties = [
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "approved": false
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "approved": false
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "approved": true
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "approved": false
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "approved": true
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "approved": false
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "approved": true
    },
  ]

  metric_block_data = [
    { "value": "1", "subtitle": "Executor", "icon": "mail", "iconColorClass": "icon-color-brand-alt" },
    { "value": "3", "subtitle": "Trustees", "icon": "energy", "iconColorClass": "icon-color-brand-alt" },
    { "value": "4", "subtitle": "Trusted Friends", "icon": "fingerprint", "iconColorClass": "icon-color-brand-alt" },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
