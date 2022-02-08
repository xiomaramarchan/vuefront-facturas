<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '350px' }">
          <v-card>
            <v-card-text>
                <div class="text-center mb-4">
                    <v-icon 
                    large
                    color="blue darken-2">mdi-hexagon-multiple
                    </v-icon>
                </div>     
                <transition name="fade" mode="out-in">                  
                    <template>
                        <v-form ref="form" @submit.prevent="login">
                            <v-layout  justify-center v-if="$store.state.errorLogin != null">
                                <v-alert type="error">{{this.$store.state.errorLogin}}</v-alert>        
                            </v-layout>
                            <v-col cols="12" md="12" >
                                <span class="form-input-errors">{{this.$store.state.emailEmpty}}</span>
                                <v-text-field
                                :label="Email"
                                prepend-icon="mdi-account"
                                v-model="form.email"
                                required                        
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <span class="form-input-errors">{{this.$store.state.passwordEmpty}}</span>
                                <v-text-field
                                :label="Password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="form.password"
                                required
                                ></v-text-field>
                            </v-col> 
                            <div class="text-center">
                            <v-btn                                
                                color="primary"
                                large
                                type="submit"
                                text
                                rounded
                                >Login
                            </v-btn>
                            </div>
                        </v-form>
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
<script src="./Login.js"></script>