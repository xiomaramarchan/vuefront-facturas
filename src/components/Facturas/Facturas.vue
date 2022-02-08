<template>
   <v-container fluid>
       <v-layout>
           <v-flex>
               <v-app id="inspire">                     
                    <v-card>
                        <v-card-title>
                            <h4>Facturas</h4>                                 
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                            ></v-text-field>                                                     
                        </v-card-title>                       
                        <v-data-table fixed-header
                         height="70vh"   
                        :headers="headersfacturas"
                        :items="facturas"
                        :search="search"
                        sort-by="numero"
                        class="elevation-1"
                        :footer-props="{
                            showFirstLastPage: true,                            
                            'items-per-page-text':'Facturas por página',
                                    
                        }"
                         >
                        <template v-slot:top>
                        <v-toolbar flat>  
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialogoFactura" persistent max-width="500px" >
                                <v-card>                                                    
                                   
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }} # {{ editedItem.numero }}</span>
                                    </v-card-title>                                    
                                     
                                    <v-card-text>
                                        <v-container fluid>
                                        <v-row>
                                             <v-col md-6>
                                                <span class="form-input-errors">{{inputErrors[0]}}</span>
                                                <v-text-field 
                                                    v-model="editedItem.comprador_nombre"
                                                    label="Comprador*"                                                    
                                                    required
                                                ></v-text-field>                                                
                                            </v-col>
                                            <v-col md-6> 
                                                <span class="form-input-errors">{{inputErrors[1]}}</span>                                               
                                                <v-text-field
                                                    v-model="editedItem.comprador_nit"
                                                    label="Nit*"
                                                    required
                                                ></v-text-field>                                               
                                            </v-col>
                                        </v-row>
                                        <v-row>                                        
                                            <v-col md-6 > 
                                                <span class="form-input-errors">{{inputErrors[2]}}</span>                                              
                                                <v-text-field
                                                    v-model="editedItem.fecha"
                                                    label="Fecha*"
                                                    type="date"
                                                    required
                                                ></v-text-field>                                             
                                            </v-col>
                                            <v-col md-6>  
                                                <span class="form-input-errors">{{inputErrors[3]}}</span>                                              
                                                <v-text-field
                                                    v-model="editedItem.hora"
                                                    label="hora*"
                                                    type="time"                                                    
                                                ></v-text-field>                                               
                                            </v-col>                                             
                                        </v-row>
                                        </v-container>
                                    </v-card-text>  
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="blue darken-1" text  @click="save">
                                            Guardar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                
                            </v-dialog>
                            <!--
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                <v-card-title class="text-h5">¨Desea eliminar este item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>-->
                        </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="detalleFactura(item)" >
                            mdi-pencil
                            </v-icon>                           
                            <router-link :to="/detalle-Factura/+item.id" class="table-href">
                                        <v-icon small>mdi-eye</v-icon>
                            </router-link>                           
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">
                             Refrescar
                            </v-btn>
                        </template>
                    </v-data-table>
                    </v-card>                    
                </v-app>
           </v-flex>        
        </v-layout>
    </v-container>
</template>

<script src="./Facturas.js"></script>