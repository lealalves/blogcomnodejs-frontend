<template>
  <div id="header">
    <ul id="header_links">
      <router-link to="/"><li><h3>Blog do Node</h3></li></router-link>
      <router-link to="/"><li>Home</li></router-link>
      <router-link to="/categorias"><li>Categorias</li></router-link>
      <router-link v-show="user_data && user_data.eAdmin == 1" to="/postagens"><li>Postagens</li></router-link>
      <router-link v-show="user_data && user_data.eAdmin == 1" to="/listacategorias"><li>Lista de Categorias</li></router-link>
      <router-link v-show="!user_data" to="/login"><li>Login</li></router-link>
      <li v-show="user_data" style="cursor: pointer" @click="logout()">Sair</li>
      <router-link v-show="!user_data" to="/registro"><li>Registro</li></router-link>
    </ul>
    <ul id="header_user">
      <li>{{user_data ? user_data.nome : ''}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user_data: null
    }
  },
  methods: {
    async logout() {
      const req = await fetch("/api/usuarios/logout");

      const res = await req.json();

      if(!res.ok) {
        this.msgs = res;
      }else {
        this.$router.push({
          name: "Home",
          params: {
            ok: res.texto,
          },
        });
      }
    },
    async checkUser() {
        const req = await fetch('/api/usuarios')
  
        const res = await req.json()

        this.user_data = res.usuario
    }
  },
  mounted() {
    this.checkUser()
  }
};
</script>

<style scoped>
#header {
  height: 4rem;
  width: 100%;
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
#header_links {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
#header_links li {
  margin-left: 30px;
}
#header_user{
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
#header_user li{
  margin-right: 50px;
}
</style>