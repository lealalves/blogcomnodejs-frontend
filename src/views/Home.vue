<template>
  <div>
    <Header />
    <div id="container_principal">
      <Message v-show="ok" :msg="ok" />
      <div id="jumbotron">
        <h1 class="jumbo_title">Bem-vindo ao Blog do Leal!</h1>
        <p class="jumbo_paragrafo">
          Este é um BLOG simples, desenvolvido com Vue.js + Node.js + MongoDB. <br>
          Projeto final do curso de Node.js do canal 
          <a style="font-style: italic" href="https://www.youtube.com/c/GuiadoProgramador" target="_blank" rel="noopener noreferrer">
            Victor Lima - Guia do Programador
          </a>
        </p>
        <router-link to="/registro"><Button text="Crie uma conta" /></router-link>
        <p class="jumbo_paragrafo">
          Feito por Vinicius Leal - <a style="font-style: italic" href="https://www.github.com/lealalves" target="_blank" rel="noopener noreferrer">github.com/lealalves</a>
        </p> 
      </div>
      <hr />
      <div id="postagens_container">
        <h1 class="lista_titulo">Postagens recentes:</h1>
        <h3 v-if="state == 'loading'">Carregando...</h3>
        <h3 v-else-if="postagens_data.length === 0"> Sem postagens.</h3>
        <template v-else>
          <div id="postagem_container" v-for="postagem in postagens_data" :key="postagem._id" >
            <h2 class="postagem_titulo">{{postagem.titulo}}</h2>
            <p class="jumbo_paragrafo">{{postagem.descricao}}</p>
            <router-link 
              :to="{
                name: 'Postagem', 
                params: {
                  slug: postagem.slug
                }
              }">
              <Button text="Saiba mais" />
            </router-link>
            <hr />
            <small>{{"Categoria: " + postagem.categoria?.nome }}</small><br>
            <small>{{"Autor: " + postagem.autor?.nome}}</small><br>
            <small>Data de criação: <Data :data_atual="postagem.date" /></small>
          </div>
        </template>        
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Button from '../components/Button.vue';
import Data from '../components/Data.vue'
import Message from '../components/Message.vue'


export default {
	name: 'Home',
	components: {
		Header,
		Button,
		Data,
		Message
	},
	props: {
		ok: String,
	},
	data() {
		return {
			state: 'loading',
			postagens_data: []
		}
	},
	methods: {
		async getPostagens() {

			const req = await fetch(`${process.env.VUE_APP_API_URL}`)

			const res = await req.json()
			this.state = 'ok'
			this.postagens_data = res.postagens
		}
	},
	mounted() {
		this.getPostagens()
	}
};
</script>
<style>
#jumbotron {
  background-color: #70a8a833;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 50px 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.jumbo_title {
  font-family: "Lato", sans-serif;
  font-size: min(54px, 5vw);
  font-weight: 300;
  margin: 0 0 15px;
}
.lista_titulo{
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: min(34px, 5vw);
}
.postagem_titulo{
  font-family: "Lato", sans-serif;
  margin-bottom: 10px;
  font-size: min(26px, 5vw);
}
#postagens_container{
  width: 100%;
}
#postagem_container{
  width: 100%;
  padding: 20px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 5px;
  margin: 30px 0;
  word-break: break-all;
}
</style>