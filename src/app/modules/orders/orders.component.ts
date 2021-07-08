import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as OrdersActions from '../orders/state/order.actions';
import * as OrdersSelectors from '../orders/state/order.selectors';
import { Store } from '@ngrx/store';
import { CostCenter, Order, OrderPostOrPut } from './resources/Order';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { loadCostCenters } from '../account/state/actions/cost-centers.actions';
import { selectAllCostCenters } from '../account/state/selectors/costcenters.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpsertOrdersComponent } from './upsert-orders/upsert-orders.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders!: Observable<Order[]>;
  costCenters!: CostCenter[];
  filterOrdersForm!: FormGroup;
  fromDate!: Date;
  toDate!: Date;
  isAccepeted: boolean = true;
  costCenter: string = "";
  sorting: string = "asc";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();


  constructor(private store: Store, private fb: FormBuilder, private dialog: MatDialog,) { 
  }

  ngOnInit(): void {
    this.inializeAndSelectDataFromStore();
    this.initializeDates();
    this.uploadOrders(this.fromDate, this.toDate);

    this.store.select(OrdersSelectors.selectAllOrders).subscribe(
      result => { 
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.orders = this.dataSource.connect();
      }
    )

    this.filterOrdersForm = this.fb.group({
      from : [this.fromDate],
      to: [this.toDate]
    });
  }

  onSubmitFilterForm(){
    this.fromDate = new Date(this.filterOrdersForm.value.from);
    this.toDate = new Date(this.filterOrdersForm.value.to);

    this.uploadOrders(this.fromDate, this.toDate);
  }

  onResetFilterForm(){
    this.initializeDates();
    this.initializeForm();

    this.uploadOrders(this.fromDate, this.toDate);
  }
  
  createOrder(){
    const dialogRef = this.dialog.open(UpsertOrdersComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.store.dispatch(OrdersActions.addOrder({order : result as OrderPostOrPut}));
      }
    });
  }

  deleteOrder(id: string){
    this.store.dispatch(OrdersActions.deleteOrder({ id }));
  }

  updateOrder(id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;

    const dialogRef = this.dialog.open(UpsertOrdersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result);
        this.store.dispatch(OrdersActions.updateOrder({id: id, order : result as OrderPostOrPut}));
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortByCostCenter(value: string){
    console.log(value);
  }

  sortWithAccepted(value: boolean){
    this.dataSource.data.filter(d => !d.isAccepted)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortBy(value: string){
    console.log(value);
  }

  uploadOrders(fromDate: Date, toDate: Date){
    this.store.dispatch(OrdersActions.loadOrdersByDate({fromDate: fromDate, toDate: toDate}));
  }

  initializeDates(){
    var date = new Date(Date.now());
    this.fromDate = new Date(date.setDate(date.getDate() - 7));

    this.toDate = new Date(Date.now());
  }

  initializeForm(){
    this.filterOrdersForm.setValue({
      from : this.fromDate,
      to: this.toDate
    });
  }

  inializeAndSelectDataFromStore(){
    this.store.dispatch(loadCostCenters());
    this.store.dispatch(OrdersActions.loadPackingTypes());
    this.store.dispatch(OrdersActions.loadStackability());

    
    this.store.select(selectAllCostCenters).subscribe(result => {
      let costCenters: any = result;
      this.costCenters = costCenters as CostCenter[];
    })
  }
}
