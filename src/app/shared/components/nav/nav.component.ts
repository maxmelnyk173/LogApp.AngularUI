import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromAuthSelect from 'src/app/store/selectors/auth.selectors';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store';
import { ThemePalette } from '@angular/material/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  loading$ = this.loader.loading$;
  user$: Observable<fromAuthSelect.UserData>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>, private loader: SpinnerService) {
    this.user$ = this.store.pipe(select(fromAuthSelect.getUserData));
  }

  logout(){
    this.store.dispatch(logout());
  }
}
