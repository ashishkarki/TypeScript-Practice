/**
 * Examples showing classes in TS
 */

enum UserType {
  ADMIN = 'Admin',
  NON_ADMIN = 'Non Admin',
  TEST = 'Test Only',
}

abstract class Everything {
  abstract introduce(): void
}

class Hello extends Everything {
  private static instanceCount = 0

  constructor(
    public username: string,
    protected userType: UserType,
    private readonly userId = 9999
  ) {
    super()
    Hello.instanceCount++
  }

  announce() {
    console.log(
      `name is: ${this.username}, with Id: ${this.userId} and type: ${this.userType}`
    )
  }

  introduce() {
    console.log(`I come from an abstract class`)
  }

  static getInstances() {
    return this.instanceCount
  }
}

const hello = new Hello('Generic user', UserType.TEST)
hello.announce()
hello.introduce()

class AshishUser extends Hello {
  private ashishHobbies: string[]

  constructor(userId = 7777) {
    super('Ashish K', UserType.ADMIN, userId)
    this.ashishHobbies = []
  }

  announce() {
    console.log(
      `Annoucing from AshishUser, name is: ${this.username} with usertype: ${this.userType}`
    )
  }

  set hobbies(hobbyList: string[]) {
    if (!hobbyList) {
      console.error('Please add at least one hobby!!!')
    }

    this.ashishHobbies = hobbyList
  }

  get hobbies() {
    return this.ashishHobbies
  }
}

const ashishK = new AshishUser()
ashishK.announce()
ashishK.hobbies = ['read', ' watch movies']
console.log(`${ashishK.username}\'s hobbies are: ${ashishK.hobbies}`)

console.log(`total instance count so far: ${Hello.getInstances()}`)

/**
 * Singleton in TS example
 */
class TsSingleton {
  private static instance: TsSingleton

  private constructor() {}

  static get singletonInstance() {
    if (!TsSingleton.instance) {
      this.instance = new TsSingleton()
    }

    return TsSingleton.instance
  }
}

/**
 * Interfaces in TS
 */
interface Person {
  name: string
  readonly type: string
  age?: number
}

class Student implements Person {
  name: string
  type: string
  age: number

  constructor(optParam?: string) {
    this.name = 'Student'
    this.type = 'Student type'
    this.age = 20
  }
}
