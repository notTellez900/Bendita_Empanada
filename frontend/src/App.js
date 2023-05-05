import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/footer';

import Home from './pantallas/Home';
import Productos from './pantallas/Productos';
import Producto from './pantallas/Producto';
import Carrito from './pantallas/Carrito';
import Login from './pantallas/Login';
import Register from './pantallas/Register';
import Perfil from './pantallas/Perfil';
import Shipping from './pantallas/Shipping';
import MetodoPago from './pantallas/MetodoPago';
import RealizarPedido from './pantallas/RealizarPedido'
import Orden from './pantallas/Orden'
import ListaUsuarios from './pantallas/ListaUsuarios'
import EditarUsuario from './pantallas/EditarUsuario'
import ListaProductos from './pantallas/ListaProductos'
import EditarProducto from './pantallas/EditarProducto'
import ListaOrdenes from './pantallas/ListaOrdenes'



function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Perfil />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/placeorder' element={<RealizarPedido />} />
            <Route path='/order/:id' element={<Orden />} />
            <Route path='/payment' element={<MetodoPago />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/producto/:id' element={<Producto />} />
            <Route path='/cart/:id?' element={<Carrito />} />

            <Route path='/admin/userlist' element={<ListaUsuarios />} />
            <Route path='/admin/productlist' element={<ListaProductos />} />
            <Route path='/admin/orderlist' element={<ListaOrdenes />} />

            <Route path='/admin/user/:id/edit' element={<EditarUsuario />} />
            <Route path='/admin/producto/:id/edit' element={<EditarProducto />} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
