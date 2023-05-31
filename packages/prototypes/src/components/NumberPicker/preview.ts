import { InputNumber as FormilyInputNumber } from '@pind/antdv'
import { composeExport } from '@pind/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@pind/antdv-designable'
import type { VueComponent } from '@formily/vue'

const NumberPicker: DnFC<VueComponent<typeof FormilyInputNumber>> =
  composeExport(FormilyInputNumber, {
    Behavior: createBehavior({
      name: 'InputNumber',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'InputNumber',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.InputNumber),
      },
      designerLocales: AllLocales.InputNumber,
    }),
    Resource: createResource({
      icon: 'NumberPickerSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'number',
            title: 'InputNumber',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              'controls-position': 'right',
            },
          },
        },
      ],
    }),
  })

export const InputNumber = NumberPicker
