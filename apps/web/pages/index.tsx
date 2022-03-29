import { getSnapshot } from "mobx-state-tree";
import { useState } from "react";
import { Button, Card, Col, Container, Modal, Row, ThemeProvider } from "react-bootstrap";
import Cart from 'ui/components/Cart';
import FooterCart from "../components/FooterCart";
import { Header } from "../components/Header";
import ProductCard from '../components/ProductCard';
import { useFetch } from "../helper/useFetcher";
// import { useFetch } from "../helper/useFetcher";
import { Product, Products } from '../models/Product';
import { ShoppingPageStore } from "../store/ShoppingPageStore";
import { initializeStore, useStore } from '../store/Store'

export default function Web(props: any) {
  const store = useStore(props.initialSnapshot)
  const { data } = useFetch(`https://mocki.io/v1/d42b230d-0cb0-470b-a1db-ae7524425f26`);
  store.currentView.setProducts(data)
  
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
      <section>
        <Container fluid>
          <Row style={{padding: 20}} className="row-content">
            <Col md={8}>
              <Header />
              <main>
                <Row>
                  {
                    store.currentView.products.map((p: Product, index: number) => {
                      return (
                        <Col key={index} sm={6} xs={12} md={6} lg={6} xl={6} xxl={4} className={'mt-4'}>
                          <ProductCard key={index} store={store} data={p} />
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
      products: []
    }
  }
}