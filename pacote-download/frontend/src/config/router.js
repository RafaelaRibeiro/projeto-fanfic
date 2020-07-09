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
import Configuracoes from '../components/configuracoes/Configuracoes'

Vue.use(VueRouter)

const routes = [
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
  },
  {
    name: 'minhaEstante',
    path: '/minhaestante',
    component: MinhaEstante,
  },
  {
    name: 'perfil',
    path: '/perfil/:user',
    component: Perfil,
  },
  {
    name: 'notas',
    path: '/notas/:autor',
    component: Notas,
  },
  {
    name: 'obrasPrivadas',
    path: '/mesa/obrasprivadas',
    component: ObrasPrivadas,
  },
  {
    name: 'obrasPublicas',
    path: '/mesa/obraspublicas',
    component: ObrasPublicas,
  },
  {
    name: 'adicionarObra',
    path: '/mesa/adicionarobra',
    component: AdicionarObra,
  },

  {
    name: 'EditarObra',
    path: '/mesa/:obraId/editarobra',
    component: EditarObra,
  },

  {
    name: 'EditarCapitulo',
    path: '/mesa/:obraId/editarcapitulo/:numero',
    component: EditarCapitulo,
  },

  {
    name: 'adicionarCapitulo',
    path: '/mesa/:obraId/adicionarCapitulo',
    component: AdicionarCapitulo,
  },

  {
    name: 'CapituloById',
    path: '/obra/:obraId/capitulo/:numero',
    component: CapituloById,
  },
  {
    name: 'ObraById',
    path: '/obra/:obraId',
    component: ObraById,
  },

  {
    name: 'Configuracoes',
    path: '/configuracoes',
    component: Configuracoes,
  },
]

export default new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})
