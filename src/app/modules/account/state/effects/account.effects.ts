import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../resources/services/user.service';
import * as AccountActions from '../actions/account.actions';



@Injectable()
export class AccountEffects {
}
