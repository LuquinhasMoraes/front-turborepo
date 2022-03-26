import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { FaMinus, FaPlus, FaShoppingCart, FaTrash, FaTrashAlt } from "react-icons/fa"
import { observer } from "mobx-react-lite"
import { getSnapshot } from 'mobx-state-tree'
import {calcularPrecoPrazo, consultarCep, rastrearEncomendas} from 'correios-brasil';
import { useEffect } from "react"
import { parseNumberToCurrencyString } from "../helper/currencies"

const Empty = () => {
    return (
        <Container >
            <Row>
                <Col md={12} style={{display: 'flex', justifyContent: 'center', height: 300}}>
                    <img src="/empty.png" width={200} alt="" style={{alignSelf: 'center'}} />
                </Col>
            </Row>
            <Row>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <h5>Que pena, não há itens no carrinho ;/</h5>    
                </Col>
            </Row>
        </Container>
    )
}

function ItemOrder({ order }) {
    const items = order.getOrderItems()
    return (
            items.length < 1 ? <Empty /> :
            items.map((o, index: number) => {
                return (
                    <Row className="mt-3" key={index}>
                        <Col md={12} className="d-flex">
                            <div style={{ width: 270, height: 150, background: `url(${o.img})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}></div>
                            <div style={{width: '100%', padding: 20, background: '#eee', position: 'relative'}}>
                                <h3>{o.title}</h3>
                                <span>{o.description}</span>

                                <div style={{position: 'absolute', bottom: 15, right: 15, background: '#60A12D', color: 'white'}}>
                                    <Button onClick={() => o.remove()} size="sm"> 
                                        {
                                            o.qtd > 1 
                                            ? 
                                            <FaMinus size={10} />
                                            :
                                            <FaTrash size={12} />
                                        }
                                    </Button>
                                    <span>{o.qtd}</span>
                                    <Button onClick={() => o.add()} size="sm"><FaPlus size={10} /></Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
            })
    )
        
}

export default observer(ItemOrder)