import { flow, types } from "mobx-state-tree";

export const ProductStore = types.model('ProductStore', {
    id: types.optional(types.number, 0),
    title: types.optional(types.string, ''),
    img: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    price: types.optional(types.number, 0),
    weight: types.optional(types.number, 0),
    width: types.optional(types.number, 0),
    length: types.optional(types.number, 0),
    height: types.optional(types.number, 0),
    diameter: types.optional(types.number, 0),
    rating: types.optional(types.number, 0)
}).actions(self => ({
    // fetchProducts: flow( function* () {
    //     try {
    //         const res = yield fetch(`https://mocki.io/v1/90bca8ec-9bed-40a3-8202-10ad5622fa1b`)
    //         return res.json()
    //     } catch (error) {
    //         console.error('Error when fetch api', error)
    //     }
    // })
}))