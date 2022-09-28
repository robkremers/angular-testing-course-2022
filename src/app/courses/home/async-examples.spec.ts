/**
 * Chapter 27. Understanding Asynchronous Testing - A Simple Example.
 * This file contains a number of tests that are not related to components.
 * Purpose: illustration of concepts.
 *
 * The use of setTimeout makes this an asynchronous process.
 *
 * The use of 'done: DoneFn' in calling the anonymous function in it() marks the process for Jasmine as being asynchronous.
 * However in practice, especially in case of AJAX calls and in nested setTimeout blocks.
 *
 * The notion of detecting asynchronous actions and executing functionality after these events have taken place
 * is called Zones in Angular.
 * In Angular a Zone is a context that survives multiple asynchronous operations.
 * This is implemented in the Zone.js library:
 * - https://github.com/angular/angular/tree/main/packages/zone.js
 * - Part of the Angular code base.
 * - fakeAsync is based on this functionality.
 *
 */
import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Testing Examples', () => {

  it('Asynchronous test example with Jasmine done().', (done: DoneFn) => {

    let test: boolean = false;

    // Execute code block after 1000 ms.
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);

    // This will not work, because this will be executed BEFORE the setTimeout code block has been executed.
    // expect(test).toBeTruthy();

  });

  /**
   * Example of fakeAsync
   * API > @angular/core > @angular/core/testing
   * fakeAsync
   * https://angular.io/api/core/testing/fakeAsync
   * Wraps a function to be executed in the fakeAsync zone:
   *
   *     Microtasks are manually executed by calling flushMicrotasks().
   *     Timers are synchronous; tick() simulates the asynchronous passage of time.
   */
  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
      let test: boolean = false;

      // setTimeout(() => {});
      // tick();

      // Execute code block after 1000 ms.
      setTimeout(() => {
        console.log('running assertions setTimeout');
        test = true;
        /**
         * This assertion can now be removed from the asynchronous block and placed after this asynchromous
         * block because Angular recognizes it and will execute this block before continuing.
         * This is the normal, desired situation.
         */
        // expect(test).toBeTruthy();
        // done();
      }, 1000);

      // Simulate the passage of time in a fakeAsync zone, in this case 1000 milliseconds, as specified above.
      // Specifying < 1000 ms would still cause an error.
      // tick(1000);

      // This will not work.
      // tick();

      // As an alternative to tick() where a specific amount of time is set we can also use flush().
      // flush() will execute all timeouts that are present in the fakeAsync zone and only then will continue.
      flush();

      // This test will pass because Angular will recognize the asynchronous zone and following functionality
      // will only be executed once the asynchronous functionality in the zon has been executed.
      expect(test).toBeTruthy();

    })
  );

  /**
   * Introduction of a micro-task.
   * One method of detecting a wrong execution is to add logging at all appropriate places.
   * This may indicate a wrong order of execution.
   * A Promise will take precedence over setTimeouts unless the correct order of execution is set.
   * A Promise is considered a micro task.
   * A setTimeout is considered a macro task or simply a task.
   * Promises are added to their own separate queue, which is different from the queue to which the other
   * tasks, like mouseClick() or setTimeout are added.
   * The micro task queue will take precedence over the tasks in the other queue.
   *
   */
  it('Asynchronous test example - plain Promise', fakeAsync(() => {
      let test = false;

      console.log('Creating promise');

      setTimeout(() => {
        console.log('SetTimeout() first callback triggered.');
      });

      setTimeout(() => {
        console.log('SetTimeout() second callback triggered.');
      });
      // flush(); // This will trigger the macro tasks before the micro tasks because this flush() is executed first.

      Promise.resolve()
        .then(() => {
          console.log('Promise first then() evaluated successfully');
          // test = true;
          return Promise.resolve();
        })
        .then(() => {
          console.log('Promise second then() evaluated successfully');
          test = true;
        });

      // tick();
      // flush();
      // Flush any pending microtasks.
      flushMicrotasks();
      flush();
      console.log('Running test assertions');

      expect(test).toBeTruthy();
    })
  );

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
      let counter: number = 0;

      Promise.resolve()
        .then(() => {
          counter += 10;
          setTimeout(() => {
            counter += 1;
          }, 1000);
        });

      expect(counter).toBe(0);
      flushMicrotasks();
      expect(counter).toBe(10);
      tick(500);
      expect(counter).toBe(10);
      tick(500);
      expect(counter).toBe(11);


    })
  );

  it('Asynchronous test example = Observable', fakeAsync(() => {
      let test: boolean = false;
      console.log('Creating Observable');

      // of() will return a synchronous Observable.
      // const test$ = of(test);

      // Now an asynchronous Observable will be returned.
      const test$ = of(test).pipe(delay(1000));

      /**
       * Once subscribed the functionality in the block will be executed immediately.
       * That means that the expect will assert the correct value of the property.
       */
      test$.subscribe(() => {
        test = true;
      });

      tick(1000);
      // tick(); // Has no effect.
      // flush(); // Has no effect.

      console.log('Running test assertions');
      expect(test).toBe(true);

    })
  );

});
