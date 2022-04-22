<template>
  <div>
    <Header />
    <div id="container_principal">
      <h1 class="lista_titulo">Categorias: </h1>
      <hr>
      <h3 v-if="state == 'loading'">Carregando...</h3>
      <h3 v-else-if="categorias_data.length == 0">Sem categorias registradas.</h3>
      <template v-else>
        <router-link 
          v-for="categoria in categorias_data" 
          :key="categoria._id" 
          :to="{
            name: 'SlugPostagens', 
            params: {
              slug: categoria.slug
              }
            }">
          <h3>{{categoria.nome}}</h3>
        </router-link>            
      </template>          
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'Categoria',
	data() {
		return {
			state: 'loading',
			categorias_data: []
		}
	},
	components: {
		Header
	},
	methods: {
		async getCategorias(){
			const req = await fetch(`${process.env.VUE_APP_API_URL}categorias`)

			const res = await req.json()
      
			this.state = 'ok'

			this.categorias_data = res.categorias
		}
	},
	mounted(){
		this.getCategorias()
	}
}
</script>

<style>
h3{
  font-weight: 300;
  margin: 3px 0;
}
</style>