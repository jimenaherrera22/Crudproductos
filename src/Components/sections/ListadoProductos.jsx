import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Producto from './Producto';
import ModalEditar from './ModalEditar';

const ListadoProductos = () => {
    const [productos, setProductos]=useState([]);
    const [show, setShow] = useState(false);
  const [productEdit, setProductEdit]=useState(undefined);
  const handleClose = () => {
    setProductEdit(undefined);
    setShow(false)};
  const handleShow = (prod) => {
    setProductEdit(prod)
    setShow(true) 
  };
    const API=import.meta.env.VITE_API;
    const getProductos=async()=>{
        try {
            const response=await fetch(`${API}/productos`);
            const resJson=await response.json();
            //console.log("RESJSON--",resJson);
            setProductos(resJson)
        } catch (error) {
            console.log("ERROR-->",error);
        }
    };
    useEffect(()=>{
     getProductos()
     return()=>{
        setProductos([]);
     }
    },[])
   //console.log("state productos",productos);
    return (
      <>
      <ModalEditar show={show} handleClose={handleClose} producto={productEdit} getProductos={getProductos} />
        <div className='container-fluid'>
            <div className='text-center'>
          <h2>Listado Productos</h2>
            </div>
            <div className='table-responsive'>
          <Table striped bordered hover variant='dark' >
      <thead>
        <tr>
          <th>Id</th>
          <th>Titulo</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((element, index)=>{
            return(
                <Producto
                 producto={element} handleShow={handleShow} key={index} getProductos={getProductos} />
            );
        })};
      </tbody>
    </Table>  
    </div>
        </div>
        </>
    );
};

export default ListadoProductos;