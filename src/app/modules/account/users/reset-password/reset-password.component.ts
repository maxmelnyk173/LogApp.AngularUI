import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  hide: boolean = true;
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ResetPasswordComponent>) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password : ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.resetPasswordForm.value);
  }
}
