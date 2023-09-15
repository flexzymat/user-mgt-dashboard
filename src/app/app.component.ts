import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { UserService } from './services/user.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'user-mgt-dashboard';

  displayedColumns: string[] = [
    'firstName',
    'email', 
    'role',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userData: any = {}

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserLIst()
  }

  openAddEditForm(action: string,id:any) {
    const dialogRef = this.dialog.open(AddEditComponent,{
      width: '500px',
      data: {
        data: action=='create'?'':this.userData,
        action: action,
        id:id
      } 
    })

    dialogRef.afterClosed().subscribe((result: any)=>{
      this.getUserLIst()
    })
  }

  openDeleteModal(id:any) {
    const dialogRef = this.dialog.open(DeleteModalComponent,{
      data:id
    })

    dialogRef.afterClosed().subscribe((result: any)=>{
      this.getUserLIst()
    })
  }

  getUserLIst() {
    this.userService.getUserList().subscribe({
      next: (res: any) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: console.log,
    });
  }

  getUserById(id: any) {
    this.userService.getSingleUser(id).subscribe({
      next: (res: any)=> {
        this.userData = res
        this.openAddEditForm('edit',id)
      },
      error: (err: any)=> {
        // console.log(err);
        
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) =>{
        alert('User deleted')
        this.getUserLIst()
      },
      error: console.log,
    })
  }
 
}
