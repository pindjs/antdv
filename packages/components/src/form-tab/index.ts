import type { Schema, SchemaKey } from '@formily/json-schema'
import { model } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import {
  Fragment,
  h,
  RecursionField,
  useField,
  useFieldSchema,
} from '@formily/vue'
import { Badge, Tabs } from 'ant-design-vue'
import type { TabPane as TabPaneProps } from 'ant-design-vue/types/tabs/tab-pane'
import type { Tabs as TabsProps } from 'ant-design-vue/types/tabs/tabs'
import { computed, defineComponent, reactive, watchEffect } from 'vue'
import { composeExport, evalListener, usePrefixCls } from '../__builtins__'

const { TabPane } = Tabs

export interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: string
}

const useTabs = () => {
  const tabsFieldRef = useField()
  const schemaRef = useFieldSchema()
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = reactive([])
  watchEffect(() => {
    schemaRef.value.mapProperties((schema, name) => {
      const field = tabsFieldRef.value
        .query(tabsFieldRef.value.address.concat(name))
        .take()
      if (field?.display === 'none' || field?.display === 'hidden') return
      if (schema['x-component']?.indexOf('TabPane') > -1) {
        tabs.push({
          name,
          props: {
            key: schema?.['x-component-props']?.key || name,
            ...schema?.['x-component-props'],
          },
          schema,
        })
      }
    })
  })
  return tabs
}

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

const FormTabInner = observer(
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent<IFormTabProps>({
    name: 'FormTab',
    props: ['formTab'],
    setup(props, { attrs, listeners }) {
      const field = useField().value
      const formTabRef = computed(() => props.formTab ?? createFormTab())

      const prefixCls = usePrefixCls(
        'formily-form-tab',
        attrs.prefixCls as string
      )
      const tabs = useTabs()

      return () => {
        const formTab = formTabRef.value
        const activeKey =
          props.activeKey || formTab?.activeKey || tabs?.[0]?.name
        const badgedTab = (key: SchemaKey, props: any) => {
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `${field.address.concat(key)}.*`,
          })
          if (errors.length) {
            return () =>
              h(
                Badge,
                {
                  class: [`${prefixCls}-errors-badge`],
                  props: {
                    count: errors.length,
                    size: 'small',
                  },
                },
                { default: () => props.tab }
              )
          }
          return props.tab
        }

        const getTabs = (tabs: { props: any; schema: any; name: any }[]) => {
          return tabs.map(({ props, schema, name }) => {
            return h(
              TabPane,
              {
                key: name,
                props: {
                  ...props,
                  tab: badgedTab(name, props),
                  forceRender: true,
                },
              },
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      props: {
                        schema,
                        name,
                      },
                    },
                    {}
                  ),
                ],
              }
            )
          })
        }
        return h(
          Tabs,
          {
            class: [prefixCls],
            style: attrs.style,
            props: {
              ...attrs,
              activeKey: activeKey,
            },
            on: {
              ...listeners,
              change: (key: string) => {
                evalListener(listeners.change, key)
                formTab.setActiveKey?.(key)
              },
            },
          },
          {
            default: () => getTabs(tabs),
          }
        )
      }
    },
  })
)

// eslint-disable-next-line vue/one-component-per-file
const FormTabPane = defineComponent<IFormTabPaneProps>({
  name: 'FormTabPane',
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

export const FormTab = composeExport(FormTabInner, {
  TabPane: FormTabPane,
  createFormTab,
})

export default FormTab
