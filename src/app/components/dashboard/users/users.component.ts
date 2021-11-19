import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { DialogUserComponent } from '../modals/dialog-user/dialog-user.component';
 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: User[] = [];

  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'gender','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private userService: UserService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  loadUsers(){
    this.userList = this.userService.getUsers();
    this.dataSource = new MatTableDataSource(this.userList);
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeUser(index: number){
    this.userService.removeUser(index);
    this.loadUsers();

    this._snackBar.open('The user was removed successfully.','',{
      duration: 1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

  openDialog(user: User, action: string = 'read'): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '100%',
      data: { user, action },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }
}
