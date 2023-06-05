import { defineComponent, unref } from 'vue'
import { Card as AntCard } from 'ant-design-vue'
import { composeExport } from '@shebao/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { uid } from '@designable/shared'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
} from '@shebao/antdv-designable'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Card = composeExport(
  defineComponent({
    props: { title: {} },
    setup(props, { attrs }) {
      const nodeRef = useTreeNode()

      return () => {
        const node = unref(nodeRef)

        return (
          <AntCard
            attrs={attrs}
            scopedSlots={{
              title: () => (
                <span data-content-editable="x-component-props.title">
                  {props.title}
                </span>
              ),
            }}
          >
            {node.children.length ? (
              node.children.map((child) => (
                <TreeNodeWidget key={uid()} node={child} />
              ))
            ) : (
              <DroppableWidget key={uid()} node={node} />
            )}
          </AntCard>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'Card',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Card',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Card),
      },
      designerLocales: AllLocales.Card,
    }),
    Resource: createResource({
      icon: 'CardSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Card',
            'x-component-props': {
              title: 'Title',
            },
          },
        },
      ],
    }),
  }
)
