enum Privileges {
  READ = 'Read',
  WRITE = 'Write',
  ALL = 'All',
}

// Intersection and Union types example
type Admin = {
  name: string
  privileges: Privileges[]
}

type Employee = {
  name: string
  title: string
}

type IntersectedEmployee = Admin & Employee
const e1: IntersectedEmployee = {
  name: 'ashish',
  privileges: [Privileges.WRITE, Privileges.READ],
  title: 'engineer',
}

type UnionedEmployee = Admin | Employee
const e2: UnionedEmployee = {
  name: 'puppy',
  // privileges: [Privileges.ALL],
  title: 'allrounder',
}

// Type Guard example, esp of object/complex types
function print(employee: UnionedEmployee) {
  console.log('Name: ' + employee.name) // name is common in both objects

  if ('privileges' in employee) {
    console.log(`privileges: ${employee.privileges}`)
  }
  if ('title' in employee) {
    console.log(`title: ${employee.title}`)
  }
}

print(e2)

// DISCRIMINATED UNIONS example
enum AnimalEnum {
  HORSE,
  BIRD,
}

interface Bird {
  type: AnimalEnum.BIRD
  flyingSpeed: number
}

interface Horse {
  type: AnimalEnum.HORSE
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  // if ('flyingSpeed' in animal) {
  //   console.log(`speed is ${animal.flyingSpeed}`)
  // }
  // if ('runningSpeed' in animal) {
  //   console.log(`speed is ${animal.runningSpeed}`)
  // }

  let speed = 0
  switch (animal.type) {
    case AnimalEnum.BIRD:
      speed = animal.flyingSpeed
      break

    case AnimalEnum.HORSE:
      speed = animal.runningSpeed
      break

    default:
      speed = 0
      break
  }

  console.log(`speed is ${speed}`)
}

moveAnimal({ type: AnimalEnum.BIRD, flyingSpeed: 20.0 })

// INDEX type
interface ErrorContainer {
  [prop: string]: string
}

const error1: ErrorContainer = {
  email: 'Not a valid email',
  name: 'Not a valid name',
}

const error2: ErrorContainer = {
  title: 'Bad title...',
}

// Function overload
type strOrNum = string | number

function add(a: string, b: string): string
function add(a: number, b: number): number
function add(a: string, b: number): string
function add(a: strOrNum, b: strOrNum) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString().concat(b.toString())
  }

  return a + b
}

console.log(`num and num: ${add(1, 2)}`)
console.log(`str and str: ${add('ashish', ' karki')}`)
console.log(`str and num: ${add('ashish', 1.0)}`)

// OPTIONAL CHAINING
const sampleObj: {
  sampleProp?: {
    sample?: string
  }
} = {}
console.log('Optional chained object is: ' + sampleObj?.sampleProp?.sample)

// Nullish Coalescing operator ??
// checks if the expression to the left of ?? is null or undefined
const input = ''
const formattedInput = input ?? 'some default value'
console.log(`formattedInput is ${formattedInput}`)
