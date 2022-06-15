<template>
	<div>
		<Header />
		<div id="container_principal">
			<h1>{{categoria}}</h1>
			<h4 v-if="state == 'loading'">Carregando...</h4>
			<template v-else-if="state == 'posts'">
				<div style="width: 100%">
					<div v-for="postagem in postagens_data" :key="postagem._id" id="list_container">
							<h2 class="card_text">{{postagem.titulo}}</h2>
							<p class="jumbo_paragrafo">{{postagem.descricao}}</p>
							<router-link :to="{name: 'Postagem', params: {slug: postagem.slug}}">
								<Button text="Saiba mais" />
							</router-link>
							<hr>
							<h5 class="card_text">{{'Autor: ' + postagem.autor.nome}}</h5>
							<h5 class="card_text">Data de publicação: <Data :data_atual="postagem.date"/></h5>
					</div>
				</div>
			</template>
			<h4 v-else-if="state == 'nopost'">Nenhuma postagem.</h4>
			<Message v-else-if="state == 'error'" msg="Categoria inexistente."/>
		</div>
	</div>
</template>

<script>
import Header from '../../components/Header.vue'
import Data from '../../components/Data.vue'
import Button from '../../components/Button.vue'
import Message from '../../components/Message.vue'

export default {
	name: 'SlugPostagem',
	data() {
		return {
			postagens_data: [],
			categoria: null,
			state: 'loading'
		}
	},
	components: {
		Header,
		Data,
		Button,
		Message
	},
	props: {
		slug: String
	},
	methods: {
		async getPostagens() {
			const req = await fetch(`${process.env.VUE_APP_API_URL}categorias/${this.slug}`)

			const res = await req.json()

			if(!res.ok){
				this.state = 'error'
			} else {
				this.categoria = res.categoria.nome
				this.postagens_data = res.postagens
				this.state = this.postagens_data.length > 0 ? 'posts' : 'nopost'
			}

		}
	},
	mounted() {
		this.getPostagens()
	},
}
</script>