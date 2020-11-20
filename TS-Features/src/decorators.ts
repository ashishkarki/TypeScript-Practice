// DECORATORS IN TS

// 1. Example:
// function Logger(target: Function) {
//   console.log('Custom logger...at work...')
//   console.log(`target is contructor: ${target}`)
// }

// decorator function with a decorator factory
function DecoratorWithLogging(logString: string) {
  console.log('DecoratorWithLogging')

  return function (target: Function) {
    console.log(`DecoratorWithLogging - Logging  input: ${logString}`)
    console.log(`target is the contructor fx: ${target}`)
  }
}

// another decorator example
function DecoratorWithTemplate(template: string, htmlElemId: string) {
  console.log(`DecoratorWithTemplate`)

  return <T extends { new (...args: any[]): { name: string } }>(
    orginalConstructor: T
  ) => {
    console.log('DecoratorWithTemplate - printing template')

    // can also return modified class
    return class extends orginalConstructor {
      constructor(..._args: any[]) {
        super()

        const htmlElem = document.getElementById(htmlElemId)

        const p = new orginalConstructor()

        if (htmlElem) {
          htmlElem.innerHTML = template
          htmlElem.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

@DecoratorWithLogging('Logging Person class')
@DecoratorWithTemplate('<h1>Person Object</h1>', 'app')
class Person {
  // the decorators are executed inside-out or bottom-up
  name = 'Ashish K'

  constructor() {
    console.log('Creating Person object')
  }
}

const person1 = new Person()

// Decorator Example 2: dive into property decorators
function PropertyDecoratorLogger(target: any, propName: string | Symbol) {
  console.log('Property decorator...')
  console.log(target, propName)
}

// Decorator for setter
function AccessorDecoratorLogger(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor Decorator')
  console.log(`target: ${target}`)
  console.log(`name: ${name}`)
  console.log(`descriptor: ${descriptor}`)
}

// Method decorator
function MethodDecoratorLogger(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method  Decorator')
  console.log(`target: ${target}`)
  console.log(`name: ${name}`)
  console.log(`descriptor: ${descriptor.get}`)
}

// Parameter (fxn param) decorator
function ParamDecoratorLogger(
  target: any,
  name: string | Symbol,
  positionOfParam: number
) {
  console.log('Parameter  Decorator')
  console.log(`target: ${target}`)
  console.log(`name: ${name}`)
  console.log(`positionOfParam: ${positionOfParam}`)
}

export class Product {
  @PropertyDecoratorLogger
  title: string

  constructor(title: string, private _price: number) {
    this.title = title
  }

  @AccessorDecoratorLogger
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price')
    }
  }

  @MethodDecoratorLogger
  getPriceWithTx(@ParamDecoratorLogger taxRate: number) {
    return this._price * (1 + taxRate)
  }
}

// Example 3: creating an Autobind Decorator
function AutobindDecorator(
  _target: any,
  _methodName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const orginalMethod = descriptor.value
  const updatedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = orginalMethod.bind(this)

      return boundFn
    },
  }

  return updatedDescriptor
}

class Printer {
  message = 'Autobinding decorator is called'

  @AutobindDecorator
  showMsg() {
    console.log(this.message)
  }
}

const printer = new Printer()
const button = document.querySelector('button')!
button.addEventListener('click', printer.showMsg)
