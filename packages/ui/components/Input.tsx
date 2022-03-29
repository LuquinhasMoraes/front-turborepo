import { useState } from "react"
import { Form } from "react-bootstrap"

export const Input = ({order}) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Digite o CEP de entrega" onBlur={() => order.calculateFreight()} onChange={(e) => order.frete.setCEP(e.target.value)} />
            </Form.Group>
        </Form>
    )
} 