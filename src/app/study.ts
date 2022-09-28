import * as uuid from 'uuid';
/**
 * Key Concept 1 - Type Inference is Always On
 * Key Concept 2 - Types are defined by the collection of their properties
 *  - In TypeScript, what defines a type is a collection of specific properties and their types. Not it's name.
 * Key Concept 3 - Type compatibility depends on the list of properties of a type
 *  - So that same list of properties and their types is also what defines if two types are compatible.
 *  - Aannotating a variable with type Any is essentially telling the compiler  to bypass the type system,
 *    and in general not check type compatibility for this variable.
 *
 */
let user: any = {};

user.name = 'John'

interface Course {
  name: string;
  lessonCount?: number;
}

// In Typescript, a custom object type can also implement an Interface
let course: Course = {
  name: 'Components'
};

course.name = 'Components and Directives';

course.lessonCount = 20;
