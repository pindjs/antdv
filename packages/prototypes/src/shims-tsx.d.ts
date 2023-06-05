import 'vue'

declare module 'vue' {
  export interface ComponentCustomProps {
    attrs?: { [key: string]: any }
  }
}
