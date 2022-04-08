<template>
  <div id="header">
    <router-link :to="{name: 'Home'}"><img id="imgLogo" src="../assets/logo.jpg" alt="" srcset=""></router-link>
    <ul v-show="!isMobile" id="header_links">
      <router-link to="/"><li>Home</li></router-link>
      <router-link to="/categorias"><li>Categorias</li></router-link>
      <router-link v-show="user_data && user_data.eAdmin == 1" to="/postagens"><li>Postagens</li></router-link>
      <router-link v-show="user_data && user_data.eAdmin == 0" to="/postagens/add"><li>Criar postagem</li></router-link>
      <router-link v-show="user_data && user_data.eAdmin == 1" to="/listacategorias"><li>Lista de Categorias</li></router-link>
      <router-link v-show="!isAuth" to="/login"><li>Login</li></router-link>
      <router-link v-show="!isAuth" to="/registro"><li>Registrar</li></router-link>
    </ul>
    <ul id="header_user">
      <Dropdown
      v-show="isMobile || isAuth"
      :title="isAuth ? `Bem-vindo, ${user_data.nome}!` : 'Menu'" 
      :items="setItems"
      />
    </ul>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import Dropdown from './Dropdown.vue'


export default {
  name: "Header",
  components: {
    Dropdown
  },
  data() {
    return {
      user_data: null,
      windowWidth: ref(window.innerWidth),
      desktop: [
        {
          title: 'Sair',
          is: 'p'
        },
      ],
      responsiveLogged: [
        {
          title: 'Home',
          is: 'router-link',
          url: '/'
        },
        {
          title: 'Postagens',
          is: 'router-link',
          url: '/postagens'
        },
        {
          title: 'Categorias',
          is: 'router-link',
          url: '/categorias',
        },
        {
          title: 'Lista de Categorias',
          is: 'router-link',
          url: '/listacategorias',
        },
        {
          title: 'Sair',
          is: 'p',
        }
      ],
      responsiveOffline: [
        {
          title: 'Home',
          is: 'router-link',
          url: '/'
        },
        {
          title: 'Categorias',
          is: 'router-link',
          url: '/categorias',
        },
        {
          title: 'Registrar',
          is: 'router-link',
          url: '/registro',
        },
        {
          title: 'Login',
          is: 'router-link',
          url: '/login'
        }
      ]
    }
  },
  computed: {
    isMobile(){
      return this.windowWidth < 550 ? true : false
    },
    isAuth(){
      return this.user_data != null ? true : false
    },
    setItems(){
      if(this.isMobile && this.isAuth){
        return this.responsiveLogged
      }else if (this.isMobile && !this.isAuth){
        return this.responsiveOffline
      }else return this.desktop 
    }
  },
  methods: {
    onWidthChange(){
      this.windowWidth = window.innerWidth
    },
    async checkUser() {
        const req = await fetch(`${process.env.VUE_APP_API_URL}usuarios`)
  
        const res = await req.json()

        this.user_data = res.usuario
    }
  },
  mounted() {
    window.addEventListener('resize', this.onWidthChange)
    this.checkUser()
  }
};
</script>

<style>
#header {
  width: 100%;
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 10px;
}
#header_links {
  display: flex;
  width: 100%;
  align-items: center;
}
#header_links  li {
  padding: 10px;
  margin-left: 10px;
  text-align: center;
  transition: .3s ease;
  border-radius: 10px;
}
#header_links li:hover{
  background-color: #ffffff;
  color: #222;
}
#imgLogo {
  width: min(70px, 15vw);
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
}
#header_user{
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
#header_user li{
  max-width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
  background-color: #ffffff;
  color: #222;
  border-radius: 10px;
  cursor: pointer;
}
</style>