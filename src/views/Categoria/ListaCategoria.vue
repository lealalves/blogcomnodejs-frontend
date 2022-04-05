<template>
    <div>
        <Header />
        <div id="container_principal">
          <Message v-show="ok" :msg="ok" />
          <h1>Lista de categorias:</h1>
          <router-link to="/categorias/add"><Button text="Nova Categoria"/></router-link>
          <div id="categorias_container" v-if="categorias_data != ''">
              <List 
              @message="getCategorias(), ok = $event" 
              v-for="categoria in categorias_data" 
              :key="categoria.id" 
              :data="categoria"
              />
          </div>          
          <h3 v-else>Nenhuma categoria registrada.</h3>
        </div>
    </div>
    
</template>

<script>
import Header from '../../components/Header.vue'
import Button from '../../components/Button.vue'
import Message from '../../components/Message.vue'
import List from '../../components/List.vue'

export default {
    name: 'ListaCategoria',
    data() {
        return {
          categorias_data: ''
        }
    },
    components:{
        Header,
        Button,
        Message,
        List,
    },
    props: {
        ok: String
    },
    methods: {
        async getCategorias() {                        
            const req = await fetch(`${process.env.VUE_APP_API_URL}admin/categorias`)

            const res = await req.json()
            if(!res.ok){
              this.$router.push({
                name: 'Home',
                params: {
                ok: res.texto
                }
              })
            }else {
              this.categorias_data = res.categorias
            }
                
        }
    },
    mounted() {
        this.getCategorias()
    },
}
</script>

<style>

</style>