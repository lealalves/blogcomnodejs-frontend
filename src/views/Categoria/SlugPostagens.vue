<template>
  <div>
    <Header />
    <div id="container_principal">
      <h1>{{categoria}}</h1>
      <div style="width: 100%" v-if="categoria != null">
        <h4 v-if="!postagens_data.length">Nenhuma postagem.</h4>
        <div v-else v-for="postagem in postagens_data" :key="postagem._id" id="list_container">
            <h2 class="card_text">{{postagem.titulo}}</h2>
            <p class="jumbo_paragrafo">{{postagem.descricao}}</p>
            <router-link :to="{name: 'Postagem', params: {slug: postagem.slug}}">
              <Button text="Saiba mais" />
            </router-link>
            <hr>
            <h5 class="card_text">Data de publicação: <Data :data_atual="postagem.date"/></h5>
        </div>
      </div>
      <Message v-else msg="Categoria inexistente."/>
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
        console.log(res.texto);
      } else {
        this.postagens_data = res.postagens
        this.categoria = res.categoria.nome
      }

    }
  },
  mounted() {
    this.getPostagens()
  },
}
</script>