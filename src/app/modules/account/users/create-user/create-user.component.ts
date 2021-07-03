import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../resources/services/user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm!: FormGroup;
  roles: string[] = [];
  hide: boolean = true;
  
  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName : ['', Validators.compose([Validators.required])],  
      lastName : ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      role: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])]
    });

    this.userService.getRoles().subscribe(result => {
      this.roles = result;
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.createUserForm.value);
  }
}
