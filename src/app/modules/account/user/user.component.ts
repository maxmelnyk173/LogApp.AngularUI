import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User';
import { getUserData } from 'src/app/store/selectors/auth.selectors';
import * as fromAccountActions from '../state/account.actions';
import { selectCurrentUser } from '../state/account.selectors';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$!: Observable<User | null>

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.store.select(getUserData).subscribe((params) => {
      let id = params.user.id;
      this.store.dispatch(fromAccountActions.loadCurrentUser({ id }));
    });

    this.user$ = this.store.pipe(select(selectCurrentUser));
  }
}
