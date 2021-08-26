<template>
  <v-container v-if="visible" fluid class="mt-1">
    <Loading />
  </v-container>
  <v-card flat v-else min-height="500px" class="ma-2">
    <v-container fluid>
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-2">
            <v-icon x-large class="pa-3">mdi-send</v-icon>Mensagens
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-card outlined>
            <v-navigation-drawer permanent>
              <v-list-item class="ma-3">
                <v-list-item-title
                  ><v-btn small block color="deep-purple darken-4" dark>
                    <v-icon left dark>
                      mdi-pencil
                    </v-icon>
                    Escrever</v-btn
                  ></v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>
              <md-list
                class="md-dense pa-0 mb-2"
                v-for="item in items"
                :key="item.text"
              >
                <md-list-item @click.stop="item.action">
                  <v-icon class="pr-6">{{ item.icon }}</v-icon>
                  <span color="red" class="md-list-item-text">{{
                    item.text
                  }}</span>
                </md-list-item>
              </md-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card v-if="loading" fluid class="mt-1" height="330" flat outlined>
            <Loading />
          </v-card>

          <v-card v-else flat outlined>
            <v-card-title>
              <v-text-field
                dense
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                outlined
              ></v-text-field>
            </v-card-title>
            <v-data-table
              show-select
              :headers="headers"
              :items="desserts"
              :search="search"
              v-model="selected"
              item-key="id"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              @page-count="pageCount = $event"
              hide-default-footer
              :sort-by.sync="columnName"
              :sort-desc.sync="isDescending"
            >
              <template v-slot:[`item.favoritos`]="{ item }">
                <v-btn v-if="item.favoritos" icon small>
                  <v-icon
                    v-model="item.favoritos"
                    @click.prevent="updateFavorite"
                    small
                    color="yellow darken-1"
                  >
                    mdi-star
                  </v-icon>
                </v-btn>
                <v-btn v-else text icon small>
                  <v-icon
                    @click.prevent="updateFavorite"
                    v-model="item.favoritos"
                    small
                  >
                    mdi-star-outline
                  </v-icon>
                </v-btn>
              </template>

              <template v-slot:[`item.nome`]="{ item }">
                <router-link
                  :to="{ name: 'MessageById', params: { messageId: item.id } }"
                >
                  <span v-if="item.readAt" class="font-weight-light">
                    {{ item.nome }}</span
                  >
                  <span v-else class="font-weight-bold"> {{ item.nome }}</span>
                </router-link>
              </template>
              <template v-slot:[`item.assunto`]="{ item }">
                <router-link
                  :to="{ name: 'MessageById', params: { messageId: item.id } }"
                >
                  <span v-if="item.readAt" class="font-weight-light">
                    {{ item.assunto }}</span
                  >
                  <span v-else class="font-weight-bold">
                    {{ item.assunto }}</span
                  >
                </router-link>
              </template>
            </v-data-table>

            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Loading from "../template/Loading";
import axios from "axios";
import { baseApiUrl } from "../../global";
import { mapState } from "vuex";
export default {
  name: "Mensagens",
  components: { Loading },

  data() {
    return {
      visible: false,
      selectedItem: 0,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      columnName: "dtCreateAt",
      isDescending: true,
      loading: true,
      items: [
        {
          text: "Caixa de entrada",
          icon: "mdi-email-newsletter",
          action: this.getMensagensRecebidas,
        },
        {
          text: "Enviados",
          icon: "mdi-send",
          action: this.getMensagensEnviadas,
        },
        { text: "Favoritos", icon: "mdi-star", action: null },
        { text: "Spam", icon: "mdi-alert-octagon", action: "" },

        { text: "Lixeira", icon: "mdi-delete", action: "" },
      ],

      search: "",
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          width: "2%",
          value: "favoritos",
        },
        {
          text: "Nome",
          align: "start",
          sortable: false,
          value: "nome",
          width: "15%",
        },

        { text: "Assunto", align: "start", value: "assunto" },
        { text: "Data", value: "createAt", align: "end", width: "10%" },
      ],
      desserts: [],
    };
  },

  computed: {
    ...mapState(["usuario"]),
  },

  methods: {
    getMensagensRecebidas() {
      const url = ` ${baseApiUrl}/mensagens/${this.usuario.id}/recebidas`;
      axios(url).then((res) => {
        this.desserts = res.data;
        this.loading = false;
      });
    },
    getMensagensEnviadas() {
      const url = ` ${baseApiUrl}/mensagens/${this.usuario.id}/enviadas`;
      axios(url).then((res) => {
        this.desserts = res.data;
        this.loading = false;
      });
    },

    updateFavorite() {
      // axios
      //   .put(`${baseApiUrl}/mensagens/${this.usuario.id}`, {
      //     id: this.selected.id,
      //     favoritos: this.selected.favoritos,
      //   })
      //   .then(() => {
      //     this.$toast.success('Dados do perfil atualizados')
      //   })
      //   .catch(showError)

      this.item.favoritos = !this.item.favoritos;
    },
  },

  mounted() {
    this.getMensagensRecebidas();
  },
};
</script>

<style></style>
