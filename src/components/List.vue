<template>
    <div id="list_container">
        <h2 class="card_text">{{data.nome}}</h2>
        <h4 class="card_text">{{data.slug}}</h4>
        <h5><Data :data_atual="data.date"/></h5>
        <router-link :to="{name: 'EditarCategorias', params: {id: data._id}}"><Button text="Editar"></Button></router-link>
        <Button @click="deleteCategoria(data._id)" text="Deletar"/>
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
        async deleteCategoria(id){
            const req = await fetch(`${process.env.VUE_APP_API_URL}admin/categoria/deletar/${id}`)

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

<style scoped>
.card_text{
    margin: 10px 0;
}
</style>