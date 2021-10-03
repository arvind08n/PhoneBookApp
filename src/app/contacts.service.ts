import { Injectable } from '@angular/core';
import { Contact } from './Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor() { }

  newRecord(record:Contact){
    let records = [];
    if(localStorage.getItem('Records')){
      records = JSON.parse(localStorage.getItem('Records') || '{}');
      records = [record, ...records];
    }else{
      records=[record];
    }
    localStorage.setItem('Records', JSON.stringify(records));
  }

  updateRecord(record:Contact){
    localStorage.setItem('Records', JSON.stringify(record));
  }

  getRecord(key: string){
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  deleteRecord(record:Contact[]){
    localStorage.setItem('Records', JSON.stringify(record));
  }

  checkForUniquePhoneNumber(key:number):boolean{
    if(JSON.parse(localStorage.getItem('Records')||"[]").find((record: {phone: any})=>record.phone==key)){return false}
    else{return true}
  }

  currentId(key:number){
    let records = [];
    let index = -1;
    records = JSON.parse(localStorage.getItem("Records") || "[]");
    records.forEach((record:Contact,i:number) => {
      if(record.phone == key){
        index = i;
        
      }
    });
    return index;
  }

  currentRecord(key: number){
    let records = [];
    let index = 0;
    records = JSON.parse(localStorage.getItem("Records") || "[]");
    records.forEach((record:Contact,i:number) => {
      if(record.phone == key){
        index = i;
      }
    });
    return records[index];
  }
}
