import { createRouter, createWebHistory } from 'vue-router'
import EditarCategoria from '../views/Categoria/EditarCategoria.vue'
import FormCategoria from '../views/Categoria/FormCategoria.vue'
import ListaCategoria from '../views/Categoria/ListaCategoria.vue'
import Categoria from '../views/Categoria.vue'

import EditarPostagem from '../views/Postagem/EditarPostagem.vue'
import FormPostagem from '../views/Postagem/FormPostagem.vue'
import ListaPostagem from '../views/Postagem/ListaPostagem.vue'
import Postagem from '../views/Postagem.vue'

import Home from '../views/Home.vue'
import Registro from '../views/Registro.vue'
import Login from '../views/Login.vue'

import SlugPostagem from '../views/Categoria/SlugPostagens.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		props: true
	},
	{
		path: '/registro',
		name: 'Registro',
		component: Registro
	},
	{
		path: '/Login',
		name: 'Login',
		component: Login,
		props: true
	},
	{
		path: '/postagem/:slug',
		name: 'Postagem',
		component: Postagem,
		props: true
	},
	{
		path: '/categorias/:slug',
		name: 'SlugPostagens',
		component: SlugPostagem,
		props: true
	},
	{
		path: '/categorias',
		name: 'Categorias',
		component: Categoria
	},
	{
		path: '/listacategorias',
		name: 'ListaCategorias',
		component: ListaCategoria,
		props: true
	},
	{
		path: '/categorias/add',
		name: 'FormularioCategorias',
		component: FormCategoria,
	},
	{
		path: '/categorias/editar/:id',
		name: 'EditarCategorias',
		component: EditarCategoria,
		props: true
	},
	{
		path: '/postagens',
		name: 'Postagens',
		component: ListaPostagem,
		props: true
	},
	{
		path: '/postagens/add',
		name: 'FormularioPostagens',
		component: FormPostagem,
	},
	{
		path: '/postagens/editar/:id',
		name: 'EditarPostagens',
		component: EditarPostagem,
		props: true
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router