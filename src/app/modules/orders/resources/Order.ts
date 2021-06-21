export interface Order{
    id: string,
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
    shipment: Shipment
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