import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { RegisterUser, User } from '../../resources/models/User';
import { UserService } from '../../resources/services/user.service';
import * as fromUserActions from '../../state/actions/users.actions'
import { selectAllUsers, selectUser } from '../../state/selectors/users.selectors';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'position', 'update', 'reset', 'delete'];
  dataSource: MatTableDataSource<User>;
  user!: User | null | undefined;
  paginator!: MatPaginator;
  sort!: MatSort;

  constructor(private store: Store, private dialog: MatDialog, private userService: UserService) { 
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.store.dispatch(fromUserActions.loadUsers());

    this.store.select(selectAllUsers).subscribe(result => {
      if(result.length > 0){
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.store.dispatch(fromUserActions.addUser({user : (result as RegisterUser)}))
      }
    });
  }

  updateUser(id: string){
    const dialogConfig = new MatDialogConfig();

    this.store.dispatch(fromUserActions.chooseCurrentUser({selectedUserId : id}))
    this.store.select(selectUser).subscribe(data => { this.user = data })

    if(this.user != null && this.user != undefined){
      dialogConfig.data = this.user
    }

    const dialogRef = this.dialog.open(UpdateUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.store.dispatch(fromUserActions.updateUser({user : (result as User)}))
      }
    });
  }

  resetPassword(userId: string){
    const dialogRef = this.dialog.open(ResetPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.store.dispatch(fromUserActions.resetPassword({ id: userId, newPassword : (result.password as string) }));
      }
    });
  }

  deleteUser(id: string){
    this.store.dispatch(fromUserActions.deleteUser({id}));
  }
}
