import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserData, UserData } from 'src/app/store/selectors/auth.selectors';
import * as fromAccountActions from './state/actions/account.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$!: Observable<UserData>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getUserData).subscribe((params) => {
      this.store.dispatch(fromAccountActions.loadCurrentUser({ id : params.user.id }));
    });

    this.user$ = this.store.pipe(select(getUserData));
  }
}
