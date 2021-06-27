import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserData } from 'src/app/store/selectors/auth.selectors';
import { User } from './resources/User';
import * as fromAccountActions from './state/account.actions';
import { selectCurrentUser } from './state/account.selectors';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$!: Observable<User | null | undefined>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getUserData).subscribe((params) => {
      this.store.dispatch(fromAccountActions.loadCurrentUser({ id : params.user.id }));
    });

    this.user$ = this.store.select(selectCurrentUser);
  }
}
