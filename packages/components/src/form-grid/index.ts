import type { IGridOptions } from '@formily/grid'
import { Grid } from '@formily/grid'
import { markRaw } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { h } from '@formily/vue'
import type { InjectionKey, PropType, Ref } from 'vue'
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
  watchEffect,
} from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'
import { useFormLayout } from '../form-layout'

export interface IFormGridProps extends IGridOptions {
  grid?: Grid<HTMLElement>
  prefixCls?: string
  className?: string
}

const FormGridSymbol: InjectionKey<Ref<Grid<HTMLElement>>> =
  Symbol('FormGridContext')

interface GridColumnProps {
  gridSpan: number
}

export const createFormGrid = (props: IFormGridProps): Grid<HTMLElement> => {
  return markRaw(new Grid(props))
}

export const useFormGrid = (): Ref<Grid<HTMLElement>> => inject(FormGridSymbol)

/**
 * @deprecated
 */
const useGridSpan = (gridSpan: number) => {
  return gridSpan
}

/**
 * @deprecated
 */
export const useGridColumn = (gridSpan = 1) => {
  return gridSpan
}

const FormGridInner = observer(
  defineComponent({
    name: 'FormGrid',
    props: {
      columnGap: {
        type: Number,
      },
      rowGap: {
        type: Number,
      },
      minColumns: {
        type: [Number, Array],
      },
      minWidth: {
        type: [Number, Array],
      },
      maxColumns: {
        type: [Number, Array],
      },
      maxWidth: {
        type: [Number, Array],
      },
      breakpoints: {
        type: Array,
      },
      colWrap: {
        type: Boolean,
        default: true,
      },
      strictAutoFit: {
        type: Boolean,
        default: false,
      },
      shouldVisible: {
        type: Function as PropType<IGridOptions['shouldVisible']>,
        default() {
          return () => true
        },
      },
      grid: {
        type: Object as PropType<Grid<HTMLElement>>,
      },
    },
    setup(props, { slots }) {
      const layout = useFormLayout()

      const gridInstance = computed(() => {
        const newProps: IFormGridProps = {}
        Object.keys(props).forEach((key) => {
          if (typeof props[key] !== 'undefined') {
            newProps[key] = props[key]
          }
        })
        const options = {
          columnGap: layout.value?.gridColumnGap ?? 8,
          rowGap: layout.value?.gridRowGap ?? 4,
          ...newProps,
        }
        return markRaw(options?.grid ? options.grid : new Grid(options))
      })
      const prefixCls = usePrefixCls('formily-form-grid')
      const rootRef = ref(null)

      provide(FormGridSymbol, gridInstance)

      onMounted(() => {
        watchEffect((onInvalidate) => {
          const dispose = gridInstance.value.connect(rootRef.value)
          onInvalidate(() => {
            dispose()
          })
        })
      })

      return () => {
        return h(
          'div',
          {
            attrs: {
              class: `${prefixCls}`,
            },
            style: {
              gridTemplateColumns: gridInstance.value.templateColumns,
              gap: gridInstance.value.gap,
            },
            ref: rootRef,
          },
          {
            default: () => slots.default?.(),
          }
        )
      }
    },
  })
) as any

const FormGridColumn = observer(
  defineComponent<GridColumnProps>({
    name: 'FormGridColumn',
    props: {
      gridSpan: {
        type: Number,
        default: 1,
      },
    },
    setup(props, { slots }) {
      return () => {
        return h(
          'div',
          {
            attrs: {
              'data-grid-span': props.gridSpan,
            },
          },
          slots
        )
      }
    },
  })
)

export const FormGrid = composeExport(FormGridInner, {
  GridColumn: FormGridColumn,
  useGridSpan,
  useFormGrid,
  createFormGrid,
})

export default FormGrid
