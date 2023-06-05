export async function evalListener(
  listener: undefined | Function | Function[],
  ...args: any[]
) {
  if (typeof listener === 'function') {
    return listener(...args)
  }
  if (Array.isArray(listener)) {
    return Promise.all(
      listener.map((fn) => {
        if (typeof fn === 'function') {
          return fn(...args)
        }
        return
      })
    )
  }
}
