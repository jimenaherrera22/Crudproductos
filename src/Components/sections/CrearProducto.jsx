import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const CrearProducto = () => {
    //los productos van a tener las siguiengtes propiedades:titulo, descripcion, categoria, ademas va a tener un identificador unico;
const handleSubmit=(e)=>{
    e.preventDefault();
}
    return (
        <div className='container my-3 py-3'>
            <div className='text-center'><h2>Crear Productos</h2></div>
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Titulo</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el titulo del producto" minLength={4} maxLength={20} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" placeholder="Ingrese una descripcion" as="textarea" rows={3} minLength={4} maxLength={200} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
      <Form.Label>Categoria</Form.Label>
      <Form.Select aria-label="category">
      <option value="">Seleccione una categoria</option>
      <option value="Bebidas">Bebidas</option>
      <option value="Alimentos">Alimentos</option>
      <option value="Limpieza">Limpieza</option>
    </Form.Select>
    </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
        </div>
    );
};

export default CrearProducto;