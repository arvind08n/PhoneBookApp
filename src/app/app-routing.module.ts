import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewcontactComponent } from './newcontact/newcontact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'newContact',component:NewcontactComponent},
  {path: 'updateContact/:id', component:NewcontactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [HomeComponent,NewcontactComponent];