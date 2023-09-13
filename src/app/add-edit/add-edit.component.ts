import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
userForm!: any
  user: string[]=[
    'Higher',
    'Upper',
    'Lower',
  ]
  
  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private dialogRef: MatDialogRef<AddEditComponent>) { }

  ngOnInit(): void {
  this.userForm=this.formbuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });
  }

  onFormSubmit(){
    if(this.userForm.valid) {
      // console.log(this.userForm.value)
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
}
