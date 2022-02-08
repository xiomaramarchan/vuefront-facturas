<template>    
   <div>
    <v-app-bar color="indigo darken-4" dense >
        <router-link class="header-href" to="/">           
        </router-link>
        <v-toolbar-title elevation="2"><strong class="black--text text--lighten-1">Facturación</strong></v-toolbar-title>

        <v-spacer></v-spacer>  
        <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
                <template  v-if="!$store.state.auth">
                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/">Login</router-link></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/signup">Registro</router-link></v-list-item-title>
                    </v-list-item>
                </template>
                <template v-if="$store.state.auth">  

                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/dashboard">Dashboard</router-link></v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/facturas">Facturas</router-link></v-list-item-title>
                    </v-list-item>

            

                    <v-list-item>
                        <v-list-item-title class="header-href" @click="logout">Logout</v-list-item-title>
                    </v-list-item>

                </template>
                
                
            </v-list>
        </v-menu>
    </v-app-bar>
  
  </div>

  
</template>  


<script>
export default {

    data(){
        return{          
          
        }
    },
    
    
    methods:{
        logout(){
            this.$store.dispatch("logout",this.$store.state.token);         
        }, 

        
 
    },
       
    
}
</script>

<style>
    @import "../../assets/css/header.css";
</style>
