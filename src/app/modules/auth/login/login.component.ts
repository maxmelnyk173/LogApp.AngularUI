import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private store: Store<AppState> ) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],  
      password : ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    
    this.store.dispatch(fromAuthActions.login({
      email: this.loginForm.value.email, 
      password: this.loginForm.value.password
    }));
  }
}
