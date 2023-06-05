import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useHover = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.hover)
}
