/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

class MockIntersectionObserver {
  constructor() {
    this.observe = noop;
    this.unobserve = noop;
  }
}

Object.defineProperty(window, 'IntersectionObserver', { value: MockIntersectionObserver, writable: true });
