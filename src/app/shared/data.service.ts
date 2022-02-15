import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  createDb() {
    let owners = [
      {
        id: 1,
        aLastName: "Иванов",
        aFirstName: "Иван",
        aMiddleName: "Петрович",
        aCars: [
          {
            aNumber: "AA1111AA",
            aBrand: "Ferrari",
            aModel: "Roma",
            aYear: 2021
          }
        ]
      },
      {
        id: 2,
        aLastName: "Петров",
        aFirstName: "Иван",
        aMiddleName: "Иванович",
        aCars: [
          {
            aNumber: "AA2222AA",
            aBrand: "BMW",
            aModel: "X5",
            aYear: 2005
          },
          {
            aNumber: "AA3333AA",
            aBrand: "Ferrari",
            aModel: "488",
            aYear: 2018
          },
          {
            aNumber: "AA8888AA",
            aBrand: "KIA",
            aModel: "Rio",
            aYear: 2001
          }
        ]
      },
      {
        id: 3,
        aLastName: "Cидоров",
        aFirstName: "Сергей",
        aMiddleName: "Иванович",
        aCars: [
          {
            aNumber: "AA6666AA",
            aBrand: "Renault",
            aModel: "Logan",
            aYear: 2010
          },
          {
            aNumber: "AA1234AA",
            aBrand: "Ferrari",
            aModel: "Roma",
            aYear: 2020
          }
        ]
      }

    ];
    return { owners };
  }
  constructor() { }
}
