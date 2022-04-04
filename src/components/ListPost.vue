<template>
    <div id="list_container">
        <h2 class="card_text">{{data.titulo}}</h2>
        <h4 class="card_text">Descrição: {{data.descricao}}</h4>
        <h5><Data :data_atual="data.date"/></h5>
        <h5 class="card_text">{{data.categoria ? 'Categoria: ' + data.categoria.nome : ''}}</h5>
        <router-link :to="{name: 'EditarPostagens', params: {id: data._id}}">
          <Button text="Editar"></Button>
        </router-link>
        <Button @click="deletePostagem(data._id)" text="Deletar"/>
    </div>
</template>

<script>
import Button from '../components/Button.vue'
import Data from '../components/Data.vue'


export default {
    name: 'List',
    components: {
        Button,
        Data
    },
    props: {
        data: Object
    },
    methods: {
        async deletePostagem(id){
            const req = await fetch(`api/admin/postagens/deletar/${id}`)

            const res = await req.json()

            if(!res.ok){
                this.$emit('message', res.texto)
            } else {
                this.$emit('message', res.texto)
            }
        }
    },
}
</script>

<style>

</style>