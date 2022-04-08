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
      emailCheck: null,
      nome: '',
      email: '',
      senha: '',
      senha2: ''
    }
  },
  watch: {
    email(txt){

      let usuario = txt.substring(0, txt.indexOf("@"));
      let dominio = txt.substring(txt.indexOf("@")+ 1, txt.length);

      if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1) && 
            (dominio.lastIndexOf(".") < dominio.length - 1)){
            this.emailCheck = true
          } else this.emailCheck = false
    }
  },
  methods: {
    async registrar() {
      if(this.emailCheck){

        const data = {
          nome: this.nome,
          email: this.email,
          senha: this.senha,
          senha2: this.senha2
        }
  
        const dataJson = JSON.stringify(data)
  
  
        const req = await fetch(`${process.env.VUE_APP_API_URL}usuarios/registro`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: dataJson
        })
  
        const res = await req.json()
  
        if(!res.ok){
          this.msgs = res
        } else {
          this.$router.push({
            name: 'Login',
            params: {
                ok: res.texto
            }
          })
        }
      } else this.msgs = [{texto: 'E-mail inválido.'}]
    }
  }
}
</script>