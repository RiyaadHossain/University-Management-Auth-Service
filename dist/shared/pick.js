'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.pick = void 0
const pick = (obj, keys) => {
  const finalObject = {}
  for (const key of keys) {
    if (Object.hasOwnProperty.call(obj, key)) finalObject[key] = obj[key]
  }
  return finalObject
}
exports.pick = pick
