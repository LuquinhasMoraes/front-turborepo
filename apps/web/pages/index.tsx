import { getSnapshot } from "mobx-state-tree";
import { useState } from "react";
import { Button, Card, Col, Container, Modal, Row, ThemeProvider } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Cart from '../components/Cart';
import FooterCart from "../components/FooterCart";
import ProductCard from '../components/ProductCard';
import { parseNumberToCurrencyString } from "../helper/currencies";
import { Product, Products } from '../models/Product';
import { ShoppingPageStore } from "../store/ShoppingPageStore";
import { initializeStore, useStore } from '../store/Store'

export default function Web(props: any) {
  const store = useStore(props.initialSnapshot)
  const { products } = props
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
      <section>
        <Container fluid>
          <Row style={{padding: 20}}>
            <Col md={8}>
              <header style={{background: 'url(./bg.jpg)', height: 153, width: '100%', color: 'white', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', width: '100%', height: '100%'}}>
                  <h1 style={{textAlign: 'center'}}>Huia - Teste Desenvolvimento Front-End</h1>
                </div>
              </header>
              <main>
                <Row>
                  {
                    products.map((p: Product, index: number) => {
                      return (
                        <Col key={index} sm={6} xs={12} md={6} lg={6} xl={6} xxl={4} className={'mt-4'}>
                          <ProductCard store={store} data={p} />
                        </Col>
                      )
                    })
                  }
                </Row>
              </main>
            </Col>
            <Col md={4} className="shopcart">
              <Cart store={store}/>
            </Col>
          </Row>
        </Container>

        <FooterCart store={store} />
      </section>
      <div className="full-cart">
        <Cart store={store}/>                  
      </div>          
      </ThemeProvider>
  );
}

export async function getStaticProps() {
  const store = initializeStore()
  const view = ShoppingPageStore.create()
  store.setCurrentView(view)
  return {
    props: {
      initialSnapshot: getSnapshot(store),
      products: await view.products.fetchProducts()
    }
  }
}