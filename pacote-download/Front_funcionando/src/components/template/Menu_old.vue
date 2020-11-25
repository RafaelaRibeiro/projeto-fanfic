<template >
  <div class="menu">
    
      
  <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      
      :mini-variant.sync="mini"
      permanent
      
    > 

    <v-list-item class="px-2">
        <v-list-item-avatar >
          
            
               <v-img  src="https://randomuser.me/api/portraits/women/74.jpg"></v-img>
           
          
         
          
        </v-list-item-avatar>

        <v-list-item-title>Emma Simmmons</v-list-item-title>

        
      </v-list-item>

       <v-divider></v-divider>
     
      <v-list dense>
        <template v-for="item in items"  >
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
            
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content >
                <v-list-item-title
                flat :to="path">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

           
            

            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
               
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>


         


          
          <v-list-item 
            v-else
            :key="item.text"
            link
            
          >
           
            <v-list-item-action >
              <v-icon >{{  item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }} 

              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
             
        
        </template>
      </v-list>
    </v-navigation-drawer>
    

  </div>
</template>

<script>

export default {
    
    name: 'Menu',
    computed: {
      miniNovo() {
        return this.$store.state.mini 
              
      }
    },
    data: () => ({
    
      drawer: null,
      
      
      items: [
        { icon: 'mdi-account', text: 'Meu Perfil' },
        { icon: 'mdi-bookshelf', text: 'Minha Estante', path:'/minhaestante' },
              
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Minha Mesa',
          model: false,
          children: [
            { icon: 'mdi-book',text: 'Minhas Histórias' },
            { icon: 'mdi-pencil-box-multiple',text: 'Minhas Notas' },
            
          ],
        },
        { icon: 'mdi-comment', text: 'Comentários' },
        { icon: 'mdi-send', text: 'Mensagens' },
        { icon: 'mdi-help-circle', text: 'Help' },
        { icon: 'mdi-settings', text: 'Configurações' },
        { icon: 'mdi-logout', text: 'Sair' },
      ],
    }),
  

}
</script>

<style>
    
    
</style>