<template>
    <div>
        <Header />
        <div v-if="ok" id="container_principal">
            <Message v-for="msg in msgs" :key="msg.id" :msg="msg.texto" />
            <div id="form_container">
                <h2 class="form_title">Editar Postagem:</h2>
                <p>Nome:</p>
                <Input @custom-change="this.titulo = $event" v-model="titulo" type="text" :value="titulo" placeholder="Titulo da Postagem" />
                <p>Slug:</p>
                <Input @custom-change="this.slug = $event" v-model="slug" type="text" :value="slug" placeholder="Slug da Postagem" />
                <p>Descrição:</p>
                <Input @custom-change="this.descricao = $event" v-model="descricao" type="text" :value="descricao" placeholder="Descrição da Postagem" />
                <p>Conteúdo:</p>
                <textarea v-model="conteudo" cols="30" rows="10" class="effect-10"></textarea>
                <p>Categoria:</p>
                <select @click="this.categoria_id = $event.target.value" class="effect-10">
                    <option 
                    v-for="categoria in categorias_data" 
                    :key="categoria._id" 
                    :value="categoria._id">
                    {{categoria.nome}}
                    </option>
                </select>
                <Button @click="updatePostagem()" text="Editar Postagem" />
            </div>
        </div>
        <div v-else id="container_principal">
            <Message msg="Essa postagem não existe." />
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
            categorias_data: [],
            msgs: [],
            categoria_id: '',
            titulo: '',
            slug: '',
            descricao: '',
            conteudo: '',
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
        async getUniquePostagem(){
            const req = await fetch(`/api/admin/postagens/editar/${this.id}`)

            const res = await req.json()

            if(!res.ok){
                console.log('Postagem não encontrada.');
            } else {
                this.ok = true
                this.titulo = res.postagem.titulo
                this.slug = res.postagem.slug
                this.descricao = res.postagem.descricao
                this.conteudo = res.postagem.conteudo
                this.categoria_id = res.postagem.categoria
                this.categorias_data = res.categoria
            }
        },
        async updatePostagem() {
            const data = {
                id: this.id,
                titulo: this.titulo,
                slug: this.slug,
                descricao: this.descricao,
                conteudo: this.conteudo,
                categoria: this.categoria_id
            }

            const dataJson = JSON.stringify(data)

            const req = await fetch('/api/admin/postagens/editar', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: dataJson
            })

            const res = await req.json()

            if(!res.ok){
                this.msgs = res
            } else {
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
        this.getUniquePostagem()
    },
}
</script>