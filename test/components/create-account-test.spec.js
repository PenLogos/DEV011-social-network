/**
* @jest-environment jsdom
*/

import { renderCreateAccount } from '../../src/components/create-account';

jest.mock('../../src/lib/auth', () => ({
  createAccountFunction: jest.fn((email, password, username) => {
    if (email === 'mochilerxs@gmail.com' && password === '123456' && username === 'viajeraprogre') {
      return Promise.resolve();
    }
    return Promise.reject();
  }),
  accountGoogle: jest.fn(() => Promise.resolve()),
  googlePersistanceFunction: jest.fn(() => Promise.resolve()),
}));

describe('renderCreateAccount', () => {
  it('debería ser una función', () => {
    expect(typeof renderCreateAccount).toBe('function');
  });
  it('tiene un botón para crear cuenta', () => {
    const DOM = document.createElement('div');
    DOM.append(renderCreateAccount());
    const haveCreateButton = DOM.querySelector('#signin');
    expect(haveCreateButton).not.toBe(undefined);
  });
  it('cuando se hace click en el botón crear nos lleva a la url de feed', (done) => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderCreateAccount(navigateToMock));
    const username = DOM.querySelector("input[type='text']");
    const email = DOM.querySelector("input[type='email']");
    const password = DOM.querySelector("input[type='password']");
    const validatePassword = DOM.querySelector("input[placeholder='Confirma contraseña']");
    username.value = 'viajeraprogre';
    email.value = 'mochilerxs@gmail.com';
    password.value = '123456';
    validatePassword.value = '123456';
    const siginButton = DOM.querySelector('#signin');
    siginButton.click();
    setTimeout(() => {
      expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
      done();
    });
  });
  it('cuando se hace click en el botón crear y no cumple los requerimientos para signin, muestra los errores correspondientes', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderCreateAccount(navigateToMock));
    const email = DOM.querySelector("input[type='email']");
    const password = DOM.querySelector("input[type='password']");
    const validatePassword = DOM.querySelector("input[placeholder='Confirma contraseña']");
    const signinButton = DOM.querySelector('#signin');
    signinButton.click();
    const errorSpan = DOM.querySelector('.error-message');
    if (email.value === 'mochilerxs'
    && password.value === '' && validatePassword.value === '') {
      expect(errorSpan).toBe('Correo invalido');
    } else if (email.value === 'g@gmail.com'
    && password.value === '12345' && validatePassword.value === '') {
      expect(errorSpan).toBe('La contraseña requiere mínimo 6 caracteres');
    }
  });
  it('cuando se hace click en el botón de google nos lleva a la url de feed', (done) => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderCreateAccount(navigateToMock));
    const googleButton = DOM.querySelector('#signin-google');
    googleButton.click();
    setTimeout(() => {
      expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
      done();
    });
  });
});
