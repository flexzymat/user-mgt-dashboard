import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
userForm!: FormGroup
  user: string[]=[
    'Higher',
    'Upper',
    'Lower',
  ]
  headerText: any
  actionBtn:any
  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.userForm=this.formbuilder.group({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      });

     }

  ngOnInit(): void {
    console.log(this.data.action);
    if(this.data.action=='create') {
      this.headerText='Create User'
      this.actionBtn= 'Submit'
    }else {
      this.headerText='Edit User'
      this.actionBtn = 'Update'
    }

    this.userForm.patchValue({
      firstName: this.data.data.firstName,
      lastName: this.data.data.lastName,
      email: this.data.data.email,
      role: this.data.data.role,
    })
  }

  onFormSubmit(){
    
    if(this.data.action=='create') {
      this.creatUser()
    }else {
      this.editUser()
    }
  }
  creatUser(){
    if(this.userForm.valid) {
      this.userservice.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          console.log(val);
          alert('Employee added successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  editUser(){
    if(this.userForm.valid) {
      this.userservice.editUser(this.userForm.value,this.data.id).subscribe({
        next: (val: any) => {
          console.log(val);
          alert('Employee added successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
