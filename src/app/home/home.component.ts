import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../Contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userContact : Contact[] = [];
  id:number = -1;
  keyword!: string;
  sort_by!: string;

  constructor(private router : Router,private contactService : ContactsService) {
    this.sort_by = 'Sort by..';
   }

  ngOnInit(): void {
    this.userContact = this.contactService.getRecord("Records");
    console.log(this.userContact);
  }
  
  newContact = () => {
    this.router.navigate(['/newContact'], { queryParams: { update : 'false'}});
  }

  updateContact = (i:number) =>{
    this.router.navigate(['/updateContact/'+i], {queryParams : { update: true}});
  }

  sort = () => {
    switch(this.sort_by){
      case 'firstName': this.userContact.sort((a:Contact,b:Contact) => (a.firstName > b.firstName) ? 1: ((b.firstName > a.firstName) ? -1 : 0));
                        break;
      case 'lastName':   this.userContact.sort((a:Contact,b:Contact) => (a.lastName > b.lastName) ? 1: ((b.lastName > a.lastName) ? -1 : 0));    
                        break;
      case 'phoneNumber':   this.userContact.sort((a:Contact,b:Contact) => (a.phone > b.phone) ? 1: ((b.phone > a.phone) ? -1 : 0));    
                        break;
      default: break;
    }
    
  }

  removeContact = (i:number) => {
    console.log(i);
    this.userContact.splice(i,1);
    this.contactService.deleteRecord(this.userContact);
  }

}
