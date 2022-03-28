import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Product } from "../models/Product"
import { StarIcon } from '@heroicons/react/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { FaShoppingCart } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { observer } from "mobx-react-lite"
import { getSnapshot } from 'mobx-state-tree'

import {calcularPrecoPrazo, consultarCep, rastrearEncomendas} from 'correios-brasil';
import { useEffect } from "react"
import { parseNumberToCurrencyString } from "../helper/currencies"
import ItemOrder from "./ItemOrder"
import { Input } from "./Input"
import Totals from "./Totals"
// const frete = require('frete');


function Cart({ store }) {

    const { currentView } = store
    const { order } = currentView.cart
    const onHandleFinalize = () => {
        order.finalizePurchase()
    }
    return (
        <div style={{background: '#eee'}}>
            <Row style={{padding: 10}}>
                <Col xs={12}>
                    <h1>
                        <FaShoppingCart style={{color: '#60A12D'}} /> Carrinho 
                    </h1>
                </Col>
            </Row>
            <Card style={{minHeight: '93vh'}}>
                <Card.Body style={{position: 'relative'}}>
                    <Card.Title>Calcular Frete</Card.Title>
                    <Input order={order} />
                    
                    <section style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                        { <ItemOrder order={order} /> }
                    </section>

                </Card.Body>
                <Card.Footer className="d-grid gap-2 pb-4" >
                    <Totals order={order} />
                    <Button variant="secondary" size="lg" onClick={() => onHandleFinalize()}>
                        FINALIZAR COMPRA
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default observer(Cart)