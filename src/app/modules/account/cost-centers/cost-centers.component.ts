import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CostCenter, CostCenterAdd } from '../resources/models/CostCenter';
import { loadCostCenters } from '../state/actions/cost-centers.actions';
import { selectAllCostCenters } from '../state/selectors/costcenters.selectors';
import * as fromCostCentreActions from '../state/actions/cost-centers.actions';

@Component({
  selector: 'app-cost-centers',
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.scss']
})
export class CostCentersComponent implements OnInit {

  costCenters!: CostCenter[];
  createcostCenterForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(loadCostCenters());
    
    this.store.select(selectAllCostCenters).subscribe(result => {
      this.costCenters = result
    })

    this.createcostCenterForm = this.fb.group({
      name : ['', Validators.compose([Validators.required])],  
      costCenterCode : ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    });
  }

  onSubmit(){
    let costCenter: CostCenterAdd = {
      name: this.createcostCenterForm.value.name,
      costCenterCode: this.createcostCenterForm.value.costCenterCode
    }

    this.store.dispatch(fromCostCentreActions.addCostCenter({ costCenter }));
  }

  delete(id: string){
    this.store.dispatch(fromCostCentreActions.deleteCostCenter({id}));
  }

}
