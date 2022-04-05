<template>
    <div>
        <Header />
        <div id="container_principal">
            <Message v-for="msg in msgs" :key="msg.id" :msg="msg.texto" />
            <div id="form_container">
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
                <select @click="this.categoria = $event.target.value" class="effect-10">
                    <option v-if="categorias_data == ''" value="0">Nenhuma categoria registrada</option>
                    <option v-else
                        v-for="categoria in categorias_data" 
                        :key="categoria._id" 
                        :value="categoria._id">
                        {{categoria.nome}}
                    </option>
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
            msgs: null,
            categorias_data: '',
            titulo: '',
            slug: '',
            descricao: '',
            conteudo: '',
            categoria: ''
        }
    },
    methods: {
        async getCategorias() {                        
            const req = await fetch(`${process.env.VUE_APP_API_URL}/admin/categorias`)

            const res = await req.json()
            this.categorias_data = res.categorias
                
        },
        async addPostagem() {
            const data = {
                titulo: this.titulo,
                slug: this.slug,
                descricao: this.descricao,
                conteudo: this.conteudo,
                categoria: this.categoria
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
                console.log(res);
            } else{
                this.$router.push({
                    name: 'Postagens',
                    params: {
                        ok: res.texto
                    }
                })
            }

        }
    },
    mounted() {
        this.getCategorias()
    },
}
</script>