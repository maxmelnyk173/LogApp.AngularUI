import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { User } from '../../resources/models/User';
import * as fromUserActions from '../../state/actions/users.actions'
import { selectAllUsers } from '../../state/selectors/users.selectors';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'position', 'reset', 'delete'];
  dataSource: MatTableDataSource<User>;
  user!: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private dialog: MatDialog) { 
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  reletePassword(id: string){
    console.log(id);
  }

  deleteUser(id: string){
    console.log(id);
  }
}
