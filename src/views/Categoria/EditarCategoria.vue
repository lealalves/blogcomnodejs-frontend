<template>
    <div>
        <Header />
        <div v-if="ok" id="container_principal">
            <div></div>
            <h2>Editar Categoria:</h2>
            <Message v-for="(msg, index) in msgs" :key="index" :msg="msg.texto" />
            <div id="form_container">
                <p>Nome:</p>
                <Input @custom-change="this.nome = $event" v-model="nome" type="text" :value="nome" placeholder="Nome da Categoria" />
                <p>Slug:</p>
                <Input @custom-change="this.slug = $event" v-model="slug" type="text" :value="slug" placeholder="Slug da Categoria" />
                <Button @click="updateCategoria()" text="Editar Categoria" />
            </div>
        </div>
        <div v-else id="container_principal">
            <Message msg="Essa categoria não existe." />
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import Message from '../../components/Message.vue'

export default {
    name: 'Editar',
    data(){
        return {
            ok: false,
            msgs: [],
            nome: '',
            slug: ''
        }
    },
    components: {
        Header,
        Button,
        Input,
        Message
    },
    props: {
        id: String
    },
    methods: {
        async getUniqueCategoria(){
            const req = await fetch(`${process.env.VUE_APP_API_URL}/admin/categoria/editar/${this.id}`)

            const res = await req.json()

            if(!res.ok){
                console.log(res.texto);
            } else {
                this.ok = true
                this.nome = res.categoria.nome
                this.slug = res.categoria.slug
            }
        },
        async updateCategoria() {
            const data = {
                id: this.id,
                nome: this.nome,
                slug: this.slug
            }

            const dataJson = JSON.stringify(data)

            const req = await fetch(`${process.env.VUE_APP_API_URL}admin/categoria/editar`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: dataJson
            })

            const res = await req.json()

            if(!res.ok){
                this.msgs = res
            } else {
                this.$router.push({
                    name: 'ListaCategorias',
                    params: {
                        ok: res.texto
                    }
                })
            }

        }
    },

    mounted() {
        this.getUniqueCategoria()
    },
}
</script>