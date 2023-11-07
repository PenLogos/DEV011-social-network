/**
* @jest-environment jsdom
*/

import { error } from '../../src/components/error';

describe('error', () => {
  it('debería ser una función', () => {
    expect(typeof error).toBe('function');
  });
  it('debería imprimir el error 404 page not found, please go home', () => {
    const DOM = document.createElement('h2');
    DOM.append(error());
    const errorPage = DOM.querySelector('.error');
    expect(errorPage.textContent).toBe('Error 404 page not found, please go home');
  });
});
