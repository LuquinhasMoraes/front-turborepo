import { cast, flow, IAnyModelType, IMSTArray, types, getSnapshot, destroy, getRoot } from "mobx-state-tree";
import { Product } from "../models/Product";
import { OrderItemStore } from "./OrderItem";
import { ProductStore } from "./ProductStore";

const FreteStore = types.model('FreteStore', {
    cep: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    value: types.optional(types.number, 0),
}).actions(self => ({
    setCEP: (cep) => {
        self.cep = cep
    },
    setFrete: (frete) => {
        self.name = frete.name
        self.value = parseFloat(frete.valorSemAdicionais.replace(/,/g, '.'))
    },
    resetFrete: () => {
        self.name = ''
        self.value = 0
    }
}))

const OrderStore = types.model('OrderStore', {
    id: types.optional(types.number, 0),
    items: types.optional(types.array(OrderItemStore), []),
    total: types.optional(types.number, 0),
    subtotal: types.optional(types.number, 0),
    frete: types.optional(FreteStore, {}),
}).actions(self => ({
    add: (product) => {
        self.items.push(getSnapshot(product))
        // self.calculateCEP()
    },
    finalizePurchase: () => {
        self.items = cast([])
        self.frete.resetFrete()
    },
    deleteOrderItem: (item) => {
        destroy(item)
    },
    calculateCEP: flow (function* () {
        console.log('calculando cep');
        
        if(self.items.length > 0 && self.frete.cep.length > 0) {
            const store: any = getRoot(self)
            store.setLoading(true)
            let frete: any = null

            let peso = 0
            let comprimento = 0
            let altura = 0
            let largura = 0
            let diametro = 0

            self.items.filter(item => item.qtd > 0).forEach(item => {
                peso += item.weight * item.qtd
                comprimento += item.length * item.qtd
                altura += item.height * item.qtd
                largura += item.width * item.qtd
                diametro += item.diameter * item.qtd
            })

            if(peso === 0 || comprimento === 0 || altura === 0 || largura === 0 || diametro === 0) {
                self.frete.resetFrete()
                return
            }

            const body: any = {
                peso: peso, 
                comprimento: comprimento, 
                altura: altura, 
                largura: largura, 
                diametro: diametro, 
                cep: self.frete.cep
            }
            
            yield fetch(process.env.NEXT_PUBLIC_BASE_URL + 'api/frete', {
                method: 'POST',
                body: JSON.stringify(body)
            }).then(res => res.json()).then(j => {
                frete = j[0]
                store.setLoading(false)
            })
            self.frete.setFrete(frete)
        } else 
            self.frete.resetFrete()
    }),
    
})).views(self => ({
    getTotals(): any {
        const totals = self.items.map(item => item.getTotal())  
        
        return totals.length > 0 ? totals.reduce((a: number, b: number) => {
            return a + b
        }) + self.frete.value : 0
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