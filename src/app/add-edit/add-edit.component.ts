import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interface/user';
import { Company } from '../interface/company';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  user: string[]=[
    'Higher',
    'Upper',
    'Lower',
  ]

  users: User = {
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  }

  
  headerText: any
  actionBtn:any
  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit(): void {
    
    if(this.data.action=='create') {
      this.headerText='Create User'
      this.actionBtn= 'Submit'
    }else {
      this.headerText='Edit User'
      this.actionBtn = 'Update'
      this.users = this.data.data
    }
  }

  onFormSubmit(){
    
    if(this.data.action=='create') {
      this.creatUser()
    }else {
      this.editUser()
    }
  }
  creatUser(){      
    this.userservice.addUser(this.users).subscribe({
      next: (val: any) => {
        alert('Employee added successfully');
        this.dialogRef.close();
      },
      error: (err: any) => {
        // console.error(err);
      },
    });
  }
  editUser(){
    this.userservice.editUser(this.users,this.data.id).subscribe({
      next: (val: any) => {
        alert('Employee added successfully');
        this.dialogRef.close();
      },
      error: (err: any) => {
        // console.error(err);
      },
    });
  }
}
