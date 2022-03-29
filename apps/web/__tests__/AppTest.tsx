import RootStore from '../store/RootStore'
import { Product, ProductMock, Products } from '../models/Product'
const store = RootStore.create()
const { cart } = store.currentView

test('adds item in cart', () => {
    cart.order.add(ProductMock)
    expect(cart.order.items.length).toBe(1);
});

test('increase product order', () => {
    cart.order.items[0].add()
    expect(cart.order.items[0].qtd).toBe(2);
});

test('decrease product order', () => {
    cart.order.items[0].remove()
    expect(cart.order.items[0].qtd).toBe(1);
});