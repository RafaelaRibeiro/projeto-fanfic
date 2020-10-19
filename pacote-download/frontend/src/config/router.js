import Vue from 'vue'
import VueRouter from 'vue-router'

import MinhaEstante from '../components/estante/MinhaEstante'
import Perfil from '../components/perfil/Perfil'
import ObrasPrivadas from '../components/mesa/ObrasPrivadas'
import ObrasPublicas from '../components/mesa/ObrasPublicas'
import AdicionarObra from '../components/mesa/AdicionarObra'
import EditarObra from '../components/mesa/EditarObra'
import EditarCapitulo from '../components/mesa/EditarCapitulo'
import AdicionarCapitulo from '../components/mesa/AdicionarCapitulo'
import CapituloById from '../components/obras/CapituloById'
import ObraById from '../components/obras/ObraById'
import Notas from '../components/mesa/notas/Notas'
import Auth from '@/components/auth/Auth'
import RedefinirSenha from '@/components/auth/RedefinirSenha'

import Configuracoes from '../components/configuracoes/Configuracoes'
import CadastroDados from '../components/baseDados/CadastroDados'
import NotFound from '@/components/template/NotFound'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFound,
  },

  {
    name: 'login',
    path: '/login',
    component: Auth,
    meta: {
      requireLogin: true,
    },
  },

  {
    name: 'cadastroDados',
    path: '/basededados',
    component: CadastroDados,
    meta: { requiresAuth: true },
  },

  {
    name: 'minhaEstante',
    path: '/minhaestante',
    component: MinhaEstante,
    meta: { requiresAuth: true },
  },
  {
    name: 'perfil',
    path: '/perfil/:user',
    component: Perfil,
    meta: { requiresAuth: true },
  },
  {
    name: 'notas',
    path: '/notas/:autor',
    component: Notas,
    meta: { requiresAuth: true },
  },
  {
    name: 'obrasPrivadas',
    path: '/mesa/obrasprivadas',
    component: ObrasPrivadas,
    meta: { requiresAuth: true },
  },
  {
    name: 'obrasPublicas',
    path: '/mesa/obraspublicas',
    component: ObrasPublicas,
    meta: { requiresAuth: true },
  },
  {
    name: 'adicionarObra',
    path: '/mesa/adicionarobra',
    component: AdicionarObra,
    meta: { requiresAuth: true },
  },

  {
    name: 'EditarObra',
    path: '/mesa/:id/editarobra',
    component: EditarObra,
    meta: { requiresAuth: true },
  },

  {
    name: 'EditarCapitulo',
    path: '/mesa/:obraId/editarcapitulo/:numero',
    component: EditarCapitulo,
    meta: { requiresAuth: true },
  },

  {
    name: 'adicionarCapitulo',
    path: '/mesa/:id/adicionarCapitulo',
    component: AdicionarCapitulo,
    meta: { requiresAuth: true },
  },

  {
    name: 'CapituloById',
    path: '/obra/:obraId/capitulo/:numero',
    component: CapituloById,
    meta: { requiresAuth: true },
  },
  {
    name: 'ObraById',
    path: '/obra/:obraId',
    component: ObraById,
    meta: { requiresAuth: true },
  },

  {
    name: 'Configuracoes',
    path: '/configuracoes',
    component: Configuracoes,
    meta: { requiresAuth: true },
  },

  {
    name: 'RedefinirSenha',
    path: '/redefinirsenha/:token',
    component: RedefinirSenha,
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(json)
    user ? next() : next({ path: '/login' })
  } else {
    next()
  }

  if (to.matched.some(record => record.meta.requireLogin)) {
    const user = JSON.parse(json)
    user ? next({ path: `/perfil/${user.user}` }) : next()
  } else {
    next()
  }
})

export default router
