import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useState, useEffect} from "react"
import axios from 'axios';
import CardProductos from '../sections/CardProductos';

const Home = () => {
    const [productos, setProductos]=useState([]);
    const API=import.meta.env.VITE_API;
    const getProductos=async()=>{
        try {
            const response= await axios.get(`${API}/productos`);
            //console.log("RESPONSE AXIOS--",response);
            /*const products=response.data;
            setProductos(products);*/
            setProductos(response.data);

        } catch (error) {
            console.log("ERROR-->",error);
        }
    };
    useEffect(()=>{
     getProductos();

     return()=>{
        setProductos([]);
     };
    }, []);

    return (
        <>
            <div className="text-center">
            <h2>Catalogo de productos</h2>
            </div>
          <div className='my-5'>
          <Container>
          <Row>
            {productos.map((element, index)=>{
              return(
                <CardProductos producto={element} key={index}/>
              )
            })}
          </Row>
        </Container>

          </div>
        </>
    );
};

export default Home;