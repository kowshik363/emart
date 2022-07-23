import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';

function Product(props) {
  const { product } = props;

  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img className="class-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <Card.Text>{product.price}</Card.Text>
        <Button>ADD TO CART</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
