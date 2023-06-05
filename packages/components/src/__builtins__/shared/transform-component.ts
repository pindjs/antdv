import { merge } from '@formily/shared'
import { h } from '@formily/vue'
import type { Component } from 'vue'
import { defineComponent } from 'vue'

type ListenersTransformRules = Record<string, string>

export const transformComponent = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> | any => {
  return defineComponent({
    setup(props, { attrs, slots, listeners }) {
      return () => {
        const data = {
          attrs: {
            ...attrs,
          },
          on: {
            ...listeners,
          },
        }

        if (transformRules) {
          const transformListeners = transformRules
          Object.keys(transformListeners).forEach((extract) => {
            if (data.on !== undefined) {
              data.on[transformListeners[extract]] = listeners[extract]
            }
          })
        }
        if (defaultProps) {
          data.attrs = merge(defaultProps, data.attrs)
        }

        return h(tag, data, slots)
      }
    },
  })
}
