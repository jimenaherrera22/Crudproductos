//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
//import { validarCategoria } from '../../helpers/validaciones';
import Form from 'react-bootstrap/Form';
import clsx from 'clsx';
import * as Yup from "yup";
import { useFormik } from 'formik';

const CrearProducto = () => {
    //los productos van a tener las siguiengtes propiedades:titulo, descripcion, categoria, ademas va a tener un identificador unico;
// const[title, setTitle]= useState("");
// const[description, setDescription]= useState("");
// const[category, setCategory]= useState("");
const ProductoSchema = Yup.object().shape({
    title: Yup.string().min(4, "minimo 4 caracteres").max(20, "maximo 20 caracteres").required("El titulo es requerido"),
    description: Yup.string().min(4).max(200).required("la descripcion es requerida"),
    category: Yup.string().required("la categoria es requerida")
});

const initialValues={
    title:"",
    description:"",
    category:"",
};

const formik= useFormik({
     initialValues,
     validationSchema:ProductoSchema,
     validateOnBlur: true,
     validateOnChange: true,
     onSubmit: (values)=>{
        console.log("values de Formik-->",values);
     }
});

/*const handleSubmit=(e)=>{
    e.preventDefault();
const nuevoProducto={
    titulo: title,
    descripcion: description,
    categoria: category,
}
console.log("el nuevo producto",nuevoProducto);
}*/
    return (
        <div className='container my-3 py-3'>
            <div className='text-center'><h2>Crear Productos</h2></div>
            <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Titulo</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el titulo del producto" minLength={4} maxLength={20}  
        /*value={title} onChange={(e)=>{
            setTitle(e.currentTarget.value);
        }}*/ 
        name='title'
        {...formik.getFieldProps("title")}
        className={clsx("form-control",{ 
        "is-invalid": formik.touched.title && formik.errors.title
        },
        {
        "is-valid": formik.touched.title && !formik.errors.title
        }  )}
        />
        {formik.touched.title && formik.errors.title && (
            <div className='mt-2 text-danger fw-bolder'>
                <span role='alert'>{formik.errors.title}</span>
            </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" placeholder="Ingrese una descripcion" as="textarea" rows={3} minLength={4} maxLength={200} 
        // value={description} onChange={(e)=>{
        //     setDescription(e.currentTarget.value);
        // }}
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
      <Form.Label>Categoria</Form.Label>
      <Form.Select aria-label="category"
    //    value={category} onChange={(e)=>{
    //     let resultado=validarCategoria(e.currentTarget.value);
    //     console.log("Resultado de validar",resultado)
    //         setCategory(e.currentTarget.value);
    //     }} className={clsx("form-select",{
    //       "is-valid": validarCategoria (category)
    //     },{
    //       "is-invalid": !validarCategoria(category)
    //     })}                      
    >
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