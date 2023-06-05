import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useSelection = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.selection)
}
