<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '400px', 'max-height':'50vh' }">
          <v-card>
            <v-card-text>             
                <transition name="fade" mode="out-in">                  
                    <template>
                            <div  style="margin-top:20px">                            
                                <v-layout  justify-center >
                                    <span class="form-title">Regístrate</span>          
                                </v-layout>
                                <br>
                                <v-layout  justify-center v-if="alertSuccess">
                                    <v-alert  dense text type="success" >{{alertSuccessMessage}}</v-alert>         
                                </v-layout>  
                                
                                <v-form @submit.prevent="signUp" >
                                    <v-layout justify-center >
                                        <v-flex xs12  >  
                                            <v-col >
                                                <span class="form-input-errors">{{inputErrors[0]}}</span>
                                            </v-col>              
                                            <v-col cols="12" md="12" >
                                                <v-text-field   v-model="name" label="Nombre" :counter="255"> </v-text-field>
                                            </v-col>       
                                        </v-flex>
                                    </v-layout> 

                                    <v-layout justify-center>
                                        <v-flex xs12  >  
                                            <v-col >
                                                <span class="form-input-errors">{{inputErrors[1]}}</span>
                                            </v-col>                
                                            <v-col cols="12" md="12" >
                                                <v-text-field v-model="email" label="Email" :counter="255"> </v-text-field>
                                            </v-col>      
                                        </v-flex>
                                    </v-layout>

                                    <v-layout justify-center >
                                        <v-flex xs12 >  
                                            <v-col >
                                                <span class="form-input-errors">{{inputErrors[2]}}</span>
                                            </v-col>              
                                            <v-col cols="12" md="12" >
                                                <v-text-field v-model="nit"  label="NIT" :counter="255"> </v-text-field>
                                            </v-col>       
                                        </v-flex>
                                    </v-layout>

                                    <v-layout justify-center>
                                        <v-flex xs12 >  
                                            <v-col >
                                                <span class="form-input-errors">{{inputErrors[3]}}</span>
                                            </v-col>                
                                            <v-col cols="12" md="12" >
                                                <v-text-field type="password" v-model="password" label="Password" > </v-text-field>
                                            </v-col>      
                                        </v-flex>
                                    </v-layout>  
                                     <v-layout justify-center>
                                        <v-flex xs12  >  
                                            <v-col >
                                                <span class="form-input-errors">{{inputErrors[4]}}</span>
                                            </v-col>                
                                            <v-col cols="12" md="12" >
                                                <v-text-field type="password" v-model="passwordConfirmation" label="Confirmar Password"> </v-text-field>
                                            </v-col>      
                                        </v-flex>
                                    </v-layout>
                                    <div class="text-center">
                                        <v-btn                                
                                            color="primary"
                                            large
                                            type="submit"
                                            text
                                            rounded
                                            >Enviar
                                        </v-btn>
                                    </div>     
                                </v-form>
                                <br/><br/><br/>
                            </div>         
                    </template>
                </transition>
            </v-card-text>     
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<style>
    @import "../../assets/css/form.css";
</style>
<script src="./Registro.js"></script>