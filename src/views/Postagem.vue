<template>
	<div>
			<Header />
			<div id="container_principal">
        <h3 v-if="state == 'loading'">Carregando...</h3>
				<Message v-else-if="conteudo == null" msg="Postagem inexistente."/>
				<div v-else id="form_container">
					<h1>{{titulo}}</h1>
					<hr />
					<small>Autor: {{this.autor}}</small><br>
					<small>Data de publicação: <Data :data_atual="data" /></small>
					<hr />
					<p class="jumbo_paragrafo">{{conteudo}}</p>
				</div>
			</div>
	</div>
	
</template>

<script>
import Header from '../components/Header.vue'
import Message from '../components/Message.vue'
import Data from '../components/Data.vue'


export default {
	name: 'Postagem',
	components: {
		Header,
		Message,
		Data
	},
	props: {
		slug: String
	},
	data() {
		return {
			titulo: null,
			data: null,
			conteudo: null,
			autor: null,
			state: 'loading'
		}
	},
	methods: {
		async getPostagem() {
			const req = await fetch(`${process.env.VUE_APP_API_URL}postagem/${this.slug}`)

			const res = await req.json()

			if(!res.ok){
				this.state = 'error'
			} else {
				this.titulo = res.postagem.titulo
				this.data = res.postagem.date
				this.conteudo = res.postagem.conteudo
				this.autor = res.postagem.autor.nome
				this.state = 'ok'
			}
		}
	},
	mounted(){
		this.getPostagem()
	}
}
</script>

<style scoped>

</style>