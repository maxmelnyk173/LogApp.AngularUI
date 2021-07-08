export interface Order{
    id:string,
    lotName: string,
    orderType: number,
    packingType: number,
    goodsQuantity: number,
    dimensions: string,
    weight: number
    stackability: number,
    route: string
    pickUpDate: Date,
    deliveryDate: Date,
    costCenter: CostCenter,
    goodsGL: number,
    goodsType: string
    notes: string
    isAccepted: boolean,
    shipment: Shipment,
    createdBy: string,
    created: Date
}

export interface CostCenter{
    id:string,
    name: string,
    costCentre: number
}

export interface Shipment{
    id:string,
    truckNumber: string
    pickUpDate: Date,
    deliveryDate: Date
}

export interface OrderPostOrPut {
    lotName: string,
    orderType: number,
    packingType: number,
    goodsQuantity: number,
    dimensions: string,
    weight: number
    stackability: number,
    route: string
    pickUpDate: string,
    deliveryDate: string,
    costCenterId: string,
    goodsGL: number,
    goodsType: string
    notes: string
}

export interface Stackability{
    name: string,
    value: number
}

export interface PackingType{
    name: string,
    value: number
}

export interface OrderType{
    name: string,
    value: number
}