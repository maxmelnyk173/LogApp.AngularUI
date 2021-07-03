import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShipmentStatus, ShipmentStatusAdd } from '../resources/models/ShipmentStatus';
import { loadShipmentStatuses } from '../state/actions/shipment-statuses.actions';
import { selectAllShipmentStatuses } from '../state/selectors/shipment-statuses.selectors';
import * as fromShipmentStatusesActions from '../state/actions/shipment-statuses.actions';

@Component({
  selector: 'app-shipment-statuses',
  templateUrl: './shipment-statuses.component.html',
  styleUrls: ['./shipment-statuses.component.scss']
})
export class ShipmentStatusesComponent implements OnInit {

  shipmentStatuses!: ShipmentStatus[];
  createShipmentStatusForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(loadShipmentStatuses());
    
    this.store.select(selectAllShipmentStatuses).subscribe(result => {
      this.shipmentStatuses = result
    })

    this.createShipmentStatusForm = this.fb.group({
      name : ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    let shipmentStatus: ShipmentStatusAdd = {
      name: this.createShipmentStatusForm.value.name
    }

    this.store.dispatch(fromShipmentStatusesActions.addShipmentStatus({ shipmentStatus }));
  }

  delete(id: string){
    this.store.dispatch(fromShipmentStatusesActions.deleteShipmentStatus({id}));
  }
}
