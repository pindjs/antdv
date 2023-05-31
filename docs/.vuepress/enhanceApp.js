import pageComponents from '@internal/page-components'
import AntDesign from 'ant-design-vue'
import '@pind/antdv/style.ts'

export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(AntDesign)
}
