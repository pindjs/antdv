import type { IFieldResetOptions } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { h, useParentForm } from '@formily/vue'
import { Button as AntButton } from 'ant-design-vue'
import type { Button as IAntButton } from 'ant-design-vue/types/button/button'
import { defineComponent } from 'vue'
import { evalListener } from '../__builtins__'

export type ResetProps = IFieldResetOptions & IAntButton

export const Reset = observer(
  defineComponent<ResetProps>({
    name: 'Reset',
    props: {
      forceClear: {
        type: Boolean,
        default: false,
      },
      validate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, context) {
      const formRef = useParentForm()
      const { listeners, slots } = context
      return () => {
        const form = formRef?.value
        return h(
          AntButton,
          {
            attrs: context.attrs,
            on: {
              ...listeners,
              click: async (e: any) => {
                const result = await evalListener(listeners.click, e)
                if (result === false) return
                form
                  ?.reset('*', {
                    forceClear: props.forceClear,
                    validate: props.validate,
                  })
                  .then(listeners.resetValidateSuccess as (e: any) => void)
                  .catch(listeners.resetValidateFailed as (e: any) => void)
              },
            },
          },
          slots
        )
      }
    },
  })
)

export default Reset
