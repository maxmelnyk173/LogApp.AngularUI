import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllCostCenters } from '../../account/state/selectors/costcenters.selectors';
import { CostCenter, OrderPostOrPut, OrderType, PackingType, Stackability } from '../resources/Order';
import { selectOrderById } from '../state/order.selectors';
import * as OrdersSelector from '../state/order.selectors';
import { CustomErrorStateMatcher } from 'src/app/common/customErrorStateMatcher ';

@Component({
  selector: 'app-upsert-orders',
  templateUrl: './upsert-orders.component.html',
  styleUrls: ['./upsert-orders.component.scss']
})
export class UpsertOrdersComponent implements OnInit {

  generalInfo!: FormGroup;
  goodsInfo!: FormGroup;
  paymentInfo!: FormGroup;

  orderId: string | undefined;
  costCenters!: CostCenter[];
  packings!: PackingType[];
  stackability!: Stackability[];
  orderTypes: OrderType[];

  customMatcher = new CustomErrorStateMatcher();
  
  constructor(private dialogRef: MatDialogRef<UpsertOrdersComponent>, @Inject(MAT_DIALOG_DATA) data: any, 
    private fb: FormBuilder, private store: Store) {
    this.orderId = data;
    
    this.orderTypes = [{ name: "Export", value: 1 }, { name: "Import", value: 1}];
    console.log(this.orderTypes);
  }
                

  ngOnInit(): void {
    this.generalInfo! = this.fb.group({
      lotName : ['', Validators.compose([Validators.required])],
      orderType : ['', Validators.compose([Validators.required])],
      route: ['', Validators.compose([Validators.required])],
      pickUpDate: ['', Validators.compose([Validators.required])],
      deliveryDate: ['', Validators.compose([Validators.required])],
    })

    this.goodsInfo! = this.fb.group({
      packingType : ['', Validators.compose([Validators.required])],
      goodsQuantity: ['', Validators.compose([Validators.required])],
      dimensions: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      stackability: ['', Validators.compose([Validators.required])],
    })

    this.paymentInfo! = this.fb.group({
      costCenterId: ['', Validators.compose([Validators.required])],
      goodsGL: ['', Validators.compose([Validators.required])],
      goodsType: ['', Validators.compose([Validators.required])],
      notes: ['']
    })

    this.initializeFormsData();
    this.selectDataFromStore();
  }

  initializeFormsData(){
    if(this.orderId != null){
      this.store.select(selectOrderById(this.orderId)).subscribe(
        result => {
          if(result != undefined){
            this.generalInfo.setValue({
              lotName : result.lotName,
              orderType : result.orderType,
              route: result.route,
              pickUpDate: result.pickUpDate,
              deliveryDate: result.deliveryDate
            })
        
            this.goodsInfo.setValue({
              packingType : result.packingType,
              goodsQuantity: result.goodsQuantity,
              dimensions: result.dimensions,
              weight: result.weight,
              stackability: result.stackability
            })
        
            this.paymentInfo.setValue({
              costCenterId: result.costCenter.id,
              goodsGL: result.goodsGL,
              goodsType: result.goodsType,
              notes: result.notes
            })
          }
        }
      )
    }
  }

  selectDataFromStore(){
    this.store.select(selectAllCostCenters).subscribe(result => {
      let costCenters: any = result;
      this.costCenters = costCenters as CostCenter[];
    })

    this.store.select(OrdersSelector.selectPackingTypes).subscribe(result => {
      if(result != null){
        this.packings = result as PackingType[]
      }
    })

    this.store.select(OrdersSelector.selectSackability).subscribe(result => {
      if(result != null){
        this.stackability = result as Stackability[]
      }
    })
  }


  close() {
    this.dialogRef.close(null);
  }

  submit() {
    if(!this.generalInfo.valid || !this.goodsInfo.valid || !this.paymentInfo.valid){
      return
    }

    let order: OrderPostOrPut = {
      lotName : this.generalInfo.value.lotName,
      orderType : this.generalInfo.value.orderType,
      route: this.generalInfo.value.route,
      pickUpDate: new Date(this.generalInfo.value.pickUpDate).toISOString(),
      deliveryDate: new Date(this.generalInfo.value.deliveryDate).toISOString(),
      packingType : this.goodsInfo.value.packingType,
      goodsQuantity: this.goodsInfo.value.goodsQuantity,
      dimensions: this.goodsInfo.value.dimensions,
      weight: this.goodsInfo.value.weight,
      stackability: this.goodsInfo.value.stackability,
      costCenterId: this.paymentInfo.value.costCenterId,
      goodsGL: Number.parseInt(this.paymentInfo.value.goodsGL),
      goodsType: this.paymentInfo.value.goodsType,
      notes: this.paymentInfo.value.notes
    }

    this.dialogRef.close(order);
  }

}
