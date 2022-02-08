import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default {
    
    data() {
        return {    
            search: '',          
            headers: [
                {
                  text: 'ID',
                  align: 'start',
                  sortable: true,
                  value: 'id',
                },
                { text: 'Descripción', value: 'descripcion' },
                { text: 'Precio/Unidad', value: 'precio' }, 
                { text: 'Cantidad', value: 'cantidad' },                         
            ], 
            products:[],//lista los productos disponibles para comprar
           
            addedProduct:[],// muestra los productos que han sido agregados para su venta
            name:'',//nombre del comprador  
            nit:'',//nit del comprador
            total:0.00,//Total a pagar sin IVA
            iva:0.00,//IVA
            totalAndIva:0.00, //total a pagar mas  IVA

            buttonInvoice:false,// ocultamos el botón hasta que haya elementos en el carrito
            inputErrors:[], // se guardan los errores de validacion y los muestra en los iputs correspondientes
            disableButton:false, //una vez generarada la factura se desactiva al obtener la respuesta del servidor
            loader:false, //loader del botón buttonInvoice para generar la factura
            alertSuccess:false,//contenedor de alerta cuando se  generacion de factura
            generateInvoiceMessage:'',//muestra el mensaje de factura
        };
    },

    

    methods: {       
        
        addProducts(){
            this.addedProduct = []

            //recorro los productos que estan en la lista 
            for (let i = 0; i < this.products.length; i++) {  

                
                let val = document.getElementById('item'+this.products[i].id).value; 
                // si el valor de la cantidad del item seleccionado es mayor a cero se agrega al carrito        
                if(val > 0){
                    let objAdded = {
                        id:this.products[i].id,     
                        descripcion:this.products[i].descripcion,                
                        cantidad:val,
                        precio_venta:this.products[i].precio,
                        total_cantidad: (val * this.products[i].precio).toFixed(2)
                    }
                    //arreglo de productos en el carrito
                    this.addedProduct.push(objAdded)             
               }   
            }
            
           
            this.totalToPay()
            // Mostrar el botón para generar la factura si hay productos en el carrito
            if(this.addedProduct.length > 0){
                this.buttonInvoice = true
            }else{
                this.buttonInvoice = false
            }
            
            
        },
         
        // elimino un producto del carrito
        removeProduct(index){  
            this.addedProduct.splice(index,1) 
            this.totalToPay()
            if(this.addedProduct.length < 1){
                // como no hay productos seleccionados el boton de generar factura se oculta
                this.buttonInvoice = false 
            }
        },

        // muestro el total a pagar + iva 
        totalToPay(){
            let total = 0
            for (let i = 0; i < this.addedProduct.length; i++) {
                total += parseFloat(this.addedProduct[i].total_cantidad);           
            }
            this.total = total.toFixed(2)
            this.iva = (total*0.10).toFixed(2)
            this.totalAndIva = (parseFloat(this.total) + parseFloat(this.iva) ).toFixed(2)
             
        },
        
        // listo los productos
        async  listProducts(){
            let config = {
                headers: {                  
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',     
                }
            }
          
            try{
                const res = await axios.get('/items',config)              
                this.products = res.data.items 
            }catch(error){
                if (error.response) {
                    console.log(error.response.data);  
                }
            }
        },
        
        
        //genero factura
        async  generateInvoice(){
            this.inputErrors = []
            this.disableButton = true 
            this.loader = true
            let formData = new  FormData();
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
            formData.append('comprador_nombre', this.name)
            formData.append('comprador_nit', this.nit)
            //obtengo los productos agregados al carrito y los envio en formato json
            // al backend para que se guarden en la tabla item_facturas
            formData.append('items',JSON.stringify(this.addedProduct) )
            
           
            try{
                const res = await axios.post('/auth/crear-factura',formData,config)
                //una vez da respuesta positiva vacio el carrito y los inputs              
                console.log(res.data)
                this.disableButton = false 
                this.loader = false
                this.addedProduct = []
                this.name = ''
                this.nit = ''
                this.total = 0
                this.iva = 0
                this.totalAndIva = 0

                /*this.$store.commit("alert", {
                    color: "success",
                    text:
                    res.data.message
                });*/
                this.alertSuccess = true
                setTimeout(() => {
                    this.alertSuccess = false;    
                },5000)
                this.generateInvoiceMessage = res.data.message
                
                for (let i = 0; i < this.products.length; i++) { 
                    // limpio los inputs de la lista de productos      
                    document.getElementById('item'+this.products[i].id).value = '';
                }
                this.buttonInvoice = false 
            }catch(error){
                this.disableButton = false  
                this.loader = false
                this.alertSuccess = false
                if (error.response) {
                    this.inputErrors.push(
                        error.response.data.error.comprador_nombre,
                        error.response.data.error.comprador_nit          
                    )
                    console.log(error.response.data);
                     
                }
            }
        }

           
    },
    mounted() {
        if(!this.$store.state.auth){
            return this.$router.replace('/');    
        } 
        this.listProducts()
    }
}

