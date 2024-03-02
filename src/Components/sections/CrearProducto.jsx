//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
//import { validarCategoria } from '../../helpers/validaciones';
import Form from 'react-bootstrap/Form';
import clsx from 'clsx';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const CrearProducto = () => {
    //los productos van a tener las siguiengtes propiedades:titulo, descripcion, categoria, ademas va a tener un identificador unico;
// const[title, setTitle]= useState("");
// const[description, setDescription]= useState("");
// const[category, setCategory]= useState("");

//UTILIZAMOS LA VARIABLE DE ENTORNO
const API=import.meta.env.VITE_API;
//UTILIZAMOS USENAVIGATE DE REACT-ROUTER-DOM
const navigate=useNavigate();

const ProductoSchema = Yup.object().shape({
    title: Yup.string().min(4, "minimo 4 caracteres").max(20, "maximo 20 caracteres").required("El titulo es requerido"),
    description: Yup.string().min(4, "minimo 4 caracteres").max(200, "maximo 200 caracteres").required("La descripcion es requerida"),
    category: Yup.string().required("La categoria es requerida")
});
const initialValues={
    title:"",
    description:"",
    category:"",
};

//Inicio conf formik
const formik= useFormik({
     initialValues,
     validationSchema:ProductoSchema,
     validateOnBlur: true,
     validateOnChange: true,
     onSubmit: (values)=>{
        console.log("values de Formik-->",values);
        Swal.fire({
            title: "Estas seguro de guardar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar"
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response= await fetch(`${API}/productos`,{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    });
                    //console.log("Response--",response);
                    //console.log(response.status);
                    if (response.status===201) {
                        formik.resetForm();           
                    Swal.fire({
                     title: "Exito!",
                     text: "Se creo un nuevo producto",
                     icon: "success"
                    });
                    navigate("/administracion")
                    }
                } catch (error) {
                    console.log("ERROR--",error);
                }

            }
          });
        
   
     }
});
//fin config formik

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
            <Button variant='secondary' onClick={()=>navigate(-1)} >Atras</Button>
            <div className='text-center'><h2>Crear Productos</h2></div>
            < Form onSubmit={formik.handleSubmit}>
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
        name='description'
        {...formik.getFieldProps("description")}
        className={clsx("form-control",{ 
        "is-invalid": formik.touched.description && formik.errors.description
        },
        {
        "is-valid": formik.touched.description && !formik.errors.description
        }  )}
         />
         {formik.touched.description && formik.errors.description && (
            <div className='mt-2 text-danger fw-bolder'>
                <span role='alert'>{formik.errors.description}</span>
            </div>
        )}
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
    name='category'
        {...formik.getFieldProps("category")}
        className={clsx("form-control",{ 
        "is-invalid": formik.touched.category && formik.errors.category
        },
        {
        "is-valid": formik.touched.category && !formik.errors.category
        }  )}                  
    >
      <option value="">Seleccione una categoria</option>
      <option value="Bebidas">Bebidas</option>
      <option value="Alimentos">Alimentos</option>
      <option value="Limpieza">Limpieza</option>
    </Form.Select>
    {formik.touched.category && formik.errors.category && (
            <div className='mt-2 text-danger fw-bolder'>
                <span role='alert'>{formik.errors.category}</span>
            </div>
        )}
    </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
        </div>
    );
};

export default CrearProducto;