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


function ItemOrder({ order }) {
    return (
            order.items.map((o: Product, index: number) => {
                return (
                    <Row className="mt-3" key={index}>
                        <Col md={12} className="d-flex">
                            {/* <img src={o.img} alt="" style={{width: 200, height: 250, background: 'cover'}} /> */}
                            <div style={{ width: 270, height: 150, background: `url(${o.img})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}></div>
                            <div style={{width: '100%', padding: 20, background: '#eee', position: 'relative'}}>
                                <h3>{o.title}</h3>
                                <span>{o.description}</span>

                                <div style={{position: 'absolute', bottom: 15, right: 15}}>
                                    <Button>+</Button>
                                    <span>1</span>
                                    <Button>+</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
            })
    )
        
}

export default observer(ItemOrder)