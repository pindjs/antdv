import { defineComponent, computed } from 'vue'
import { transformToSchema } from '@designable/formily-transformer'
import { createForm } from '@formily/core'
import { Form } from '@shebao/antdv'
import * as Antdv from '@shebao/antdv'
import { createSchemaField } from '@formily/vue'
import { Text } from '@shebao/antdv-prototypes'
import type { Component } from 'vue'
import type { SchemaVueComponents } from '@formily/vue'

const SchemaFields = createSchemaField({
  components: {
    Text: Text as Component,
    ...(Antdv as SchemaVueComponents),
  },
})

export default defineComponent({
  name: 'DnPreviewWidget',
  props: ['tree'],
  setup(props) {
    const form = createForm()
    const treeSchema = computed(() => transformToSchema(props.tree))

    return () => {
      const { form: { style, ...formProps } = {}, schema } = treeSchema.value
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
          <Form form={form} style={style} attrs={formProps}>
            <SchemaFields.SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
