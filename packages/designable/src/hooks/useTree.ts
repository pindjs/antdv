import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useTree = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.tree)
}
