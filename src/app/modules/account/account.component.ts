import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuthSelect from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$: Observable<fromAuthSelect.UserData>;

  constructor(private store: Store) { 
    this.user$ = store.pipe(select(fromAuthSelect.getUserData));
  }

  ngOnInit(): void {
  }
}
