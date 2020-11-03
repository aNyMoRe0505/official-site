/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window, 'IntersectionObserver', { value: noop, writable: true });
