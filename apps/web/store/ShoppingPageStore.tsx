import { ProductStore } from './ProductStore'
import { CartStore } from './CartStore'
import { flow, types } from 'mobx-state-tree'

export const ShoppingPageStore = types
.model('ShoppingPageStore', {
    __typename: types.optional(types.literal('ShoppingPageStore'), 'ShoppingPageStore'),
    title: 'Shopping Huia',
    products: types.optional(types.array(ProductStore), []),
    cart: types.optional(CartStore, {})
}).actions(self => ({
    fetchProducts: flow( function* () {
        try {
            const res = yield fetch(`https://mocki.io/v1/ccbff84c-8de9-4147-8eff-09c211026aa0`)
            self.products = yield res.json()
        } catch (error) {
            console.error('Error when fetch api', error)
        }
    })
}))
    