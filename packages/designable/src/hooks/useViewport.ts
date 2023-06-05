import { computed } from 'vue'
import { useWorkspace } from './useWorkspace'

export const useViewport = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId)
  return computed(() => workspace.value?.viewport)
}
