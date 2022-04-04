<template>
    <div>
        <Header />
        <div id="container_principal">
            <Message v-for="msg in msgs" :key="msg.id" :msg="msg.texto" />
            <div id="form_container">
            <h2 class="form_title">Nova Categoria:</h2>
                <p>Nome:</p>
                <Input @custom-change="this.nome = $event" type="text" placeholder="Nome da Categoria" />
                <p>Slug:</p>
                <Input @custom-change="this.slug = $event" type="text" placeholder="Slug da Categoria" />
                <Button @click="addCategoria" text="Criar Categoria" />
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
    name: 'Formulario',
    components: {
        Header,
        Button,
        Input,
        Message
    },
    data() {
        return {
            nome: '',
            slug: '',
            msgs: []
        }
    },
    methods: {
        async addCategoria() {

            const data = {
                nome: this.nome,
                slug: this.slug
            }

            const dataJson = JSON.stringify(data)

            const req = await fetch('/api/admin/categorias/nova', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: dataJson
            })

            const res = await req.json()
            
            if(!res.ok){
                this.msgs.push(res)
            } else {
                this.$router.push({
                    name: 'Categorias',
                    params: {
                        ok: res.texto
                    }
                })
            }

        }
    },
}
</script>

<style scoped>

</style>