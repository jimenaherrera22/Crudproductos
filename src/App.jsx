import NavBar from "./Components/NavBar"
import Foot from "./Components/Foot"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Pages/Home"
import AcercadeNosotros from "./Components/Pages/AcercadeNosotros"
import Administracion from "./Components/Pages/Administracion"
import CrearProducto from "./Components/sections/CrearProducto"
import Editar from "./Components/sections/Editar"

function App() {

  return (
    <>
     <BrowserRouter>
    <header>
      <NavBar></NavBar>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/acercadenosotros" element={<AcercadeNosotros/>}/>
        <Route path="/administracion" element={<Administracion/>}/>
        <Route path="/crear-producto" element={<CrearProducto/>}/>
        <Route path="/editar/:id" element={<Editar/>}/>
      </Routes>  
    </main>
    <footer>
      <Foot></Foot>
    </footer>
    </BrowserRouter>
    </>
  )
}

export default App
