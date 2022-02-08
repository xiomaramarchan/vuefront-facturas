import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL


export default {
    data: () => ({
      dialogoFactura: false,
      
      //dialogDelete: false,
      headersfacturas: [
        {
          text: 'Número',
          align: 'start',
          sortable: false,
          value: 'numero',
        },       
        { text: 'Vendedor', value: 'name' },         
        { text: 'Comprador', value: 'comprador_nombre' },         
        { text: 'Nit', value: 'comprador_nit' }, 
        { text: 'Fecha', value: 'fecha' },    
        { text: 'Hora', value: 'hora' }, 
        { text: 'Acciones', value: 'actions', sortable: false },             
      ], 
      option:'',
      search:'',
      facturas: [],
      inputErrors:[], // guarda en arreglo los errores de validacion y los inprimen en su respectivo input 
      editedIndex: -1,
      editedItem: { 
        comprador: '',       
        nit: '',
        fecha: '',
        hora: 0,       
        
        
      },
      defaultItem: {
        comprador: '',
        nit: '',
        fecha: '',
        hora: '', 
        //alertSuccess:false,
       // alertSuccessMessage:"",
      },
    }),
  
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Editar Factura'
      },
    },
  
    watch: {
      dialogoFactura (val) {
        val || this.close()
      },
      /*dialogDelete (val) {
        val || this.closeDelete()
      },*/
    },
  
    created () {
      this.initialize()
    },
  
    methods: {

        //Listar todas las facturas generadas en el componente facturas
        async  initialize () {        
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
      
            try{
                const res = await axios.get('/auth/facturas',config)              
                this.facturas = res.data.facturas
            }catch(error){
                if (error.response) {
                    console.log(error.response.data);  
                }
            }
        },        
        /*Mostrará un modal con los datos de la factura a editar*/
        detalleFactura (item) {
            this.editedIndex = this.facturas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogoFactura = true
        },    
        /*deleteItem (item) {
            this.editedIndex = this.facturas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },  
        deleteItemConfirm () {
            this.facturas.splice(this.editedIndex, 1)
            this.closeDelete()
        }, */ 
        //Cerrará el modal de edición de la factura dialogoFactura
        close () {
            this.dialogoFactura = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
  
        /*closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },*/
        //metodo para editar la factura
       async save () {
            this.dialogoFactura = true
            if (this.editedIndex > -1) {
                Object.assign(this.facturas[this.editedIndex], this.editedItem);
                let config = {
                    headers: {                  
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token,       
                    }
                }
                try{
                    const res = await axios.post('/auth/editar-factura/'+ this.facturas[this.editedIndex].id, this.editedItem, config)              
                    //this.detalleFactura() 
                   
                    
                    console.log(res.data.message);                    
                    
                }catch(error){
                    if (error.response) {
                        //this.alertSuccess = false;
                        //lleno un arreglo con los errores en los inputs y asi los muestro en el html
                        this.dialogoFactura = true
                        this.inputErrors.push(                            
                            error.response.data.error.comprador_nombre,
                            error.response.data.error.comprador_nit,
                            error.response.data.error.fecha,
                            error.response.data.error.hora,
                        )
                        console.log(error.response.data);  
                    }
                }
                
            //Object.assign(this.facturas[this.editedIndex], this.editedItem)
        }
        else {
            this.facturas.push(this.editedItem)
        }
        this.close()
      },
    },
    
    mounted() {
        if(!this.$store.state.auth){
            return this.$router.replace('/');    
        }
        this.initialize()
    }

}

