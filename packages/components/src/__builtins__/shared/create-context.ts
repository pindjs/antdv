import type { InjectionKey, Ref, DefineComponent } from 'vue'
import { defineComponent, inject, provide, readonly, ref, toRef } from 'vue'

export type CreateContext<T> = {
  Provider: DefineComponent<{ value: any }>
  Consumer: DefineComponent<{}>
  injectKey: InjectionKey<Ref<T>>
}

export const createProvide = <T>(
  injectKey: InjectionKey<Ref<T>>,
  defaultValue?: T
): CreateContext<T> => {
  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      },
      setup(props, { slots }) {
        const value = toRef(props, 'value')
        provide(injectKey, readonly(value))
        return () => slots?.default?.()
      },
    }),

    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(injectKey)

        return () => slots?.default?.(value)
      },
    }),
    injectKey,
  }
}

export const createContext = <T>(defaultValue?: T): CreateContext<T> => {
  const injectKey: InjectionKey<Ref<T>> = Symbol()
  return createProvide(injectKey, defaultValue)
}

export const useContext = <T>(context: CreateContext<T>): Ref<T> => {
  const key = context.injectKey

  return inject(key, ref(null))
}
