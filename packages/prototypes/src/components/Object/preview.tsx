import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@pind/antdv/esm/__builtins__'
import { createFieldSchema } from '../Field'
import { Container } from '../../common/Container'
import { AllLocales } from '../../locales'
import type { DnFC } from '@pind/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const ObjectContainer: DnFC<VueComponent<typeof Container>> =
  composeExport(Container, {
    Behavior: createBehavior({
      name: 'Object',
      extends: ['Field'],
      selector: (node) => node.props.type === 'object',
      designerProps: {
        droppable: true,
        propsSchema: createFieldSchema(),
      },
      designerLocales: AllLocales.ObjectLocale,
    }),
    Resource: createResource({
      icon: 'ObjectSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'object',
          },
        },
      ],
    }),
  })
