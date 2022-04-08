<template>
  <div id="header">
    <router-link :to="{ name: 'Home' }"><img id="imgLogo" src="../assets/logo.jpg" alt="Logo"/></router-link>
    <ul v-show="!isMobile" id="header_links">
      <router-link v-for="link in header" :key="link" :to="link.url"><li>{{ link.title }}</li></router-link>
    </ul>
    <ul id="header_user">
      <Dropdown
        v-show="isMobile"
        :title="isAuth ? `Bem-vindo, ${user_data.nome}!` : 'Menu'"
        :items="header"
      />
      <Dropdown
        v-show="!isMobile && isAuth"
        :title="isAuth ? `Bem-vindo, ${user_data.nome}!` : 'Menu'"
        :items="[{title: 'Sair', url: '#', is:'p'}]"
      />
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Dropdown from "./Dropdown.vue";

export default {
  name: "Header",
  components: {
    Dropdown,
  },
  data() {
    return {
      user_data: null,
      windowWidth: ref(window.innerWidth),
      header: [
        {
          title: "Home",
          url: "/",
          is: "router-link",
        },
        {
          title: "Categorias",
          url: "/categorias",
          is: "router-link",
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 550 ? true : false;
    },
    isAuth() {
      return this.user_data != null ? true : false;
    },
  },
  methods: {
    headerItens() {
      if(this.isMobile) {

        if(!this.isAuth){
          this.header.push(
            {
              title: "Login",
              is: "router-link",
              url: "/login",
            },
            {
              title: "Registrar",
              is: "router-link",
              url: "/registro"
            }
          )
        }else if(this.user_data.eAdmin == 1){
          this.header.push(
            {
              title: "Lista de Categorias",
              is: "router-link",
              url: "/listacategorias",
            },
            {
              title: "Postagens",
              is: "router-link",
              url: "/postagens",
            },
            {
              title: "Sair",
              is: "p",
              url: "#",
            },
          )
        } else {
          this.header.push(
            {
              title: "Criar postagem",
              is: "router-link",
              url: "/postagens/add",
            },
            {
              title: "Sair",
              is: "p",
              url: "#",
            },
          )
        }
      }
      if(!this.isMobile){

        if(!this.isAuth){
            this.header.push(
            {
              title: "Login",
              is: "router-link",
              url: "/login",
            },
            {
              title: "Registrar",
              is: "router-link",
              url: "/registro"
            }
          )
        } else if(this.user_data.eAdmin == 1){
          this.header.push(
            {
              title: "Lista de Categorias",
              is: "router-link",
              url: "/listacategorias",
            },
            {
              title: "Postagens",
              is: "router-link",
              url: "/postagens",
            },
          )
        } else {
          this.header.push(
            {
              title: "Criar postagem",
              is: "router-link",
              url: "/postagens/add",
            },
          )
        }
      }
    },
    onWidthChange() {
      this.windowWidth = window.innerWidth;
    },
    async checkUser() {
      const req = await fetch(`${process.env.VUE_APP_API_URL}usuarios`);

      const res = await req.json();

      this.user_data = res.usuario;
      this.headerItens();
    },
  },
  mounted() {
    window.addEventListener("resize", this.onWidthChange);
    this.checkUser();
  },
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
#header_links li {
  padding: 10px;
  margin-left: 10px;
  text-align: center;
  transition: 0.3s ease;
  border-radius: 10px;
}
#header_links li:hover {
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
#header_user {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
#header_user li {
  max-width: 400px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  padding: 10px;
  background-color: #ffffff;
  color: #222;
  border-radius: 10px;
  cursor: pointer;
}
</style>