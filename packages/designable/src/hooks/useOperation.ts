import { computed } from 'vue'
import { useWorkspace } from './useWorkspace'

export const useOperation = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId)
  return computed(() => workspace.value?.operation)
}
