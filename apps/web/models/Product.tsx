export interface Product {
    id: number;
    title: string;
    img: string;
    description: string;
    price: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    diameter: number;
    rating: number;
}

export const ProductMock: Product = {
  id: 1,
  img: '',
  title: 'Product', 
  description: 'Description',
  diameter: 2,
  height: 1,
  length: 11,
  price: 111.00,
  rating: 5,
  weight: 2,
  width: 16
}

export const Products: Array<Product> = [
    {
      id: 1,
      title: 'Nome produto',
      img: './img1.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    },
    {
      id: 2,
      title: 'Nome produto',
      img: './img2.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    },
    {
      id: 3,
      title: 'Nome produto',
      img: './img3.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    },
    {
      id: 4,
      title: 'Nome produto',
      img: './img4.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    },
    {
      id: 5,
      title: 'Nome produto',
      img: './img5.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    },
    {
      id: 6,
      title: 'Nome produto',
      img: './img6.png',
      description: 'Descrição do produto',
      diameter: 5,
      height: 1,
      width: 11,
      length: 16,
      price: 10,
      rating: 5,
      weight: 2 
    }
  ]