import {CoursesService} from './courses.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {COURSES, findLessonsForCourse} from '../../../../server/db-data';
import {Course} from '../model/course';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Now instead of an internal LoggingService we need to mock HttpClient.
 * For this is used: HttpClientTestingModule.
 * - This class has the same method as HttpClient. The methods will
 *   return test data that is to be defined by the tester.
 * - In order to specify test data we will need the HttpTestController.
 *
 * Note:
 * - The server data is present in:
 *  - angular-testing-course/server/db-data.ts
 */
describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12, 'Incorrect number of courses');

        const course = courses.find(course => course.id === 12);

        expect(course.titles.description).toBe('Angular Testing Course');

      });

    const testRequest = httpTestingController.expectOne('/api/courses');
    expect(testRequest.request.method).toEqual('GET');
    /**
     * testRequest.flush():
     * Resolve the request by returning a body plus additional HTTP information (such as response headers) if provided.
     * If the request specifies an expected body type, the body is converted into the requested type.
     * Otherwise, the body is converted to JSON by default.
     * Both successful and unsuccessful responses can be delivered via flush().
     *
     * The argument that will be used will be the test data returned by the mock request.
     * In order to understand this:
     * - The server is running:
     *  - ```$ npm run server```
     *  - Result: HTTP REST API Server running at http://localhost:9000
     *    - Find here the content.
     *      The main json item is: payload.
     * - The data used by the server and which also will be used for the testing is:
     *  - import {COURSES} from '../../../../server/db-data';
     * - Shutting down the server will confirm that an online server is not actually needed for the unit-test.
     */
    testRequest.flush({payload: Object.values(COURSES)});

  });

  it('should find a course by id', () => {
    coursesService.findCourseById(12)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toEqual(12);

      });

    const testRequest = httpTestingController.expectOne('/api/courses/12');
    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(COURSES[12]);
  });

  it('should save the course data', () => {

    // 2nd parameter: Partial<Course>: should only contain the elements that should be changed.
    // Here the description "Angular Testing Course" is changed to "ATesting Course".
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course.id).toBe(12);
      });

    const testRequest = httpTestingController.expectOne('/api/courses/12');

    expect(testRequest.request.method).toEqual('PUT');
    expect(testRequest.request.body.titles.description).toEqual(changes.titles.description);

    // Use the spread operator to copy the COURSES[12] element to the reply.
    // The changes will be added on top of the content of COURSES[12] using again the spread operator.
    testRequest.flush({
      ...COURSES[12],
      ...changes
    });

  });

  it('should given an error if save course fails', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};
    coursesService.saveCourse(12, changes)
      .subscribe(
        () => fail('the save course should have failed'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);

        }
      );

    const testRequest = httpTestingController.expectOne('/api/courses/12');
    expect(testRequest.request.method).toEqual('PUT');
    testRequest.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});

  });

  it('should find a list of lessons', () => {
    // The other findLessons parameters have default values so do not need to be added here.
    coursesService.findLessons(12)
      .subscribe(lessons => {
        expect(lessons).toBeTruthy();
        // The pageSize has a default value of '3'.
        expect(lessons.length).toEqual(3);

      });

    // Here we could write the request url using the various parameters as defined in CoursesService.
    // '/api/lessons' would not identify the lessons that is being used for testing.
    // Instead a predicate is used that will return true / false depending whether a response is found.
    // Note that 'req' has several method for finetuning the request.
    const testRequest = httpTestingController.expectOne(req => req.url == '/api/lessons' );
    expect(testRequest.request.method).toBe('GET');
    expect(testRequest.request.params.get("courseId")).toEqual("12");
    expect(testRequest.request.params.get("filter")).toEqual("");
    expect(testRequest.request.params.get("sortOrder")).toEqual("asc");
    expect(testRequest.request.params.get("pageNumber")).toEqual("0");
    expect(testRequest.request.params.get("pageSize")).toEqual("3");

    // Trigger the request
    // findLessonsForCourse() is specified in db-data.ts.
    testRequest.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });

  });

  afterEach(() => {
    // Ensure that no other http requests are being made.
    httpTestingController.verify();
  });
});
