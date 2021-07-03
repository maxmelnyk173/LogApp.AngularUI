import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Carrier, CarrierAdd } from '../resources/models/Carrier';
import { loadCarriers } from '../state/actions/carriers.actions';
import { selectAllCarriers } from '../state/selectors/carriers.selectors';
import * as fromCarriersActions from '../state/actions/carriers.actions';

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.scss']
})
export class CarriersComponent implements OnInit {

  carriers!: Carrier[];
  createCarrierForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(loadCarriers());
    
    this.store.select(selectAllCarriers).subscribe(result => {
      this.carriers = result
    })

    this.createCarrierForm = this.fb.group({
      name : ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    let carrier: CarrierAdd = {
      name: this.createCarrierForm.value.name,
    }

    this.store.dispatch(fromCarriersActions.addCarrier({ carrier }));
  }

  delete(id: string){
    this.store.dispatch(fromCarriersActions.deleteCarrier({id}));
  }

}
