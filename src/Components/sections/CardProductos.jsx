import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
const CardProductos = ({producto}) => {
    return (
        <Col xs={12} md={6}>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text>
         <span className='mb-2 d-block'>{producto.description}</span> 
         <span className='fs-4 d-block'>{producto.category}</span>
        </Card.Text>
        <Button variant="primary">Ver mas</Button>
      </Card.Body>
    </Card>
        </Col>
    );
};

export default CardProductos;