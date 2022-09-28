describe('Home Page', () => {

  /**
   * Start your app's server
   * cy.visit() your app
   * Begin writing tests
   *
   * Note:
   * In the START situation the application itself and the backend server are down.
   * See README.md for starting / stopping them.
   * That means that when running the integration tests the application itself is shown,
   * but no courses are visible.
   * Only 'All Courses' will be visible and the header with 'COURSES' and 'ABOUT'.
   *
   * Note:
   * - In the real situation the application itself still needs to be run.
   * - Instead of firing real HTTP requests they are mocked.
   *  - At this place is content stored necessary for mockinig the real HTTP call:
   *    angular-testing-course/cypress/fixtures/
   *      courses.json
   *
   * Open Developer Tools for more techical info.
   */

  beforeEach( () => {
    // State that the content of file angular-testing-course/cypress/fixtures/courses.json
    // will be called as HTTP response.

    // Routing event: Link coursesJSON to a particular HTTP request.
    // The functionality given by the course is out of date.
    // See: https://docs.cypress.io/api/commands/server#Syntax
    // cy.server() and cy.route() are deprecated in Cypress 6.0.0.
    // In a future release, support for cy.server() and cy.route() will be removed.

    // The follwoing is replaced
    // cy.fixture('courses.json').as("coursesJSON");
    // cy.server();
    // cy.route('/api/courses', "@coursesJSON").as("courses");

    // By the following functionality. This requires more study in future.
    cy.intercept('GET', '/api/courses', {
      fixture: 'courses',
    })

    // Visit the root url of the application.
    cy.visit('/');
  });

  it('should display a list of courses', () => {

    // Confirm that we are in the right page.
    cy.contains("All Courses");

    // No longer necessary. I leave it in as illustration.
    // cy.wait('@courses');

    cy.get("mat-card").should("have.length", 9);

  });

  it('should display the advanced courses', () => {

    /**
     * The tabs 'Beginner' and 'Advanced' are characterized by:
     * <div class="mat-tab-label-content">
     * So the expectation is that two such div classes should be present.
     */
    cy.get('.mat-tab-label').should("have.length", 2);

    /**
     * Clicking on a tab is described in the unit-tests as an asynchronous step.
     * In the unit-tests we had to adapt the code for this situation.
     * In End-to-End Cypress takes care of this for the tester.
     */
    // Simulate a user click on 'Advanced' tab.
    cy.get('.mat-tab-label').last().click();

    /**
     * Assert that the courses are being displayed, i.e. the list is not empty.
     * Select all the titles of all the cards that are available under 'Advanced'.
     * e.g. course
     * <mat-card-title _ngcontent-ffi-c147="" class="mat-card-title">
     *   Angular Security Course - Web Security Fundamentals
     * </mat-card-title>
      */
    cy.get('.mat-tab-body-active .mat-card-title').its("length").should('be.gt', 1);

    /**
     * Confirm that the first item has title "Angular Security Course - Web Security Fundamentals".
     */
    cy.get('.mat-tab-body-active .mat-card-title')
      .first()
      .should("contain", "Angular Security Course - Web Security Fundamentals")});

});
