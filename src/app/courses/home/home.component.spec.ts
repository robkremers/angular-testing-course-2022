import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';

/**
 * https://angular.io/api/platform-browser/animations/NoopAnimationsModule:
 * - A null player that must be imported to allow disabling of animations.
 *
 * Normal situation:
 * - Use waitForAsync in beforeEach, fakeAsync in the it() methods.
 * - Use these keywords only if an asynchronous situation is at hand.
 *  The normal situation should be a synchronous test situation.
 */
describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses()
    .filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses()
    .filter(course => course.category === 'ADVANCED');

  /**
   * This block contains a Promise, resulting from .compileComponents(), and therefore
   * should be handled like an asynchronous process.
   * waitForAsync will detect the asynchronous processes.
   * It could also be possible that a third-party library executes a real HTTP call.
   * For this situation waitForAsync is necessary.
   * Also it will wait until the Promise is resolved.
   */
  beforeEach(waitForAsync(() => {

      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

      TestBed.configureTestingModule({
        imports: [
          CoursesModule,
          NoopAnimationsModule
        ],
        providers: [
          {provide: CoursesService, useValue: coursesServiceSpy}
        ]
      }).compileComponents()
        // Wait for the Promise to resolve before continuing with the test (preparation).
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          // Again: we are actually using the coursesServiceSpy.
          // Apparently the return is of type 'any', so coursesService should be declared as such.
          // A bit weird since in the code I see a return of type T.
          coursesService = TestBed.inject(CoursesService);
        });
    })
  );

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  /**
   * We are simulating an asynchronous function (the CoursesService) but the test
   * is still completely synchronous because the Service is being mocked.
   * Since the data is available immediately no asynchronous functionality is present in our test.
   */
  it('should display only beginner courses', () => {

    /**
     * of() is used because an observable is expected.
     */
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    /**
     * Now we have the situation that only BEGINNER courses are available.
     * So the Beginner section in the html will be visible but the Advanced section should be invisible.
     * So only one Tab group should be visible.
     */
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');

  });


  it('should display only advanced courses', () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    // Apply the changes to the screen.
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');

  });


  it('should display both tabs', () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // Apply the changes to the screen.
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, 'Unexpected number of tabs found');

  });


  /**
   * Apparently now the functionality reacts asynchronously.
   * Chapter 26: this is due to underlying JS functionality.
   * - A delay of 16 ms is built in to ensure a smooth transition from one tab to another,
   *   using 'window.requestAnimationFrame().
   * - So the change will not be executed immediately.
   * Therefore this method needs to be rewritten catching the asynchronous functionality.
   */
  xit('should display advanced courses when tab clicked', () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // Apply the changes to the screen.
    fixture.detectChanges();
    // Find the tabs with 'Beginner' an 'Advanced'. See the Developer Tool | Selector.
    const tabs = el.queryAll(By.css('.mat-tab-label'));

    /**
     * Simulate clicking the 'Advanced' Tab.
     * The following could be used.
     */
    // el.nativeElement.click();

    /**
     * However the following custom utility will be used to simulate clicking the 'Advanced' Tab..
     */
    click(tabs[1]);
    fixture.detectChanges();
    // flush();

    /**
     * Step: Find all titles of the courses under the 'Advanced' Tab.
     *
     * Again: Find '.mat-card-title'  via Developer Tool | Selector.
     * You find e.g. 'Angular Security Course - Web Security Fundamentals'.
     *
     * Use both:'.mat-tab-body-active .mat-card-title'
     * - The reason is because otherwise you also fetch the titles from the inactive
     *   tab which are still in the dom, but invisible.
     */
    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
    // console.log(cardTitles);
    console.log('cardTitles.length = ' + cardTitles.length);
    // These tests would go wrong due to the asynchronous nature of the functionality as explained above.
    // expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
    // expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

  });

  /**
   * Using 'done' in combination with 'setTimeout() works.
   * However it is not convenient:
   * - A specific amount of time needs to be specified. During tests this can cause unexpected errors.
   */
  it('should display advanced courses when tab clicked using done', (done: DoneFn) => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // Apply the changes to the screen.
    fixture.detectChanges();
    // Find the tabs with 'Beginner' an 'Advanced'. See the Developer Tool | Selector.
    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);
    fixture.detectChanges();

    // Waiting for the change in tabs to complete
    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
      done();
    }, 500);
  });

  it('should display advanced courses when tab clicked using fakeAsync', fakeAsync(() => {

      coursesService.findAllCourses.and.returnValue(of(setupCourses()));
      fixture.detectChanges();
      const tabs = el.queryAll(By.css('.mat-tab-label'));
      // Click the 'Advancd' Tab.
      click(tabs[1]);
      fixture.detectChanges();

      // Empty task queue. This has processed the timer that is activated when moving the 'Advanced' tab.
      // Apparently this concerns a normal task and not a microtask.
      flush();
      // tick(); // Also works for animation frames.

      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');

    })
  );

  /**
   * waitForAsync does not allow us to write assertions the way it is done when using fakeAsync.
   * e.g.:
   * - we can not call flush(). So emptying the (micro)tasks needs to be done in some other way.
   * - we can not call tick(1000) (e.g.) to control the passage of time.
   *
   * waitForAsync() will keep track of every asynchronous operation.
   * - e.g. setTimeout, setInterval, Promises
   * - will give us a callback that will notify us when all asynchronous tasks have been completed.
   *  - the assertions need to be placed within the callback.
   *
   * For the above-mentioned reasons waitForAsync is not as convenient as fakeAsync.
   * However waitForAsync support actual (so not mocked) HTTP calls whereas fakeAsync does not.
   * So if this is necessary, e.g. when writing integration tests, waitForAsync needs to be used.
   *
   * There are situations where even a unit-test needs to make real HTTP calls (so not integration tests).
   * - Situation that html / css is fetched from the backend (okay: never heard of that possibility).
   *  In that case real HTTP calls are necessary.
   */
  it('should display advanced courses when tab clicked using waitForAsync', waitForAsync(() => {

      coursesService.findAllCourses.and.returnValue(of(setupCourses()));
      fixture.detectChanges();
      const tabs = el.queryAll(By.css('.mat-tab-label'));
      // Click the 'Advancd' Tab. This is an asynchronous action because under water it contains a delay of 16 ms.
      click(tabs[1]);
      fixture.detectChanges();

      /**
       * The callback that will be called by waitForAsync when all previous asynchronous steps have been completed.
       * Place here all code that should be called thereafter.
       */
      fixture.whenStable()
        .then(() => {
          console.log('Called whenStable()');

          const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
          expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
          expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
        });

    })
  );

});


