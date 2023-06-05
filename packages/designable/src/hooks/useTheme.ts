import { computed, inject, ref } from 'vue'
import { DesignerLayoutSymbol } from '../context'
import type { ComputedRef } from 'vue'
import type { IDesignerLayoutContext } from '../types'

export const useTheme = (): ComputedRef<IDesignerLayoutContext['theme']> => {
  return computed(
    () =>
      window['__DESINGER_THEME__'] ||
      inject(DesignerLayoutSymbol, ref()).value?.theme
  )
}
