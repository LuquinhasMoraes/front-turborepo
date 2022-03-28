import { observer } from "mobx-react-lite"
import { Col, Row } from "react-bootstrap"
import { parseNumberToCurrencyString } from "../helper/currencies"

const Totals = ({order}) => {
    return (
        <>
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
                    <h3>{parseNumberToCurrencyString(order.frete.value)}</h3>
                </Col>
            </Row>
        </>
    )
} 

export default observer(Totals)