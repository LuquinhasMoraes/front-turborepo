import { cast, IAnyModelType, IMSTArray, types } from "mobx-state-tree";
import { Product } from "../models/Product";
import { OrderItemStore } from "./OrderItem";
import { ProductStore } from "./ProductStore";

const OrderStore = types.model('OrderStore', {
    id: types.optional(types.number, 0),
    items: types.optional(types.array(OrderItemStore), []),
    total: types.optional(types.number, 0),
    subtotal: types.optional(types.number, 0),
    frete: types.optional(types.number, 12),
}).actions(self => ({
    add: (product: IAnyModelType) => {
        self.items.push(product)
    },
    finalizePurchase: () => {
        self.items = cast([])
    }
})).views(self => ({
    getTotals(): any {
        const totals = self.items.map(item => item.getTotal())  
        
        return totals.length > 0 ? totals.reduce((a: number, b: number) => {
            return a + b
        }) + self.frete : 0
    },
    getSubtotals(): any {
        const totals = self.items.map(item => item.getTotal())
       
        return totals.length > 0 ? totals.reduce((a: number, b: number) => {
           return a + b
        }) : 0
    },
    getOrderItems: () => {
        return self.items.filter(item => item.qtd > 0)
    },
    checkIsAlready(id: number) {
        const isAlready = self.items.filter(i => i.id === id && i.qtd > 0).length > 0
        return isAlready 
    }
}))

export const CartStore = types.model('CartStore', {
    order: types.optional( OrderStore, {})
})