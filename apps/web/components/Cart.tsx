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


function Cart({ store }) {

    const { currentView } = store
    
    const order = currentView.cart.order
    // Cep pode ser String ou Number
    const cep = '06727300'; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve

    let args = {
        // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
        sCepOrigem: '81200100',
        sCepDestino: '21770200',
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'], //Array com os códigos de serviço
        nVlDiametro: '0',
      };
      
    //   calcularPrecoPrazo(args).then((response) => {
    //     console.log(response);
    //   });

    // useEffect(async () => {
        // const res = await fetch('https://viacep.com.br/ws/11441080/json/', {
        //     method: 'GET'
        // })
        // console.log(res);
    // })

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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Digite o CEP de entrega" />
                        </Form.Group>
                    </Form>
                    
                    <section style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                        { <ItemOrder order={order} /> }
                    </section>
                    
                    

                    {/* <div style={{position: 'absolute', bottom: 20, width: '100%', paddingRight: '60px'}}>
                        <Row style={{padding: 10}}>
                            <hr />
                            <Col md={3}>
                                <h5>subtotal</h5>
                                <h3>{parseNumberToCurrencyString(order.getSubtotals())}</h3>
                                <br />
                                <h5>total</h5>
                                <h3>{parseNumberToCurrencyString(order.getTotals())}</h3>
                            </Col>
                            <Col md={9}>
                                <h5>frete</h5>
                                <h3>{parseNumberToCurrencyString(order.frete)}</h3>
                            </Col>
                        </Row>
                        <div className="d-grid gap-2" >
                            <Button variant="secondary" size="lg" onClick={() => onHandleFinalize()}>
                                FINALIZAR COMPRA
                            </Button>
                        </div>
                    </div> */}
                </Card.Body>
                <Card.Footer className="d-grid gap-2 pb-4" >
                    <Row className="d-flex">
                        <hr />
                        <Col>
                            <h5>subtotal</h5>
                            <h3>{parseNumberToCurrencyString(order.getSubtotals())}</h3>
                        </Col>
                        <Col>
                            <h5>total</h5>
                            <h3>{parseNumberToCurrencyString(order.getTotals())}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h5>frete</h5>
                            <h3>{parseNumberToCurrencyString(order.frete)}</h3>
                        </Col>
                    </Row>

                    <Button variant="secondary" size="lg" onClick={() => onHandleFinalize()}>
                        FINALIZAR COMPRA
                    </Button>
                </Card.Footer>
            
            </Card>
        </div>
    )
}

export default observer(Cart)