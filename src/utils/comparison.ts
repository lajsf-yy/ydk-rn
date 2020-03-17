
export function shallowEqual(a: object, b: object) {
 if (a === b) return true
 let keysA = Object.keys(a)
 let keysB = Object.keys(b)
 if (keysA.length !== keysB.length) return false
 let hasDiff = keysA.some(key => a[key] !== b[key])
 return !hasDiff
}