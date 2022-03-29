import { FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import { parseNumberToCurrencyString } from "../helper/currencies";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ItemOrder from "./ItemOrder";
import { Input } from "./Input";
import Totals from "./Totals";
import Loading from "./Loading";

const FooterCart = ({store}) => {
    
  const [modalShow, setModalShow] = useState(false);
    const { currentView } = store
    const { order } = currentView.cart

    const onHandleClickFooterCart = () => {
        setModalShow(true)
    }

    const onHandleFinalize = (): void => {
        order.finalizePurchase()
        setModalShow(false)
    }
    return (
        <>
            <Modal
                show={modalShow}
                style={{width: '100%'}}
                onHide={() => setModalShow(false)}
                size="xl"
                centered>
                <Loading isShow={store.isLoading} />
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <FaShoppingCart style={{color: '#60A12D'}} /> Carrinho 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input order={order} />
                    <ItemOrder order={order} />
                </Modal.Body>
                <Container className="d-grid gap-2 pb-2" >
                    <Totals order={order} />
                    <Button variant="secondary" size="lg" onClick={() => onHandleFinalize()}>
                        FINALIZAR COMPRA
                    </Button>
                </Container>
                
            
            </Modal>

            <div className="d-block d-md-none footer-cart" onClick={() => onHandleClickFooterCart()}>
                <Container fluid>
                <Row style={{padding: 15}}>
                    <Col style={{display: 'flex', justifyContent: 'flex-start'}} >
                    <h1><FaShoppingCart style={{color: '#60A12D'}} /> Carrinho</h1>
                    </Col>
                    <Col>
                    <h5 style={{textAlign: 'right'}}>Total</h5>
                    <h3 style={{textAlign: 'right', marginTop: -10}}>{parseNumberToCurrencyString(currentView.cart.order.getTotals())}</h3>
                    </Col>
                </Row>
                </Container>
            </div>
        </>
    )
}

export default observer(FooterCart)



