import {async, ComponentFixture, fakeAsync, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  // Fixture for debugging and testing a component.
  // Is a test utility type.
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  /**
   * CoursesModule contains all necessary components, modules and services.
   * Therefore importing this Module greatly simplifies our import / declaration at this point.
   *
   * In different examples to be found on the internet different implementations are being used.
   * The following setup, using waitForAsync and .then() is recommended by the course leader.
   *
   * waitForAsync (replacement for async) is used because it is possible that the functionality
   * in beforeEach is executed but without waiting until the asynchronous functionality is finished,
   * i.e. before the Promise<any> returned by .compileComponents() is resolved.
   * In that case the following it() method will be executed and may end in error.
   * To ensure that all asynchronous functionality has been executed waitForAsync is used.
   */
  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule]
      })
        // Compile components with a templateUrl for the test's NgModule.
        // It is necessary to call this function as fetching urls is asynchronous.
        // A promise is returned, which is asynchronous. For this reason waitForAsync is used
        // (replaces 'async).
        .compileComponents()
        .then(() => {

          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;

        });
    })
  );


  it('should create the component', () => {

    expect(component).toBeTruthy();

  });

  /**
   * This is a synchronous test.
   * There are no asynchronous steps involved like timeouts, http-requests, etc.
   */
  it('should display the course list', () => {

    component.courses = setupCourses();
    fixture.detectChanges();

    // console.log(el.nativeElement.outerHTML);

    // Searching for all elements with the selector course-card.
    // This selector has been defined in courses-card-list.component.css
    // and is used in courses-card-list.component.html for all courses.
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find course cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');

  });


  it('should display the first course', () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const course = component.courses[0];

    const card = el.query(By.css(".course-card:first-child"));
    const title = card.query(By.css("mat-card-title"));
    const image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not find course card");
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});


