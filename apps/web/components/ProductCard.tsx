import { HiStar } from "react-icons/hi";
import { Button, Card, Col, Row } from "react-bootstrap"
import { Product } from "../models/Product"
import { Rating } from "./Rating";
import { observer } from "mobx-react-lite";
import { parseNumberToCurrencyString } from "../helper/currencies";

const ProductCard = ({store, data}) => {
    const { currentView } = store
    const { cart } = currentView         
    return (
        <Card>
            <Card.Img variant="top" src={data.img} />
            <Card.Body className='card-body'>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                    {data.description}
                </Card.Text>
                
                <Row>
                    <Col md={6}>
                        <Rating rating={3} />
                    </Col>
                    <Col md={6} style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <h5>
                            {parseNumberToCurrencyString(data.price)}
                        </h5>
                    </Col>
                </Row>
            </Card.Body>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" disabled={cart.order.checkIsAlready(data.id)} onClick={() =>  { cart.order.add(data); cart.order.calculateCEP() }}>
                    ADICIONAR AO CARRINHO
                </Button>
            </div>
        </Card>
    )
}

export default observer(ProductCard)