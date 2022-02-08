import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login.vue';
import Registro from '../components/Registro/Registro.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Facturas from "../components/Facturas/Facturas.vue";
import DetalleFactura from "../components/DetalleFactura/DetalleFactura.vue";




Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: Registro
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: {}
  },
  
  {
    path: "/facturas",
    name: "facturas",
    component: Facturas
  },
  {
    path: "/detalle-factura/:id",
    name: "factura",
    component: DetalleFactura
  },
    
]
const router = new VueRouter({
  mode: "history",
  routes
});

export default router
