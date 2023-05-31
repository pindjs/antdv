import { Switch as ElSwitch } from 'ant-design-vue'
import { composeExport } from '@pind/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@pind/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const Switch: DnFC<VueComponent<typeof ElSwitch>> = composeExport(
  ElSwitch,
  {
    Behavior: createBehavior({
      name: 'Switch',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Switch',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Switch),
      },
      designerLocales: AllLocales.Switch,
    }),
    Resource: createResource({
      icon: 'SwitchSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'boolean',
            title: 'Switch',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      ],
    }),
  }
)
