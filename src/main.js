import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

//引入element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import Axios from "@/axios/api.request.js";
Vue.config.$Axios = Axios;

//这册全局组件
import columnTable from "@/components/columnTable.vue"
Vue.component("columnTable",columnTable)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
