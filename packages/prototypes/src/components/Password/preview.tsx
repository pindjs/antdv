import { Password as FormilyPassword } from '@pind/antdv'
import { composeExport } from '@pind/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { merge } from '@formily/shared'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@pind/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const Password: DnFC<VueComponent<typeof FormilyPassword>> =
  composeExport(FormilyPassword, {
    Behavior: createBehavior({
      name: 'Password',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Password',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Input),
      },
      designerLocales: merge(AllLocales.Input, {
        'zh-CN': {
          title: '密码输入',
        },
        'en-US': {
          title: 'PassWord',
        },
      }),
    }),
    Resource: createResource({
      icon: 'PasswordSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Password',
            'x-decorator': 'FormItem',
            'x-component': 'Password',
          },
        },
      ],
    }),
  })
