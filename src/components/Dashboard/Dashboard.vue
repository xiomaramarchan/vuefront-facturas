<template>
    <v-container fluid > 
        <v-layout>
            <v-flex >
                <v-row>
                    <v-col md="6" >                      
                        <v-card>
                            <v-card-title>
                            <h5> Productos</h5>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                            ></v-text-field>
                            </v-card-title>
                            <v-data-table fixed-header
                                 height="60vh"                
                                :headers="headers"
                                :items="products"
                                :search="search"
                                class="elevation-1"                
                                :header-props="{
                                    sortByText: 'Ordenar por'                                            
                                }"
                                :footer-props="{
                                    showFirstLastPage: true,                                    
                                    'items-per-page-text':'Productos por página', 
                                }"
                             > 
                            <template v-slot:[`item.cantidad`]="{ item }">
                                <v-text-field                                 
                                :id="'item'+item.id"                 
                                required
                                ></v-text-field>
                            </template>             
                            </v-data-table>
                        </v-card>                 
                    </v-col>
                    <v-col md="6" > 
                        <v-row>
                            <v-col>
                                <v-layout justify-center>
                                    <v-btn tile color="primary" elevation="2" @click="addProducts">
                                    <v-icon left>mdi-cart-plus</v-icon>
                                    Productos                                   
                                    </v-btn>                                                                       
                                </v-layout>
                            </v-col>   
                            <v-col>
                                 <v-layout justify-center v-if="buttonInvoice">
                                         <v-btn tile color="success" elevation="2"  @click="generateInvoice()">
                                            <v-icon left>mdi-chevron-double-right</v-icon>
                                            Facturar   
                                             <v-progress-circular v-if="loader" indeterminate color="grey lighten-5"></v-progress-circular>                                
                                        </v-btn>    
                                    </v-layout> 
                            </v-col>
                            
                                 <v-layout justify-center v-if="alertSuccess"> 
                                 <v-alert color="green" type="success">{{generateInvoiceMessage}}</v-alert>
                                </v-layout> 
                                             
                        </v-row>
                       
                        <v-row>
                            <v-col>
                                <v-layout fill-height>
                                    <v-flex>
                                    <v-card>                                       
                                        <v-card-text>
                                            <v-layout>                                               
                                                <div id="form-base" class="row">                                                
                                                    <div class="col col-6 item type-form-base-text key-form-base-name prop-name">
                                                         <p class="form-input-errors">{{inputErrors[0]}}</p>
                                                        <div class="v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted">
                                                           
                                                            <div class="v-input__control">
                                                                <div class="v-input__slot">
                                                                <div class="v-text-field__slot">
                                                                    <label  class="v-label v-label--active theme--light" style="left: 0px; right: auto; position: absolute;">Nombre del comprador:</label>
                                                                    <input  type="text" v-model="name">
                                                                        
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                
                                                    <div class="col col-6 item type-form-base-text key-form-base-name prop-name">
                                                         <p class="form-input-errors">{{inputErrors[1]}}</p>
                                                        <div class="v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted">                                                           
                                                            <div class="v-input__control">
                                                                <div class="v-input__slot">
                                                                <div class="v-text-field__slot">
                                                                    <label  class="v-label v-label--active theme--light" style="left: 0px; right: auto; position: absolute;">Nit del comprador:</label>
                                                                    <input type="text" v-model="nit">                                                                        
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                           </v-layout>                                          
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                </v-layout>                                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="12">                                
                                    <v-card> 
                                     <v-layout>
                                    <v-card-text>
                                           <v-simple-table  height="30vh" fixed-header>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>                                    
                                                    <th class="text-center" >Descripción</th>
                                                    <th class="text-center" >Precio/Unidad</th>
                                                    <th class="text-center" >Cantidad</th>
                                                    <th class="text-center">Total</th>
                                                    <th class="text-center">Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="addedProduct, index in addedProduct" :key="index">
                                                    <td class="text-center">{{ addedProduct.descripcion }}</td>
                                                    <td class="text-center">{{ addedProduct.precio_venta }}</td>
                                                    <td class="text-center">{{ addedProduct.cantidad }}</td>                
                                                    <td class="text-center">{{ addedProduct.total_cantidad }}</td>
                                                    <td class="text-center"><v-icon color="red"  small @click="removeProduct(index)">mdi-delete</v-icon></td>
                                                    </tr>
                                                </tbody>                                       
                                            </template>
                                        </v-simple-table>
                                    </v-card-text> 
                                    </v-layout>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-layout justify-center fill-height> 
                                        <v-card-text> 
                                            <div class="row text-center">
                                                <div  class="col col-4"><span>TOTAL</span></div>
                                                <div class="col col-4 "><span>IVA</span> </div>
                                                <div class="col col-4"><span> TOTAL + IVA</span></div>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="row text-center">
                                                <div class="col col-4">{{total}}</div>
                                                <div class="col col-4">{{iva}}</div>
                                                <div class="col col-4">{{totalAndIva}}</div>
                                            </div>                                          
                                        </v-card-text> 
                                    </v-layout>
                                </v-card>
                            </v-col>
                        </v-row>                          
                    </v-col>
                </v-row>
            </v-flex>
        </v-layout>                    
    </v-container>
</template>
<style>
  @import "../../assets/css/form.css";
    
    @import "../../assets/css/table.css";
</style>
<script src="./Dashboard.js"></script>