import { usePrefix } from '@shebao/antdv-designable'
import { Input, Popover } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { Sketch as ColorPicker } from 'vue-color'
import './styles.less'

export interface IColorInputProps {
  value?: string
  popupProps?: Record<string, any>
  colorPickerProps?: Record<string, any>
}

export const ColorInput = defineComponent({
  emits: ['change'],
  props: {
    value: String,
    popupProps: Object,
    colorPickerProps: Object,
  },
  setup(props, { attrs, emit }) {
    const prefixRef = usePrefix('color-input')
    const containerRef = ref<HTMLDivElement>()

    return () => (
      <div ref={containerRef} class={prefixRef.value}>
        <Input
          value={props.value}
          placeholder="Color"
          attrs={attrs}
          scopedSlots={{
            prefix: () => (
              <Popover
                props={{
                  ...props.popupProps,
                  trigger: 'click',
                  autoAdjustOverflow: true,
                  overlayInnerStyle: { padding: 0 },
                  getPopupContainer: () => containerRef.value,
                }}
                scopedSlots={{
                  content: () => (
                    <ColorPicker
                      props={{
                        ...props.colorPickerProps,
                        value: props.value || {},
                      }}
                      onInput={({ hex, rgba }) => {
                        emit(
                          'change',
                          props.colorPickerProps?.disableAlpha
                            ? hex
                            : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
                        )
                      }}
                    />
                  ),
                }}
              >
                <div
                  class={prefixRef.value + '-color-tips'}
                  style={{
                    backgroundColor: props.value,
                  }}
                ></div>
              </Popover>
            ),
          }}
          onChange={(e) => {
            emit('change', e.target.value)
          }}
        ></Input>
      </div>
    )
  },
})
