import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../resources/models/User';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm!: FormGroup;
  constructor(private fb: FormBuilder, 
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) data: User) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName : ['', Validators.compose([Validators.required])],  
      lastName : ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.createUserForm.value);
  }
}
