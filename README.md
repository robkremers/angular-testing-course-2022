## Angular Testing Course

This repository contains the code of
the [Angular Testing Course](https://angular-university.io/course/angular-testing-course).

This course repository is updated to Angular v14, and there is a package-lock.json file available, for avoiding semantic
versioning installation issues.

![Angular Testing Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png)

# Installation pre-requisites

Please install Node 16 Long Term Support Edition (LTE).

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 

# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/angular-testing-course.git

This repository is made of several separate npm modules, that are installable separately. For example, to run the
au-input module, we can do the following:

    cd angular-testing-course
    npm install

Its also possible to install the modules as usual using npm:

    npm install 

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I
installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions
section of the course.

# To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

# Important

This repository has multiple branches, have a look at the beginning of each section to see the name of the branch.

At certain points along the course, you will be asked to checkout other remote branches other than master. You can view
all branches that you have available remotely using the following command:

    git branch -a

The remote branches have their starting in origin, such as for example 1-navigation-and-containers.

We can checkout the remote branch and start tracking it with a local branch that has the same name, by using the
following command:

      git checkout -b section-1 origin/1-navigation-and-containers

It's also possible to download a ZIP file for a given branch, using the branch dropdown on this page on the top left,
and then selecting the Clone or Download / Download as ZIP button.

# Other Courses

# Angular Core Deep Dive Course

If you are looking for the [Angular Core Deep Dive Course](https://angular-university.io/course/angular-course), the
repo with the full code can be found here:

![Angular Core Deep Dive](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png)

# RxJs In Practice

If you are looking for the [RxJs In Practice](https://angular-university.io/course/rxjs-course), the repo with the full
code can be found here:

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)

# NgRx In Depth

If you are looking for the [NgRx In Depth](https://angular-university.io/course/angular-ngrx-course), the repo with the
full code can be found here:

![Angular Ngrx Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png)

# Serverless Angular with Firebase Course

If you are looking for
the [Serverless Angular with Firebase Course](https://angular-university.io/course/firebase-course), the repo with the
full code can be found here:

![Serverless Angular with Firebase Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png)

# Angular Universal Course

If you are looking for the [Angular Universal Course](https://angular-university.io/course/angular-universal-course),
the repo with the full code can be found here:

![Angular Universal Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-universal-small.png)

# Angular PWA Course

If you are looking for the [Angular PWA Course](https://angular-university.io/course/angular-pwa-course), the repo with
the full code can be found here:

![Angular PWA Course - Build the future of the Web Today](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png)

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course),
the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).

![Angular Security Masterclass](https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png)

# Angular Advanced Library Laboratory Course

If you are looking for the Angular Advanced Course, the repo with the full code can be found here:

[Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-university.io/course/angular-advanced-course)
.

![Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png)

## RxJs and Reactive Patterns Angular Architecture Course

If you are looking for the RxJs and Reactive Patterns Angular Architecture Course code, the repo with the full code can
be found here:

[RxJs and Reactive Patterns Angular Architecture Course](https://angular-university.io/course/reactive-angular-architecture-course)

![RxJs and Reactive Patterns Angular Architecture Course](https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png)

## Complete Typescript Course - Build A REST API

If you are looking for the Complete Typescript 2 Course - Build a REST API, the repo with the full code can be found
here:

[https://angular-university.io/course/typescript-2-tutorial](https://github.com/angular-university/complete-typescript-course)

[Github repo for this course](https://github.com/angular-university/complete-typescript-course)

![Complete Typescript Course](https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png)

# References

- https://manivelarjunan.medium.com/angular-7-unit-testing-code-coverage-5c7a238315b6
  - Must read article.
- Genka: Angular Unit Test Tutorial - Crash Course for Angular & Jasmine
  - https://www.youtube.com/watch?v=ibatZSCgXLY
  - https://github.com/tamani-coding/angular-testing-examples
- https://jasmine.github.io/pages/getting_started.html
- https://jasmine.github.io/api/edge/
  - Overview of all Jasmine functionality
- https://angular.io/api/core/testing
  - e.g.:
    - TestBed
      - Configures and initializes environment for unit testing and provides methods for 
      creating components and services in unit tests.
- https://angular.io/guide/testing
  - And all the underlying content.
- https://angular.io/api/common/http/testing
  - Supplies a testing module for the Angular HTTP subsystem.
    - e.g for mocking HttpClient.
  - HttpClientTestingModule
    - Configures HttpClientTestingBackend as the HttpBackend used by HttpClient.
  - HttpTestingController
    - Controller to be injected into tests, that allows for mocking and flushing of requests.
- https://www.digitalocean.com/community/tutorials/angular-introduction-unit-testing
- https://www.digitalocean.com/community/tutorials/angular-testing-async-fakeasync
- 

# Study

4. The Typescript Jumpstart Ebook

- Key Concept 1 - Type Inference is Always On
- Key Concept 2 - Types are defined by the collection of their properties
  - In TypeScript, what defines a type is a collection of specific properties and their types. Not it's name.
- Key Concept 3 - Type compatibility depends on the list of properties of a type
  - So that same list of properties and their types is also what defines if two types are compatible.
  - Aannotating a variable with type Any is essentially telling the compiler to bypass the type system,
    and in general not check type compatibility for this variable.

```typescript
describe('CalculatorService', () => {

  it('should add two numbers', () => {
      // 'pending()' indicator that the method is not yet ready for use.
    pending();
  });

  it('should subtract two numbers', () => {
      // 'fail()' indicator that the method is failing.
    fail();
  });



});
```

# Topics

## Running the applications

### Angular

#### Running in development mode

```shell
$ $ npm start
# See package.json for the actual meaning:

# $ ng serve --port 4200
```

```json
  ..
  "scripts": {
    ..
    "start": "ng serve  --proxy-config ./proxy.json",
    ..
    },
  ..
```

#### Preparing for Production mode

Update the ```build:prod``` to ```package.json```

```json
  "scripts": {
    ..
    "build:prod": "ng build -c=production",
    ..
  },
```

```shell
$ ng build --configuration=production
```

Afterwards will be present in the root: ```./dist```. 
This directory will contain the production content:
```shell
total 2520
-rw-r--r--  1 rkremers  staff    16721 Sep 28 15:39 3rdpartylicenses.txt
-rw-r--r--  1 rkremers  staff     5430 Sep 28 15:39 favicon.ico
-rw-r--r--  1 rkremers  staff     4854 Sep 28 15:39 index.html
-rw-r--r--  1 rkremers  staff  1129616 Sep 28 15:39 main.8da33d369040f5e6.js
-rw-r--r--  1 rkremers  staff    37054 Sep 28 15:39 polyfills.249f48486e98bba7.js
-rw-r--r--  1 rkremers  staff     1780 Sep 28 15:39 runtime.47fb4f95e493446c.js
-rw-r--r--  1 rkremers  staff    75005 Sep 28 15:39 styles.a732246b254396f5.css
```

#### Running in production mode

In ```package.json``` will be present:
```json
"scripts": {
  ..
  "start:prod": "http-server ./dist -a localhost -p 4200",
  ..
},
```

Run on the command line:
```shell
$ npm run start:prod 
```

This works. See in Chrome: ```http://localhost:4200/```.  
No data is present because the local server has not been started. Not meant to be in production.
In production a real server would be available.

### The mock server providing data locally

```shell
$ npm run server
```

### Karma / Jasmine unit-testing

```shell
$ ng test

# For the situation of code coverage (is not active in this application)
$ ng test --code-coverage
```

Note:
- For the code coverage the course content was out of date.
- Fix:
  - I have taken the setup of a clean Angular 14 application.
  - See for this karma.conf.js.
  - Installed: ```npm install karma karma-coverage --save-dev```
  - Now the coverage can be viewed when placing coverage/gebruikers-administratie-frontend-angular/index.html in a browser.

### Cypress integration testing

Reference:
- https://www.cypress.io/
  - Install as follows:
    - ```$ npm install cypress``` or
    - ```$ npm install --dev cypress```
  - Is not Angular specific.

#### How to run Cypress

See: package.json
```json
  "scripts": {
    ..
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    ..
  },
```

When Cypress opens for the first time it will create a folder **./cypress** in the root.  
The folder contains a number of sub-folders and files, meant to illustrate the use of Cypress.  
The integration tests should be placed in the ./integration sub-folder.
These examples can be removed. I leave them in place to use them whenever handy. In the course they are removed.

A new file is created: ./integration/home.test.js.

Running Cypress (see above) will show a pop-up giving an overview of the test files.  
Double-click on home.test.js or run all tests to execute the file home.test.js.  
The following will pop up:
- http://localhost:4200/__/#/tests/integration/home.test.js

Note that a backend is not necessary.

Ensure that in **angular-testing-course/cypress.json** the baseUrl is pointing to the correct application url:
```json
{
  "baseUrl": "http://localhost:4200"
}
```

#### Against the application in development mode

The following commands have been defined in package.json | scripts.

```shell
$ npm run cypress:open
```

#### Against the application in production mode

```shell
$ npm run cypress:run

# Result:
  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  home.test.js                             00:02        2        2        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:02        2        2        -        -        -  

```

Note:
- The Cypress example test content had to be removed. Contained errors....

### Running and Cypress testing in production mode

In ```package.json``` two custom commands have been created for this purpose.  
These commands use previously created custom commands.

```json
  "scripts": {
    ..
    "build-and-start:prod": "run-s build:prod start:prod",
    "e2e": "start-server-and-test build-and-start:prod http://localhost:4200 cypress:run"
  },
```

When running e2e:
```shell
$ npm run e2e
```

The production build and Cypress testing against the new build will be executed in one terminal.

## Continuous Integration (CI) Testing and Deployment

In this cours is used: https://www.travis-ci.com/


## Meaning of '!!' in Typescript

Example (courses-card-list.component.ts):
```typescript
filter(val => !!val),
```

Meaning:  
- you want to make sure your resulting value is either true or false, not undefined or [ ].

## Various functionalities used in Jasmine

- fixture = TestBed.createComponent(GebruikersTableComponent);
  - creates an instance of the component T and returns a strongly typed for that component.
- Use of fixture: ComponentFixture<T>;
  - The fixture methods cause Angular to perform certain tasks on the component tree. 
    Call these methods to trigger Angular behavior in response to simulated user action.
- The DebugElement:
  - provides crucial insights into the component's DOM representation.
  - returned by fixture.debugElement.

## Angular Jasmine waitForAsync vs fakeAsync

- https://www.digitalocean.com/community/tutorials/angular-testing-async-fakeasync

- The **waitForAsync** utility tells Angular to run the code in a dedicated test zone that intercepts promises.
- **fakeAsync** helps to test asynchronous code in a synchronous way.
  - The **tick** utility is used inside a **fakeAsync** block to simulate the passage of time.
    - **Tick** can be used with a specified amount of time or no argument, 
      in which case it waits until all the microtasks are done.
    - Specifying the passing time like that can quickly become cumbersome, and can become a problem 
    when you don’t know how much time should pass.
  - A new utility called **flush** was introduced in Angular 4.2 and helps with that issue. 
    It simulates the passage of time until the macrotask queue is empty.
    - This makes **flush** equal to **tick** without a specified amount of time.

Note: 
- In all examples I find:
```typescript
// https://www.digitalocean.com/community/tutorials/angular-testing-async-fakeasync

flush();
// Execute all timers that are still pending.
fixture.detectChanges();
```

However in **gebruikers-administratie-frontend-angular** we have found that it should be:
```typescript
fixture.detectChanges();
flush();
```

So be careful with regards to the order of functionality to be executed.

