<template>
	<div>
			<Header />
			<div id="container_principal">
				<div v-if="this.titulo != null" id="form_container">
					<h1>{{titulo}}</h1>
					<hr />
					<small>Data de publicação: <Data :data_atual="data" /></small>
					<hr />
					<p class="jumbo_paragrafo">{{conteudo}}</p>
				</div>
				<Message v-else msg="Postagem inexistente."/>
			</div>
	</div>
	
</template>

<script>
import Header from "../components/Header.vue"
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
				conteudo: null
			}
		},
		methods: {
			async getPostagem() {
				const req = await fetch(`/api/postagem/${this.slug}`)

				const res = await req.json()

				if(!res.ok){
					console.log(res.texto);
				} else {
					this.titulo = res.postagem.titulo
					this.data = res.postagem.date
					this.conteudo = res.postagem.conteudo
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