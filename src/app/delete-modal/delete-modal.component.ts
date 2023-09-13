import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
spin: boolean= false
  constructor (
    private userService:UserService, 
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  deleteUser(id: number) {
  this.spin= true
    this.userService.deleteUser(id).subscribe({
      next: (res) =>{
        this.spin=false
        this.dialogRef.close();
      },
      error: (err) => {
       this.spin=false
      }
    })
  }
}
