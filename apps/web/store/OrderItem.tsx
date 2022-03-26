import { flow, types } from "mobx-state-tree";

export const OrderItemStore = types.model('OrderItemStore', {
    id: types.optional(types.number, 0),
    title: types.optional(types.string, ''),
    img: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    price: types.optional(types.number, 0),
    weight: types.optional(types.number, 0),
    length: types.optional(types.number, 0),
    height: types.optional(types.number, 0),
    diameter: types.optional(types.number, 0),
    rating: types.optional(types.number, 0),
    qtd: types.optional(types.number, 1)
}).actions(self => ({
    add: () => {
        try {
            self.qtd += 1
        } catch (error) {
            console.error('Error when add', error)
        }
    },
    remove: () => {
        try {
            self.qtd -= 1
        } catch (error) {
            console.error('Error when remove', error)
        }
    }
})).views(self => ({
    getTotal() {
        return self.price * self.qtd
    }
}))