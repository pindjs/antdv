import './styles.less'
import Vue from 'vue'
import App from './app'
import 'ant-design-vue/dist/antd.css'

import WidgetsInstaller from './widgets'

// Vue.config.silent = true

Vue.use(WidgetsInstaller)
Vue.config.silent = true

new Vue({
  render: (h) => h(App),
}).$mount('#app')
