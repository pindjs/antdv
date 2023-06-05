import { computed } from 'vue'
import { useLayout } from './useLayout'

import type { ComputedRef } from 'vue'
import type { IDesignerLayoutContext } from '../types'

export const usePosition = (): ComputedRef<
  IDesignerLayoutContext['position']
> => {
  const layoutRef = useLayout()
  return computed(() => layoutRef.value?.position)
}
