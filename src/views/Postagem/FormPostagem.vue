<template>
  <div>
    <Header @user-id="this.user_id = $event"/>
    <div id="container_principal">
      <Message v-for="(msg, index) in msgs" :key="index" :msg="msg.texto" />
      <div @click="teste" id="form_container">
          <h2 class="form_title">Nova Postagem:</h2>
          <p>Título:</p>
          <Input @custom-change="this.titulo = $event" type="text" />
          <p>Slug:</p>
          <Input @custom-change="this.slug = $event" type="text" />
          <p>Descrição:</p>
          <Input @custom-change="this.descricao = $event" type="text" />
          <p>Conteúdo:</p>
          <textarea v-model="this.conteudo" cols="30" rows="10" class="effect-10"></textarea>
          <p>Categoria:</p>
          <select @change="this.categoria = $event.target.value" class="effect-10">
            <option v-if="categorias_data.length == 0" value="0">Nenhuma categoria registrada</option>
            <template v-else>
              <option value="0" >Selecione uma categoria</option>
              <option
                v-for="categoria in categorias_data" 
                :key="categoria._id" 
                :value="categoria._id">
                {{categoria.nome}}
              </option>
            </template>
          </select>
          <Button @click="addPostagem" text="Criar Postagem" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import Message from '../../components/Message.vue'

export default {
	name: 'FormPostagem',
	components: {
		Header,
		Button,
		Input,
		Message
	},
	data() {
		return {
			user_id: null,
			msgs: null,
			slugCheck: null,
			categorias_data: [],
			titulo: '',
			slug: '',
			descricao: '',
			conteudo: '',
			categoria: ''
		}
	},
	watch: {
		slug(s){
			if(s.indexOf(' ') >= 0){
				this.slugCheck = false
			} else this.slugCheck = true
		}
	},
	methods: {
		async getCategorias() {                        
			const req = await fetch(`${process.env.VUE_APP_API_URL}/admin/categorias`)

			const res = await req.json()

			this.categorias_data = res.categorias
            
		},
		async addPostagem() {
			if(this.slugCheck){

				const data = {
					titulo: this.titulo,
					slug: this.slug,
					descricao: this.descricao,
					conteudo: this.conteudo,
					categoria: this.categoria,
					autor: this.user_id
				}

				const dataJson = JSON.stringify(data)

				const req = await fetch(`${process.env.VUE_APP_API_URL}admin/postagens/nova`, {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: dataJson
				})

				const res = await req.json()

				if(!res.ok){
					this.msgs = res
				} else{
					this.$router.push({
						name: 'Home',
						params: {
							ok: res.texto
						}
					})
				}

			} else this.msgs = [{texto: 'Slug não deve conter espaços em branco!'}]            

		}
	},
	mounted() {
		this.getCategorias()
	},
}
</script>