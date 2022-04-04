<template>
  <div>
    <Header />
    <div id="container_principal">
        <Message v-for="msg in msgs" :key="msg.id" :msg="msg.texto" />
        <div id="form_container">
        <h2 class="form_title">Criar conta:</h2>
            <p>Nome:</p>
            <Input @custom-change="this.nome = $event" type="text" />
            <p>E-mail:</p>
            <Input @custom-change="this.email = $event" type="email" />
            <p>Senha:</p>
            <Input @custom-change="this.senha = $event" type="password" />
            <p>Repita sua senha:</p>
            <Input @custom-change="this.senha2 = $event" type="password" />
            <Button @click="registrar" text="Criar conta" />
        </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import Message from '../components/Message.vue'


export default {
  name: 'Registro',
  components: {
    Header,
    Button,
    Input,
    Message
  },
  data() {
    return {
      msgs: null,
      nome: '',
      email: '',
      senha: '',
      senha2: ''
    }
  },
  methods: {
    async registrar() {

      const data = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        senha2: this.senha2
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch('api/usuarios/registro', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: dataJson
      })

      const res = await req.json()

      if(!res.ok){
        this.msgs = res
      } else {
        this.$router.push({
          name: 'Home',
          params: {
              ok: res.texto
          }
        })
      }


    }
  }
}
</script>