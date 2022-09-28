import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

/**
 * Spies are used to mock e.g. expensive services.
 * The intention is anyway that unit-tests are isolated i.e. do not use external resources.
 * Therefore usually all dependencies are mocked.
 *
 * https://jasmine.github.io/api/edge/jasmine.html#.createSpyObj
 * (static) createSpyObj(baseNameopt, methodNames, propertyNamesopt) → {Object}
 */
describe('CalculatorService', () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach");
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        // LoggerService, // We don't declare the LoggerService since this would introduce a real Object.
        // Here we define a dependency injection token for the fake LoggerService. This will be the Jasmine spy.
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });
    calculator = TestBed.inject(CalculatorService);
  });

  /**
   * The first example using a real LoggerService.
   * Normally this is not done because:
   * - services may be expensive.
   * - a unit-test should be executed in isolation.
   */
  it('should add two numbers using a real UserService dependency', () => {
    console.log('add test using a real LoggingService');
    const logger = new LoggerService();

    // See: https://jasmine.github.io/api/edge/global.html#spyOn
    spyOn(logger, 'log');

    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  /**
   * We can spy on an existing object or create a completely new object that returns a specific value.
   */
  it('should add two numbers using a fake LoggerService dependency', () => {
    console.log("add test using a fake LoggerService dependency")
    // In the following statement the mocked dependency is defined returning a specific return value.
    // For the moment this is not relevant because the return value is not used.
    loggerSpy.log.and.returnValue("Addition operation called");

    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers using a fake LoggerService dependency', () => {
    console.log("subtract test using a fake LoggerService dependency")
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "unexpected substraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});
