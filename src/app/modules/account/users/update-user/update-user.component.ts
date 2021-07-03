import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../resources/models/User';
import { UserService } from '../../resources/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm!: FormGroup;
  roles!: string[];
  user: User;
  
  constructor(private fb: FormBuilder, private userService: UserService,
              private dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
                this.user = data;
              }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      id : [''],
      firstName : ['', Validators.compose([Validators.required])],  
      lastName : ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])]
    });

    this.initializeFormData();
  }

  initializeFormData(){
    this.updateUserForm.setValue({
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      role: this.user.role,
      position: this.user.position
    });
 
    this.userService.getRoles().subscribe(result => {
      this.roles = result;
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.updateUserForm.value);
  }
}
