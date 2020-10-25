<template>
  <div>
    <v-card outlined class="mr-1">
      <v-card flat>
        <!-- <router-link :to="{ name: 'ObraById', params: { obraId: capitulo.obraId } }">
            {{ item.nome }}
            {{ item.obraId }}
          </router-link> -->

        <v-row>
          <v-col class="ml-2" cols="12" md="5">
            <span class="md-body-1 font-weight-medium"> {{ capitulo.numero }} - {{ capitulo.nome }} </span>
          </v-col>
          <v-col class="ml-2" cols="12" md="5">
            <span class="md-body-1font-weight-medium">
              <strong>Adicionado em:</strong> {{ capitulo.dataPostagem }}</span
            >
          </v-col>
          <!-- <v-col class="d-flex align-end flex-column mr-3">
            <span v-if="capitulo.publica">
              <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" class="d-flex align-end flex-column mr-3"
                    >mdi-lock-open-variant</v-icon
                  >
                </template>
                <span>Publico</span>
              </v-tooltip>
            </span>

            <span v-else>
              <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" class="d-flex align-end flex-column mr-3">mdi-lock</v-icon>
                </template>
                <span>Privado</span>
              </v-tooltip>
            </span>
          </v-col> -->

          <v-col align-end class="d-flex align-end flex-column mr-3">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>

              <md-list class="md-dense">
                <md-list-item>
                  <v-icon small left>mdi-file-edit</v-icon>

                  <span class="md-list-item-text">Editar Capitulo</span>
                </md-list-item>

                <md-list-item>
                  <v-icon small left>mdi-delete</v-icon>
                  <span class="md-list-item-text">Deletar Capitulo</span>
                </md-list-item>
              </md-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCapitulo',
  props: ['capitulo'],
}
</script>

<style>
</style>