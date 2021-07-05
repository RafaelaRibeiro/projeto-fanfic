import Vue from "vue";
import Toasted from "vue-toasted";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toasted, {
  iconPack: "fontawesome",
  duration: 3000,
});

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

Vue.toast.register(
  "defaultSuccess",
  (payload) => (!payload.msg ? "Operação realidada com sucesso!" : payload.msg),
  { type: "success", icon: "check" }
);

Vue.toast.register(
  "defaultError",
  (payload) => (!payload.msg ? "Oops.. Erro inesperado." : payload.msg),
  { type: "error", icon: "times" }
);
