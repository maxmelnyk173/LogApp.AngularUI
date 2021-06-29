import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { selectCurrentUser } from '../state/selectors/account.selectors';
import * as fromAccountActions from '../state/actions/account.actions';
import { UpdateUser } from '../resources/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  userId!: string | null | undefined;
  user$!: Observable<User | null | undefined>
  updateUserDataForm!: FormGroup;
  updateUserPasswordForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);

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
    this.user$.subscribe(data => {
      this.updateUserDataForm.setValue({
        firstName: data?.firstName,
        lastName: data?.lastName,
        position: data?.position
     });

     this.userId = data?.id
    })
  }

  hidePassword(){
    this.hide = !this.hide;
  }

  submitDataUpdates() {
    if (!this.updateUserDataForm.valid) {
      return;
    }
                              
    this.store.dispatch(fromAccountActions.updateUserData({
      body: {
        id: this.userId!,
        firstName: this.updateUserDataForm.value.firstName,
        lastName: this.updateUserDataForm.value.lastName,
        position: this.updateUserDataForm.value.position
      }
    }));
  }

  submitPasswordUpdates(){
    if (!this.updateUserPasswordForm.valid) {
      return;
    }

    console.log(this.updateUserPasswordForm.value)
  }
}
