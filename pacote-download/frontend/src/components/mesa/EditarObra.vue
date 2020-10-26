<template>
  <v-container >
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-4">
          <i> <v-icon x-large class="pa-3">mdi-notebook</v-icon>Editar Obra </i>
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col>
            <v-text-field
              v-model="obra.nome"
              color="deep-purple darken-4"
              dense
              outlined
              value
              label="Título"
            ></v-text-field>

            <v-file-input
              small-chips
              v-model="imagemObra"
              color="deep-purple darken-4"
              label="Capa da Obra"
              dense
              outlined
              prepend-icon="mdi-camera"
              show-size
              accept="image/png, image/jpeg, image/bmp"
            ></v-file-input>

            <v-textarea
              v-model="obra.sinopse"
              color="deep-purple darken-4"
              dense
              outlined
              auto-grow
              label="Sinopse"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="searchA"
              cache-items
              outlined
              dense
              label="Co-Autor"
            ></v-autocomplete>
            <v-select
              v-model="obra.categoriaId"
              :items="categorias"
              label="Categoria"
              item-text="nome"
              item-value="id"
              outlined
              dense
            ></v-select>

            <v-autocomplete
              v-model="obra.shippPrincipal"
              :items="shippLista"
              label="Shipp Principal"
              item-text="nome"
              item-value="id"
              dense
              small
              outlined
              color="deep-purple darken-4"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-select
              v-model="obra.classificacao"
              :items="classificacao"
              label="Classificação"
              item-text="nome"
              item-value="cod"
              dense
              outlined
              color="deep-purple darken-4"
            ></v-select>
            <v-autocomplete
              v-model="obra.fandonsId"
              cache-items
              :items="list"
              outlined
              dense
              multiple
              item-text="nome"
              item-value="id"
              label="Universo"
            ></v-autocomplete>

            <v-autocomplete
              v-model="obra.shippSecundario"
              cache-items
              :items="shippLista"
              multiple
              outlined
              dense
              item-text="nome"
              item-value="id"
              label="Shipp Secundário"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h5>
              <i>Características da Obra</i>
            </h5>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <v-checkbox
              v-for="c in caracteristicas.slice(0, 4)"
              :key="c.id"
              v-model="obra.caracteristicasId"
              dense
              class="ma-0"
              :label="c.nome"
              :value="c.id"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-for="c in caracteristicas.slice(5, 9)"
              :key="c.id"
              v-model="obra.caracteristicasId"
              dense
              class="ma-0"
              :label="c.nome"
              :value="c.id"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h5>
              <i>Avisos Importantes</i>
            </h5>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <v-checkbox
              v-for="aviso in avisos.slice(0, 4)"
              :key="aviso.id"
              v-model="obra.avisosId"
              dense
              class="ma-0"
              :label="aviso.nome"
              :value="aviso.id"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-for="aviso in avisos.slice(4, 8)"
              :key="aviso.id"
              v-model="obra.avisosId"
              dense
              class="ma-0"
              :label="aviso.nome"
              :value="aviso.id"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-for="aviso in avisos.slice(8, 12)"
              :key="aviso.id"
              v-model="obra.avisosId"
              dense
              class="ma-0"
              :label="aviso.nome"
              :value="aviso.id"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn dark class="ma-3" color="green darken-4" @click="salvarObra">Salvar</v-btn>
            <v-btn dark class="ma-3" color="red darken-3">Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'EditarObra',
  data() {
    return {
      selectedCateg: [],
      search: [],
      selected: [],
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
      editarObs: false,
      terminada: false,
      publica: false,
      model: null,
      desabilitado: false,
      imagemObra: {
        name: '',
        size: 0,
      },
      name: 'Midnight Crew',
      shipps: [],
      categorias: [],
      obra: { fandonsId: [], caracteristicasId: [], avisosId: [] },
      a: [0],
      universos: [],
      caracteristicas: [],
      avisos: [],
      classificacao: [
        { nome: 'Livre', cod: 'livre' },
        { nome: 'Acima de 10 Anos', cod: '10+' },
        { nome: 'Acima de 12 Anos', cod: '12+' },
        { nome: 'Acima de 14 Anos', cod: '14+' },
        { nome: 'Acima de 16 Anos', cod: '16+' },
        { nome: 'Acima de 18 Anos', cod: '18+' },
      ],
      now: moment().format('YYYY-MM-DD HH:mm:ss'),
      loading: false,
      items: [],
      searchA: null,
      select: null,
    }
  },

  methods: {
    // /:autor/mesa/adicionarobra
    getObras() {
      const url = ` ${baseApiUrl}/${this.user.id}/mesa/${this.$route.params.id}/`
      axios.get(url).then((res) => {
        this.obra = res.data
        this.obra.avisosId = this.obra.avisosId.split(',')
        this.obra.avisosId = this.obra.avisosId.map(Number)
        this.obra.caracteristicasId = this.obra.caracteristicasId.split(',')
        this.obra.caracteristicasId = this.obra.caracteristicasId.map(Number)
        this.obra.fandonsId = this.obra.fandonsId.split(',')
        this.obra.fandonsId = this.obra.fandonsId.map(Number)
        this.obra.shippSecundario = this.obra.shippSecundario.split(',')
        this.obra.shippSecundario = this.obra.shippSecundario.map(Number)
      })
    },

    salvarObra() {
      axios
        .put(`${baseApiUrl}/mesa/${this.$route.params.obraId}/editarobra`, {
          nome: this.obra.nome,
          autor: this.obra.autor,
          publica: this.obra.publica,
          categoriaId: this.obra.categoriaId,
          fandonsId: [this.obra.fandonsId].join(','),
          shippPrincipal: this.obra.shippPrincipal,
          shippSecundario: [this.obra.shippSecundario].join(','),
          classificacao: this.obra.classificacao,
          terminada: this.obra.terminada,
          sinopse: this.obra.sinopse,
          caracteristicasId: [this.obra.caracteristicasId].join(','),
          avisosId: [this.obra.avisosId].join(','),
        })
        .then(() => {
          if (this.imagemObra.size === 0) {
            this.$toasted.global.defaultSuccess()
            this.$router.push({ path: `/obra/${this.obra.id}/` })
          } else var fd = new FormData()
          fd.append('file', this.imagemObra)
          axios
            .post(`${baseApiUrl}/obra/${this.obra.id}/upload`, fd)
            .then(() => {
              this.$toasted.global.defaultSuccess()
              this.$router.push({ path: `/obra/${this.obra.id}/` })
            })
            .catch(showError)
        })
        .catch(showError)
    },

    getCategorias() {
      const url = ` ${baseApiUrl}/categorias`
      axios(url).then((res) => {
        this.categorias = res.data
      })
    },
    getUniversos() {
      const url = ` ${baseApiUrl}/universos`
      axios(url).then((res) => {
        this.universos = res.data.concat(this.universos)
      })
    },
    getShipps() {
      const url = ` ${baseApiUrl}/shipp`
      axios(url).then((res) => {
        this.shipps = res.data
      })
    },

    getCaracteristicas() {
      const url = ` ${baseApiUrl}/caracteristicas`
      axios(url).then((res) => {
        this.caracteristicas = res.data
      })
    },
    getAvisos() {
      const url = ` ${baseApiUrl}/avisos`
      axios(url).then((res) => {
        this.avisos = res.data
      })
    },
  },

  computed: {
    list() {
      const a = this.universos.filter((e) => {
        return e.categoriaId == this.obra.categoriaId
      })
      return a
    },

    user() {
      return this.$store.getters.usuario
    },

    shippLista() {
      const a = this.shipps.filter((e) => this.obra.fandonsId.includes(e.fandonsId))
      return a
    },

    ...mapState(['usuario']),
  },

  mounted() {
    this.getObras()
    this.getCategorias()
    this.getUniversos()
    this.getShipps()
    this.getCaracteristicas()
    this.getAvisos()
  },
}
</script>

<style>
.theme--light.v-label {
  color: #000;
  margin-bottom: 0;
}
</style>