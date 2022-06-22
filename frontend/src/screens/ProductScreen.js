import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Helmet } from 'react-helmet-async';
import Loadingbox from '../components/Loadingbox';
import Messagebox from '../components/Messagebox';
import { getErrors } from '../utils';
import { Store } from '../Store';

function ProductScreen() {
  const Navigate = useNavigate();
  const param = useParams();
  const { slug } = param;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };

      case 'FETCH_SUCCESS':
        return { ...state, loading: false, product: action.payload };

      case 'FETCH_FAILED':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: getErrors(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addtoCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countinstock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    Navigate('/cart');
  };

  return loading ? (
    <Loadingbox />
  ) : error ? (
    <Messagebox variant="danger">{error}</Messagebox>
  ) : (
    <Row>
      <Col md={6}>
        <img className="img-large" src={product.image} alt={product.name} />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h1>{product.name}</h1>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numreviews={product.numreviews} />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
        </ListGroup>
        <ListGroup.Item>
          Description: <p>{product.description}</p>
        </ListGroup.Item>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <ListGroup variamt="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countinstock > 0 ? (
                      <Badge bg="success">In stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countinstock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={addtoCartHandler} variant="primary">
                      Add to cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
export default ProductScreen;
