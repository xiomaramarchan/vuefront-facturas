import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default {

   data() {
        return {    
            
            detalle:{},
            productosFactura:[],
            search:'', 
            total:0,
            iva:0,
            totalIva:0,
            dialog:false,

           

            //instancia modelos 
            numeroFactura:0,
            nombreVendedor:'',
            nitVendedor:'',
            nombreComprador:'',
            nitComprador:0,
            fechaFactura:'',
            horaFactura:'',  

            inputErrors:[], //Errores de validacion
            
            alertSuccess:false,//oculto por defecto el contendor del alerta de exito al registrarte y lo muestro cuando da respuesta positiva
            alertSuccessMessage:"",

        };
    },

    computed: {
        //filtro los productos
        /*searchProduct() {
            return this.productosFactura.filter((item) => {
                return item.descripcion.toLowerCase().includes(this.search.toLowerCase()) ||
                item.precio.toString().includes(this.search) || 
                item.cantidad.toString().includes(this.search) ||
                item.precio_venta.toString().includes(this.search)
            });
        }*/

    },

    methods: {

        async  factura(){
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
          
            try{
                const res = await axios.get('/auth/factura/'+this.$route.params.id,config)              
                
                this.detalle = res.data.factura
                
                this.productosFactura = res.data.itemsFactura
                
                this.totalFactura()

                this.numeroFactura = res.data.factura.numero
                this.nombreVendedor = res.data.factura.name
                this.nitVendedor = res.data.factura.nit
                this.nombreComprador = res.data.factura.comprador_nombre
                this.nitComprador = res.data.factura.comprador_nit

                let fecha = res.data.factura.fecha.split("/")
                let dateOrdened = fecha[2]+"-"+fecha[1]+"-"+fecha[0]
                this.fechaFactura = dateOrdened
                this.horaFactura = res.data.factura.hora

                console.log(this.detalle)
            }catch(error){
                if (error.response) {                    
                    console.log(error.response.data);  
                }
            }
        },

        totalFactura(){
            let total = 0
            for (let i = 0; i < this.productosFactura.length; i++) {
                total += parseFloat(this.productosFactura[i].precio_venta);           
            }
            this.total = total.toFixed(2)
            this.iva = (total*0.10).toFixed(2)
            this.totalIva = (parseFloat(this.total) + parseFloat(this.iva) ).toFixed(2)
             
        },


           
    },
    mounted() {
        if(!this.$store.state.auth){
            return this.$router.replace('/');    
        } 
        this.factura()
    }
}


