import { ProductStore } from './ProductStore'
import { CartStore } from './CartStore'
import { types } from 'mobx-state-tree'

export const ShoppingPageStore = types
.model('ShoppingPageStore', {
    __typename: types.optional(types.literal('ShoppingPageStore'), 'ShoppingPageStore'),
    title: 'Shopping Huia',
    products: types.optional(ProductStore, {}),
    cart: types.optional(CartStore, {})
})
    