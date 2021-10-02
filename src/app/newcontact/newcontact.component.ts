import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../Contact';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.css']
})
export class NewcontactComponent implements OnInit {

  fname!: string;
  lname!: string;
  phoneno!: string;
  updateContact!: string;
  contactId!: number;
  

  constructor(private router: Router, private contactService : ContactsService, private _routeParams: ActivatedRoute) { 
    
  }

  get f(){
    return this.form.controls;
  }

  navigateToHome = () => {
    return this.router.navigateByUrl("/");
  }

  contactDetail : any = [];
  user: any = {};
  
  form = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
  })
  
  ngOnInit(): void {
    console.log(this._routeParams.snapshot.params.id);
    this._routeParams.queryParams.subscribe(params => {
      this.updateContact = params.update;
      console.log(params.update);
    })

    // loads the values of the id sent through route
    console.log(this.updateContact);
    if(this.updateContact == 'true'){
    console.log("hello");
    this.contactDetail = this.contactService.currentUser(this._routeParams.snapshot.params.id);
    this.form = new FormGroup({
      firstName: new FormControl(this.contactDetail['firstName'],[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]),
      lastName: new FormControl(this.contactDetail['lastName'], [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
      phone: new FormControl(this.contactDetail['phone'], [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
    })
  }
  }


  onSubmit = () =>{
    if(this.updateContact == 'true'){
      console.log(this.updateContact);
      console.log(this.contactService.getRecord("Records"));
      let userContacts = this.contactService.getRecord("Records");
      let userId = this.contactService.currentId(this._routeParams.snapshot.params.id);
      userContacts[userId] = this.form.value;
      this.contactService.updateRecord(userContacts);
      this.router.navigateByUrl("/");
    }else{
      
      console.log(this.form.value);

      let userInfo: Contact = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phone: this.form.value.phone
      }
      if(this.contactService.checkForUniquePhoneNumber(this.form.value.phone)){
        this.contactService.newRecord(userInfo);
        this.router.navigateByUrl("/");
      }
      else{
        alert("Phone Number already exists !");
      }
      }
    }

}
