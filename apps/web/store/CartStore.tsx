import { IAnyModelType, IMSTArray, types } from "mobx-state-tree";
import { Product } from "../models/Product";
import { ProductStore } from "./ProductStore";

const OrderStore = types.model('OrderStore', {
    id: types.optional(types.number, 0),
    items: types.optional(types.array(ProductStore), []),
    total: types.optional(types.number, 0),
    subtotal: types.optional(types.number, 0),
    frete: types.optional(types.number, 12),
}).actions(self => ({
    add: (product: IAnyModelType) => {
        self.items.push(product)
    },
    finalizePurchase: () => {
        self.items = []
    }
})).views(self => ({
    getTotals(): any {
         const prices = self.items.map(item => item.price)
        
        return prices.length > 0 ? prices.reduce((a: number, b: number) => {
            return a + b
        }) + self.frete : 0
    },
    getSubtotals(): any {
        const prices = self.items.map(item => item.price)
       
       return prices.length > 0 ? prices.reduce((a: number, b: number) => {
           return a + b
       }) : 0
   },
    checkIsAlready(id: number) {
        const isAlready = self.items.filter(i => i.id === id).length > 0
        console.log(isAlready)
        return isAlready
        
    }
}))

export const CartStore = types.model('CartStore', {
    order: types.optional( OrderStore, {})
})