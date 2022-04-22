<template>
    <div>
        <Header />
        <div id="container_principal">
          <Message v-show="ok" :msg="ok" />
            <h1 class="lista_titulo">Lista de postagens:</h1>
            <router-link to="/postagens/add"><Button text="Nova Postagem"/></router-link>
            <div id="categorias_container" v-if="postagem_data.length > 0">
                <ListPost
                @message="getPostagens(), ok = $event" 
                v-for="postagem in postagem_data" 
                :key="postagem._id" 
                :data="postagem"
                />
            </div>
            <h3 v-else>Nenhuma postagem registrada.</h3>
        </div>
    </div>
    
</template>

<script>
import Header from '../../components/Header.vue'
import Button from '../../components/Button.vue'
import Message from '../../components/Message.vue'
import ListPost from '../../components/ListPost.vue'

export default {
	name: 'ListaPostagem',
	data() {
		return {
			postagem_data: []
		}
	},
	components:{
		Header,
		Button,
		Message,
		ListPost
	},
	props: {
		ok: String
	},
	methods: {
		async getPostagens() {                        
			const req = await fetch(`${process.env.VUE_APP_API_URL}admin/postagens`)

			const res = await req.json()

			if(!res.ok){
				this.$router.push({
					name: 'Home',
					params: {
						ok: res.texto
					}
				})
			}else {
				this.postagem_data = res.postagens
			}
		}
	},
	mounted() {
		this.getPostagens()
	},
}
</script>

<style>

</style>