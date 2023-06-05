import { defineComponent } from 'vue'
import { CursorStatus, CursorType } from '@designable/core'
import { calcRectByStartEndPoint, isNum } from '@designable/shared'
import { observer } from '@formily/reactive-vue'
import { useCursor, useOperation, usePrefix, useViewport } from '../../hooks'

export const FreeSelection = observer(
  defineComponent({
    name: 'DnFreeSelection',
    props: [],
    setup() {
      const operationRef = useOperation()
      const cursorRef = useCursor()
      const viewportRef = useViewport()
      const prefixRef = usePrefix('aux-free-selection')

      return () => {
        const createSelectionStyle = () => {
          const startDragPoint = viewportRef.value.getOffsetPoint({
            x: cursorRef.value.dragStartPosition.topClientX,
            y: cursorRef.value.dragStartPosition.topClientY,
          })
          const currentPoint = viewportRef.value.getOffsetPoint({
            x: cursorRef.value.position.topClientX,
            y: cursorRef.value.position.topClientY,
          })
          const rect = calcRectByStartEndPoint(
            startDragPoint,
            currentPoint,
            viewportRef.value.scrollX -
              cursorRef.value.dragStartScrollOffset.scrollX,
            viewportRef.value.scrollY -
              cursorRef.value.dragStartScrollOffset.scrollY
          )
          const baseStyle: any = {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2,
            borderWidth: 1,
            borderStyle: 'solid',
            transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
            height: isNum(rect.height) ? rect.height + 'px' : rect.height,
            width: isNum(rect.width) ? rect.width + 'px' : rect.width,
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 1,
          }
          return baseStyle
        }

        const hasDragNodes = operationRef.value.getDragNodes().length > 0
        if (
          hasDragNodes ||
          cursorRef.value.status !== CursorStatus.Dragging ||
          cursorRef.value.type !== CursorType.Move
        )
          return null
        return (
          <div class={prefixRef.value} style={createSelectionStyle()}></div>
        )
      }
    },
  })
)
