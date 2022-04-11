<template>
  <div>
    <Header />
    <div id="container_principal">
        <Message v-for="(msg, index) in msgs" :key="index" :msg="msg.texto" />
        <Message v-show="ok" :msg="ok" />
        <div id="form_container">
        <h2 class="form_title">Login:</h2>
            <p>E-mail:</p>
            <Input @custom-change="this.email = $event" type="email" />
            <p>Senha:</p>
            <Input @custom-change="this.senha = $event" type="password" />
            <Button @click="login" text="Entrar" />
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
  name: 'Login',
  components: {
    Header,
    Message,
    Input,
    Button
  },
  data() {
    return {
      msgs: null,
      email: '',
      senha: ''
    }
  },
  props: {
    ok: String,
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        senha: this.senha
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch(`${process.env.VUE_APP_API_URL}usuarios/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: dataJson,
      })

      const res = await req.json()

      if(!res.ok) {
        this.msgs = res
      }else {
        this.$router.push({
          name: 'Home',
          params: {
              ok: res.texto,
          }
        })
      }
      
    }
  }
}
</script>