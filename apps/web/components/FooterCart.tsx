import { FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import { parseNumberToCurrencyString } from "../helper/currencies";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ItemOrder from "./ItemOrder";

const FooterCart = ({store}) => {
    
  const [modalShow, setModalShow] = useState(false);
    const { currentView } = store

    const onHandleClickFooterCart = () => {
        setModalShow(true)
    }
    return (
        <>
            <Modal
                show={modalShow}
                style={{width: '100%'}}
                onHide={() => setModalShow(false)}
                size="xl"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FaShoppingCart style={{color: '#60A12D'}} /> Carrinho 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemOrder order={currentView.cart.order} />
                </Modal.Body>
                <Modal.Footer>
                    <Button >Close</Button>
                </Modal.Footer>
            </Modal>

            <div style={{
                width: '100%',
                height: '85px',
                background: 'white',
                position: 'fixed',
                bottom: 0,
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.4)',
                display: 'none'
            }} className="d-block d-md-none" onClick={() => onHandleClickFooterCart()}>
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

