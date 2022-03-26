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
        let element = document.querySelector('.full-cart')
        element.setAttribute("style", "display: none");
    }

    return (
        <div style={{background: '#eee'}}>


                <Row style={{padding: 10}}>
                    <Col xs={11}>
                        <h1>
                            <FaShoppingCart style={{color: '#60A12D'}} /> Carrinho 
                        </h1>
                    </Col>
                    <Col xs={1}>
                        <h1>
                            <MdClose />
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
                        {
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
                        }
                    </section>


                    <div style={{position: 'absolute', bottom: 20, width: '100%', paddingRight: '60px'}}>
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
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default observer(Cart)