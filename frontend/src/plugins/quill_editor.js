import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor'
// Permite drag and drop de imagem no editor
import { ImageDrop } from 'quill-image-drop-module'
// Adiciona suporte ao resize de imagem
import ImageResize from '@appsflare/quill-image-resize-module'
// Adiciona suporte a emojis (editor sem emojis não é editor 😏)
import QuillEmoji from 'quill-emoji'
// Tema do quill
import 'quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
Quill.register({
  'modules/imageDrop': ImageDrop,
  'modules/imageResize': ImageResize,
  'modules/emoji': QuillEmoji,
})
Vue.use(VueQuillEditor)
