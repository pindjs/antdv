import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useOutlineDragon = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.outlineDragon)
}
