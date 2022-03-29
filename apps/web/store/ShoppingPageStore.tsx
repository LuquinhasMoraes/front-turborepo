import { ProductStore } from './ProductStore'
import { CartStore } from './CartStore'
import { flow, types } from 'mobx-state-tree'
import { useFetch } from '../helper/useFetcher';

export const ShoppingPageStore = types
.model('ShoppingPageStore', {
    __typename: types.optional(types.literal('ShoppingPageStore'), 'ShoppingPageStore'),
    title: 'Shopping Huia',
    products: types.optional(types.array(ProductStore), []),
    cart: types.optional(CartStore, {})
}).actions(self => ({
    fetchProducts: flow( function* () {
        try {
            const { data, error } = useFetch(`https://mocki.io/v1/d42b230d-0cb0-470b-a1db-ae7524425f26`);
            self.products = data
        } catch (error) {
            console.error('Error when fetch api', error)
        }
    }),
    setProducts: (products) => {
        self.products = products
    }
}))
    