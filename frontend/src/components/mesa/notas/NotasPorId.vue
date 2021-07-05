<template>
    <div class="article-by-id">
      
        <div class="article-content" v-html="nota.conteudo"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl} from '../../global'
import axios from 'axios'

export default {
    name: 'NotaPorId',
   
    data() {
        return {
            nota: {}
        }
    },
    mounted(){
        const url = ` ${baseApiUrl}/usuarios/2/notas/${this.$route.params.id} `
        axios.get(url).then(res => this.article = res.data)
    },
  updated() {
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }

}
</script>

<style>
    .article-content {
        background: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
    }

    .article-content img {
        max-width: 100%;

    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>