import { computed } from 'vue'
import { useWorkspace } from './useWorkspace'

export const useHistory = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId)
  return computed(() => workspace.value?.history)
}
