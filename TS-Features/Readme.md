## TypeScript Basic Types

1. number: 1, 5.3, -10. Only one type for numbers. By default in both JS and hence TS, all numbers are floats.
2. string: all text values
3. boolean: true, false. No JS-like "truthy" or "falsy" values.
4. object: any JS object, more specific types of objects are also possible.
5. Array: any JS array is supported as TS array. The type of the array elements can be flexible/any or more strict.
6. Tuple: fixed length and fixed values array only in TS but not in JS. for example: [number, string]
7. Enum: set of constant values. An example is `enum {LABEL1, LABEL2}`.

### TypeScript Custom/Complex Types

1. **Union** type: represented by a pipe '|'. Example is
   `myVar: string | number`
   where myVar can be assigned both a string and number type.
2. **Literal** type: means a type which will hold specific constant/literal values and nothing else.
3. **Unknown** type: different from the any type, unknown type basically means the variable's type is unknown at this time. Such variable can get assigned different types of values. However, before using it or assigning it to a fixed typed variable, this unknown variable has to got through checks.
4. **Never** type: similar to a void type in that it is returning nothing. Having a never type as a return type in a function for example that throws an error clarifies the intention of that function that it doesn't return undefined rather it never returns and sort of crashes or stops the flow of your program. An infinite loop based function is another example of returning never type.

Find more details on TS data types in this [TS DOC](https://www.typescriptlang.org/docs/handbook/basic-types.html)

> Note => Type Aliases: use the 'type' keyword to create a new type with (possibly) complex type. Example is storing a union type in an alias saving us redundant code like so <br/> > `type complex = number | string;`

> Note => Running tsc (typescript compiler) in watch mode: whilest for very simple usage, we could simply compile a file using following command: <br/> > `tsc fileName.ts` -> this has the distinct disadvantage of having to be executed multiple times for multiple changes <br/>
> A better idea is to run the compiler in the watch mode using the -w flag like so `tsc fileName.ts -w` or `tsc fileName.ts --watch`

> The compilation above begs the question of how would we complile multiple files simulataneously. This can be achieved by running `tsc --init` command at the root folder we want to be compiled with the tsc. This will create a tsconfig.json file in that root folder which allows typescript to manage all .ts files and compile them whenever simply th `tsc` command is run without specifying a particular file name. In such cases the tsc can be run in watch mode by executing the command `tsc -w` again without any file names.
>
> > The tsconfig file is configurable -
