import { FormLayout as FormilyFormLayout } from '@pind/antdv'
import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@pind/antdv/esm/__builtins__'
import { withContainer } from '../../common/Container'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@pind/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const FormLayout: DnFC<VueComponent<typeof FormilyFormLayout>> =
  composeExport(withContainer(FormilyFormLayout), {
    Behavior: createBehavior({
      name: 'FormLayout',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'FormLayout',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.FormLayout),
      },
      designerLocales: AllLocales.FormLayout,
    }),
    Resource: createResource({
      icon: 'FormLayoutSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormLayout',
          },
        },
      ],
    }),
  })
