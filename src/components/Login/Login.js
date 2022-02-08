export default {
   data(){
       return{          
           form:{
               email:"",
               password:"",
           },
           Email:'Email',
           Password:'Password',
           //loading:'loading',
           
           loader:false,
           
           
       }
   },
   
   
   methods:{
       async login(){
           this.loader = true
           await this.$store.dispatch("login", this.form);  
           this.loader = false
           if(this.$store.state.auth){            
               return this.$router.replace('/dashboard');    
           } 
       },      

   },

   mounted() {   
       this.$store.dispatch("resetState");                               
       if(this.$store.state.auth){
           return this.$router.replace('/dashboard');    
       }    		           
   } 
}