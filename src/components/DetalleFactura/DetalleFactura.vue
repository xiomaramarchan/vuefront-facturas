<template>
    <v-card>
      <v-container fluid grid-list-lg >
        <v-layout row wrap>
          <!-- Datos de la factura-->
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
                <v-card-text>
                    <v-layout fill-height  wrap  justify-center > 
                      <v-flex>
                          <v-row>                          
                          <v-col cols="8">
                            <h3  class="invoice-left"><strong>Factura Nro.:</strong> {{detalle.numero}}</h3>
                          </v-col>
                          <v-col cols="4"><p class="text-right"><strong>Fecha:</strong> {{detalle.fecha}}</p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col></v-col>
                          <v-col cols="4"><p  class="text-right"><strong>Hora:</strong> {{detalle.hora}}</p></v-col>
                        </v-row>  
                      </v-flex> 
                                 
                    </v-layout>
              </v-card-text>            
            </v-card>
          </v-flex>
           <!-- Datos de la factura-->
        
          <v-flex xs12>
            <v-card>
              <v-card-text>
                 <!-- Datos del cliente-->
                <v-layout fill-height  wrap  justify-center >          
                  <v-flex>
                        <v-row>
                          <v-col>
                            <p  class="invoice-left"><strong>Nombre del vendedor:</strong> {{detalle.name}}</p>
                          </v-col>
                          <v-col>
                             <p   class="invoice-left"><strong>Nit del Vendedor:</strong> {{detalle.nit}}</p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <p   class="invoice-left"><strong>Nombre del Cliente:</strong> {{detalle.comprador_nombre}}</p>
                          </v-col>
                          <v-col>
                            <p  class="invoice-left"><strong>Nit del cliente:</strong> {{detalle.comprador_nit}}</p>
                          </v-col>
                        </v-row>
                  </v-flex>                                
                </v-layout>
                <v-divider light></v-divider> 
                 <!-- Items de la factura-->
                <v-layout>
                    <v-flex>
                      <v-simple-table style="width:100vh" fixed-header>
                        <template v-slot:default>
                          <thead>
                              <tr>                                    
                              <th class="text-center" >Descripción</th>
                              <th class="text-center" >Precio/Unidad</th>
                              <th class="text-center" >Cantidad</th>
                              <th class="text-center">Total</th>                                           
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="productosFactura, index in productosFactura" :key="index">
                              <td class="text-center">{{ productosFactura.descripcion }}</td>
                              <td class="text-center">{{ productosFactura.precio_venta }}</td>
                              <td class="text-center">{{ productosFactura.cantidad }}</td>                
                              <td class="text-center">{{ productosFactura.valor_total }}</td>                                            
                              </tr>
                          </tbody>                                       
                        </template>
                      </v-simple-table>
                    </v-flex>                         
                  </v-layout>
                   <!-- Items de la factura-->
              </v-card-text>            
            </v-card>
          </v-flex>
         
          <!-- Montos de la factura -->
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text"> 
              <v-card-text class="pa-3">
                 <v-layout fill-height  wrap  justify-center >     
                  <v-flex>
                    <div>
                      <v-row>
                      <v-col><h3>TOTAL: {{total}} </h3></v-col>
                      <v-col><h3>IVA: {{iva}}</h3></v-col>
                      <v-col><h3>TOTAL + IVA: {{totalIva}}</h3></v-col>
                    </v-row>                   
                    </div>
                      
                  </v-flex>                 
                </v-layout>
            </v-card-text>
            </v-card>
          </v-flex>
           <!-- Montos de la factura -->
        </v-layout>
      </v-container>
    </v-card>
</template>


<script src="./DetalleFactura.js"></script>