import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CurrentUser } from '../resources/models/User';

import * as fromAuthSelect from 'src/app/store/selectors/auth.selectors';
import { updateUserData } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  user!: CurrentUser;
  updateUserDataForm!: FormGroup;
  updateUserPasswordForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuthSelect.getUserData)).subscribe(result =>{
      this.user = {
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        position: result.user.position
      }
    });

    this.createForms();
    this.initializeFormInputData();
  }

  createForms(){
    this.updateUserDataForm = this.fb.group({
      firstName : ['', Validators.compose([Validators.required])],  
      lastName : ['', Validators.compose([Validators.required])],
      position : ['', Validators.compose([Validators.required])]
    });

    this.updateUserPasswordForm = this.fb.group({
      password : ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      passwordConfirm : ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  initializeFormInputData(){
    this.updateUserDataForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      position: this.user.position
    });
  }

  hidePassword(){
    this.hide = !this.hide;
  }

  submitDataUpdates() {
    if (!this.updateUserDataForm.valid) {
      return;
    }

    let user: CurrentUser = {
      id: this.user.id,
      firstName: this.updateUserDataForm.value.firstName,
      lastName: this.updateUserDataForm.value.lastName,
      position: this.updateUserDataForm.value.position
    }
           
    this.store.dispatch(updateUserData({body : user}));
  }

  submitPasswordUpdates(){
    if (!this.updateUserPasswordForm.valid) {
      return;
    }
  }
}
