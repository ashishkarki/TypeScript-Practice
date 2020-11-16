// GENERICS IN TYPESCRIPT

// generic function
function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2)
}

const mergedObj = mergeObjects({ name: 'Max' }, { age: 30 })

console.log(`merging objects, age: ${mergedObj.age}`)

// another generics example
interface Lengthy {
  length: number
}

function describer<T extends Lengthy>(input: T): [T, string] {
  return [input, 'some dummy description']
}

console.log(describer('sixsix'))

// keyof example
function getValueForKey<T extends object, U extends keyof T>(obj: T, key: U) {
  return `The extracted value is : ${obj[key]}`
}

console.log(getValueForKey({ name: 'Ashish' }, 'name'))

// GENERIC CLASSES
class DataStorage<T> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  getAllItems() {
    return [...this.data]
  }
}

// TS Generic Utility types: Partial, Readonly
